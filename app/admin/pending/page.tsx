"use client";
import { Lesson, Major, Professor, University } from "@/entity/entity";
import { api } from "@/utils/api/base";
// Adjust this import path to wherever GlobalFetcher actually lives in your project.

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/label";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
  Check,
  X,
  BookOpen,
  GraduationCap,
  User,
  Building2,
  Loader2,
  Inbox,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Link2,
  type LucideIcon,
} from "lucide-react";
import GlobalFetcher from "@/utils/api/swrGlobal";

interface IPending {
  lesson: Lesson[];
  major: Major[];
  professor: Professor[];
  university: University[];
}

const EMPTY_DATA: IPending = {
  lesson: [],
  major: [],
  professor: [],
  university: [],
};

type EntityType = "major" | "lesson" | "professor" | "university";
type RawEntity = Lesson | Major | Professor | University;

// NOTE: if your entity types (Lesson/Major/Professor/University) don't
// already declare `status`, add `status: string` to them on the backend
// contract. Until then we read it defensively below.
type ItemStatus = "pending" | "approved" | "rejected" | "stabilized";

const getEntityStatus = (entity: RawEntity): ItemStatus => {
  const status = (entity as unknown as { status?: string }).status;
  if (status === "approved" || status === "rejected" || status === "stabilized") {
    return status;
  }
  return "pending";
};

interface EntityMeta {
  label: string;
  icon: LucideIcon;
  text: string;
  bg: string;
  ring: string;
  bar: string;
}

const ENTITY_META: Record<EntityType, EntityMeta> = {
  major: {
    label: "رشته",
    icon: GraduationCap,
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-500/15",
    ring: "ring-violet-500/20",
    bar: "bg-violet-500",
  },
  lesson: {
    label: "درس",
    icon: BookOpen,
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-100 dark:bg-sky-500/15",
    ring: "ring-sky-500/20",
    bar: "bg-sky-500",
  },
  professor: {
    label: "استاد",
    icon: User,
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-500/15",
    ring: "ring-amber-500/20",
    bar: "bg-amber-500",
  },
  university: {
    label: "دانشگاه",
    icon: Building2,
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    ring: "ring-emerald-500/20",
    bar: "bg-emerald-500",
  },
};

// Meta for the lesson-dependency lists (prerequisite / co-requisite). They
// reuse the same row/card visual language as the entity groups below but
// aren't part of the EntityType union since they aren't backed by a CRUD
// entity.
const PREREQ_META: EntityMeta = {
  label: "پیشنیاز",
  icon: Link2,
  text: "text-rose-600 dark:text-rose-400",
  bg: "bg-rose-100 dark:bg-rose-500/15",
  ring: "ring-rose-500/20",
  bar: "bg-rose-500",
};

const COREQ_META: EntityMeta = {
  label: "هم‌نیاز",
  icon: Link2,
  text: "text-teal-600 dark:text-teal-400",
  bg: "bg-teal-100 dark:bg-teal-500/15",
  ring: "ring-teal-500/20",
  bar: "bg-teal-500",
};

const ENTITY_ORDER: EntityType[] = ["lesson", "major", "professor", "university"];

const FIELD_LABELS: Record<string, string> = {
  name_english: "نام انگلیسی",
  description: "توضیحات",
  description_english: "توضیحات انگلیسی",
  difficulty: "سختی",
  term: "ترم",
  category: "نوع دانشگاه",
  city: "شهر",
  image_url: "تصویر",
  education_history: "تحصیلات",
  status: "وضعیت",
};

const HIDDEN_FIELDS = new Set(["id", "name"]);

interface UnifiedItem {
  id: number | string;
  name: string;
  type: EntityType;
  raw: RawEntity;
  status: ItemStatus;
}

type PendingAction = "approve" | "reject" | "stabilize";

interface CountdownState {
  action: PendingAction;
  secondsLeft: number;
  reason?: string;
}

const COUNTDOWN_SECONDS = 5;

// --- Lesson prerequisite/co-requisite dependency review ---------------

// "pre" = پیشنیاز (prerequisite), "co" = همنیاز (co-requisite)
type RequisiteCategory = "pre" | "co";

interface RawPreRequisite {
  lessonId: number;
  prerequisite_lesson_id: number;
  lessonName: string;
  prerequisite_lesson_name: string;
  rejectionReason: string | null;
  status: string;
}


interface RawCoRequisite {
  lessonId: number;
  co_requisite_lesson_id: number;
  lessonName: string;
  co_requisite_lesson_name: string;
  rejectionReason: string | null;
  status: string;
}

// The same /academic/requites/check endpoint returns both dependency
// kinds in one payload — pre_requisites (پیشنیاز) and co_requisites
// (هم‌نیاز) — sharing the exact same item shape.
interface RequisitesCheckResponse {
  pre_requisites: RawPreRequisite[];
  co_requisites: RawCoRequisite[];
}

interface PrereqItem {
  key: string;
  category: RequisiteCategory;
  lessonId: number;
  targetId: number;
  lessonName: string;
  targetName: string;
}



const Page = () => {
  const {
    data: result,
    isLoading: loading,
    mutate,
  } = useSWR<IPending>("/manipulation/get-all", GlobalFetcher);

  const {
    data: prereqResult,
    isLoading: prereqLoading,
    mutate: mutatePrereq,
  } = useSWR<RequisitesCheckResponse>("/academic/requites/check", GlobalFetcher);

  const data: IPending = {
    major: result?.major ?? [],
    lesson: result?.lesson ?? [],
    professor: result?.professor ?? [],
    university: result?.university ?? [],
  };

  const prerequisites: PrereqItem[] = (prereqResult?.pre_requisites ?? []).map((p) => ({
    key: `pre-${p.lessonId}-${p.prerequisite_lesson_id}`,
    category: "pre",
    lessonId: p.lessonId,
    targetId: p.prerequisite_lesson_id,
    lessonName: p.lessonName,
    targetName: p.prerequisite_lesson_name,
  }));

  const coRequisites: PrereqItem[] = (prereqResult?.co_requisites ?? []).map((p) => ({
    key: `co-${p.lessonId}-${p.co_requisite_lesson_id}`,
    category: "co",
    lessonId: p.lessonId,
    targetId: p.co_requisite_lesson_id,
    lessonName: p.lessonName,
    targetName: p.co_requisite_lesson_name,
  }));

  const [countdowns, setCountdowns] = useState<Record<string, CountdownState>>({});
  const [openRejectKey, setOpenRejectKey] = useState<string | null>(null);
  const [submittingIds, setSubmittingIds] = useState<Set<string>>(new Set());

  const timers = useRef<Record<string, { interval: ReturnType<typeof setInterval>; timeout: ReturnType<typeof setTimeout> }>>({});

  // clear any running countdown timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(({ interval, timeout }) => {
        clearInterval(interval);
        clearTimeout(timeout);
      });
    };
  }, []);

  const groups = ENTITY_ORDER.map((type) => {
    const items: UnifiedItem[] = (data[type] ?? []).map((entity) => ({
      id: entity.id,
      name: entity.name,
      type,
      raw: entity,
      status: getEntityStatus(entity),
    }));

    return {
      type,
      meta: ENTITY_META[type],
      pending: items.filter((i) => i.status === "pending"),
      approved: items.filter((i) => i.status === "approved"),
    };
  }).filter((group) => group.pending.length + group.approved.length > 0);

  const totalCount =
    groups.reduce((sum, g) => sum + g.pending.length + g.approved.length, 0) +
    prerequisites.length +
    coRequisites.length;

  const itemKey = (item: UnifiedItem) => `${item.type}-${item.id}`;

  const setItemSubmitting = (key: string, busy: boolean) => {
    setSubmittingIds((prev) => {
      const next = new Set(prev);
      busy ? next.add(key) : next.delete(key);
      return next;
    });
  };

  // optimistically drop the item from the SWR cache, then re-validate against the server
  const removeItem = (item: UnifiedItem) => {
    mutate(
      (current) => {
        if (!current) return current;
        return {
          ...current,
          [item.type]: (current[item.type] ?? []).filter(
            (i: { id: number | string }) => i.id !== item.id,
          ),
        };
      },
      { revalidate: true },
    );
  };

  // optimistically drop a dependency pair from the SWR cache, then re-validate
  const removePrereqItem = (item: PrereqItem) => {
    const field = item.category === "pre" ? "pre_requisites" : "co_requisites";
    mutatePrereq(
      (current) => {
        if (!current) return current;
        return {
          ...current,
          [field]: (current[field] ?? []).filter(
            (p) => !(p.lessonId === item.lessonId && p.lessonId === item.targetId),
          ),
        };
      },
      { revalidate: true },
    );
  };

  const clearTimer = (key: string) => {
    const t = timers.current[key];
    if (t) {
      clearInterval(t.interval);
      clearTimeout(t.timeout);
      delete timers.current[key];
    }
  };

  const doApprove = async (item: UnifiedItem) => {
    const key = itemKey(item);
    setItemSubmitting(key, true);
    try {
      await api.post(`/manipulation/${item.type}/approvement/yes/${item.id}`);
      removeItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      setItemSubmitting(key, false);
    }
  };

  const doReject = async (item: UnifiedItem, reason?: string) => {
    const key = itemKey(item);
    setItemSubmitting(key, true);
    try {
      await api.post(`/manipulation/${item.type}/approvement/no/${item.id}`, {
        reason,
      });
      removeItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      setItemSubmitting(key, false);
    }
  };

  const doStabilize = async (item: UnifiedItem) => {
    const key = itemKey(item);
    setItemSubmitting(key, true);
    try {
      await api.post(`/manipulation/${item.type}/stabilize/${item.id}`);
      removeItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      setItemSubmitting(key, false);
    }
  };

  // Prerequisite approval goes straight through — there's no separate
  // "stabilize" step for dependencies, unlike the entity groups above.
  const doApprovePrereq = async (item: PrereqItem) => {
    setItemSubmitting(item.key, true);
    try {
      await api.post(`/academic/requites/approvement`, {
        category_str: item.category,
        lesson_id: item.lessonId,
        target_id: item.targetId,
      });
      removePrereqItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      setItemSubmitting(item.key, false);
    }
  };

  const doRejectPrereq = async (item: PrereqItem, reason?: string) => {
    setItemSubmitting(item.key, true);
    try {
      await api.post(`/academic/requites/rejection`, {
        category_str: item.category,
        lesson_id: item.lessonId,
        target_id: item.targetId,
        reason,
      });
      removePrereqItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      setItemSubmitting(item.key, false);
    }
  };

  const startCountdown = (item: UnifiedItem, action: PendingAction, reason?: string) => {
    const key = itemKey(item);
    clearTimer(key);

    setCountdowns((prev) => ({ ...prev, [key]: { action, secondsLeft: COUNTDOWN_SECONDS, reason } }));

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const current = prev[key];
        if (!current) return prev;
        return { ...prev, [key]: { ...current, secondsLeft: current.secondsLeft - 1 } };
      });
    }, 1000);

    const timeout = setTimeout(() => {
      clearTimer(key);
      setCountdowns((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      if (action === "approve") {
        doApprove(item);
      } else if (action === "stabilize") {
        doStabilize(item);
      } else {
        doReject(item, reason);
      }
    }, COUNTDOWN_SECONDS * 1000);

    timers.current[key] = { interval, timeout };
  };

  // Same countdown-then-commit UX as startCountdown above, but generic
  // over a plain completion callback so it can drive the prerequisite
  // approve/reject calls without needing a UnifiedItem.
  const startPrereqCountdown = (key: string, action: "approve" | "reject", onComplete: () => void) => {
    clearTimer(key);

    setCountdowns((prev) => ({ ...prev, [key]: { action, secondsLeft: COUNTDOWN_SECONDS } }));

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const current = prev[key];
        if (!current) return prev;
        return { ...prev, [key]: { ...current, secondsLeft: current.secondsLeft - 1 } };
      });
    }, 1000);

    const timeout = setTimeout(() => {
      clearTimer(key);
      setCountdowns((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      onComplete();
    }, COUNTDOWN_SECONDS * 1000);

    timers.current[key] = { interval, timeout };
  };

  const cancelCountdown = (key: string) => {
    clearTimer(key);
    setCountdowns((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleApproveClick = (item: UnifiedItem) => {
    startCountdown(item, "approve");
  };

  const handleStabilizeClick = (item: UnifiedItem) => {
    startCountdown(item, "stabilize");
  };

  const handleRejectSubmit = (e: React.FormEvent<HTMLFormElement>, item: UnifiedItem) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reason = formData.get("name") as string;

    setOpenRejectKey(null);
    startCountdown(item, "reject", reason);
  };

  const handleApprovePrereqClick = (item: PrereqItem) => {
    startPrereqCountdown(item.key, "approve", () => doApprovePrereq(item));
  };

  const handleRejectPrereqSubmit = (e: React.FormEvent<HTMLFormElement>, item: PrereqItem) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reason = formData.get("reason") as string;

    setOpenRejectKey(null);
    startPrereqCountdown(item.key, "reject", () => doRejectPrereq(item, reason));
  };

  const renderFieldValue = (key: string, value: unknown) => {
    if (value === undefined || value === null || value === "") return "-";

    if (key === "image_url" && typeof value === "string") {
      return <img src={value} width={100} alt="" className="rounded-md" />;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "-";
      return (
        <div className="space-y-1">
          {value.map((entry, i) => (
            <div key={i}>
              {typeof entry === "object" && entry !== null
                ? Object.values(entry).join(" | ")
                : String(entry)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const renderDetailsDialog = (item: UnifiedItem, meta: EntityMeta) => (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="flex flex-1 items-center gap-1.5 truncate text-start text-sm font-medium hover:underline"
          >
            <Eye className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{item.name}</span>
          </button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <div className={`mb-1 flex size-9 items-center justify-center rounded-full ${meta.bg}`}>
            <meta.icon className={`size-4.5 ${meta.text}`} />
          </div>
          <DialogTitle>
            {meta.label}: {item.name}
          </DialogTitle>
          <DialogDescription>
            اطلاعات ثبت‌شده برای این مورد، پیش از تایید یا رد.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[50vh] overflow-y-auto">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableCell>{item.name}</TableCell>
              </TableRow>
              {Object.entries(item.raw)
                .filter(([k]) => !HIDDEN_FIELDS.has(k))
                .map(([k, v]) => (
                  <TableRow key={k}>
                    <TableHead>{FIELD_LABELS[k] ?? k}</TableHead>
                    <TableCell>{renderFieldValue(k, v)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="mt-5">
          <DialogClose
            render={
              <Button variant="outline" type="button">
                بستن
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const renderCountdownButton = (key: string, countdown: CountdownState) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => cancelCountdown(key)}
      className={`gap-1 ${countdown.action === "reject"
          ? "text-destructive"
          : "text-emerald-700 dark:text-emerald-400"
        }`}
    >
      <Loader2 className="size-3.5 animate-spin" />
      لغو
      <span className="tabular-nums">({countdown.secondsLeft})</span>
    </Button>
  );

  // pending item: needs approve / reject
  const renderPendingRow = (item: UnifiedItem, meta: EntityMeta) => {
    const key = itemKey(item);
    const countdown = countdowns[key];
    const busy = submittingIds.has(key);
    const disabled = busy || !!countdown;

    return (
      <div
        key={key}
        className={`group flex items-center gap-3 rounded-xl border bg-card ps-3 pe-2 py-2.5 transition-colors ${busy ? "opacity-60" : "hover:bg-muted/40"
          }`}
      >
        <span className={`h-8 w-1 shrink-0 rounded-full ${meta.bar}`} />

        {renderDetailsDialog(item, meta)}

        <div className="flex shrink-0 items-center gap-1.5">
          {countdown ? (
            renderCountdownButton(key, countdown)
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={disabled}
                onClick={() => handleApproveClick(item)}
                className="gap-1 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
              >
                <Check className="size-3.5" />
                تایید
              </Button>

              <Dialog
                open={openRejectKey === key}
                onOpenChange={(open) => setOpenRejectKey(open ? key : null)}
              >
                <DialogTrigger
                  render={
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={disabled}
                      className="gap-1"
                    >
                      <X className="size-3.5" />
                      رد
                    </Button>
                  }
                />
                <DialogContent>
                  <form onSubmit={(e) => handleRejectSubmit(e, item)}>
                    <DialogHeader>
                      <div className="mb-1 flex size-9 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="size-4.5 text-destructive" />
                      </div>
                      <DialogTitle>رد کردن «{item.name}»</DialogTitle>
                      <DialogDescription>
                        این مورد از {meta.label}‌های در انتظار بررسی حذف
                        می‌شود. دلیل رد را برای ثبت در سابقه بنویسید. پس از
                        ثبت، {COUNTDOWN_SECONDS} ثانیه فرصت لغو خواهید داشت.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                      <Field>
                        <Label htmlFor={`reason-${item.type}-${item.id}`}>
                          دلیل رد
                        </Label>
                        <Textarea
                          id={`reason-${item.type}-${item.id}`}
                          name="name"
                          placeholder="مثلاً: اطلاعات نامعتبر یا تکراری است"
                          autoFocus
                        />
                      </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-5">
                      <DialogClose
                        render={
                          <Button variant="outline" type="button">
                            انصراف
                          </Button>
                        }
                      />
                      <Button variant="destructive" type="submit" className="gap-1">
                        رد کردن
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    );
  };

  // approved item: only needs final stabilize
  const renderApprovedRow = (item: UnifiedItem, meta: EntityMeta) => {
    const key = itemKey(item);
    const countdown = countdowns[key];
    const busy = submittingIds.has(key);
    const disabled = busy || !!countdown;

    return (
      <div
        key={key}
        className={`group flex items-center gap-3 rounded-xl border border-dashed bg-card ps-3 pe-2 py-2.5 transition-colors ${busy ? "opacity-60" : "hover:bg-muted/40"
          }`}
      >
        <span className={`h-8 w-1 shrink-0 rounded-full ${meta.bar}`} />

        {renderDetailsDialog(item, meta)}

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
          تایید شده
        </span>

        <div className="flex shrink-0 items-center gap-1.5">
          {countdown ? (
            renderCountdownButton(key, countdown)
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled={disabled}
              onClick={() => handleStabilizeClick(item)}
              className="gap-1 text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/15"
            >
              <ShieldCheck className="size-3.5" />
              نهایی‌سازی
            </Button>
          )}
        </div>
      </div>
    );
  };

  // dependency row: lesson -> target lesson (prerequisite or co-requisite).
  // Approve commits directly, there is no stabilize stage for these.
  const renderPrereqRow = (item: PrereqItem, meta: EntityMeta) => {
    const key = item.key;
    const countdown = countdowns[key];
    const busy = submittingIds.has(key);
    const disabled = busy || !!countdown;

    return (
      <div
        key={key}
        className={`group flex items-center gap-3 rounded-xl border bg-card ps-3 pe-2 py-2.5 transition-colors ${busy ? "opacity-60" : "hover:bg-muted/40"
          }`}
      >
        <span className={`h-8 w-1 shrink-0 rounded-full ${meta.bar}`} />

        <div className="flex flex-1 items-center gap-2 truncate text-sm">
          <span className="truncate font-medium">{item.lessonName}</span>
          <Link2 className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-muted-foreground">{item.targetName}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {countdown ? (
            renderCountdownButton(key, countdown)
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={disabled}
                onClick={() => handleApprovePrereqClick(item)}
                className="gap-1 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
              >
                <Check className="size-3.5" />
                تایید
              </Button>

              <Dialog
                open={openRejectKey === key}
                onOpenChange={(open) => setOpenRejectKey(open ? key : null)}
              >
                <DialogTrigger
                  render={
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={disabled}
                      className="gap-1"
                    >
                      <X className="size-3.5" />
                      رد
                    </Button>
                  }
                />
                <DialogContent>
                  <form onSubmit={(e) => handleRejectPrereqSubmit(e, item)}>
                    <DialogHeader>
                      <div className="mb-1 flex size-9 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="size-4.5 text-destructive" />
                      </div>
                      <DialogTitle>
                        رد کردن {meta.label} «{item.targetName}» برای «{item.lessonName}»
                      </DialogTitle>
                      <DialogDescription>
                        این وابستگی از صف بررسی حذف می‌شود. دلیل رد را برای
                        ثبت در سابقه بنویسید. پس از ثبت، {COUNTDOWN_SECONDS}{" "}
                        ثانیه فرصت لغو خواهید داشت.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                      <Field>
                        <Label htmlFor={`prereq-reason-${key}`}>دلیل رد</Label>
                        <Textarea
                          id={`prereq-reason-${key}`}
                          name="reason"
                          placeholder="مثلاً: این پیشنیاز نامعتبر است"
                          autoFocus
                        />
                      </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-5">
                      <DialogClose
                        render={
                          <Button variant="outline" type="button">
                            انصراف
                          </Button>
                        }
                      />
                      <Button variant="destructive" type="submit" className="gap-1">
                        رد کردن
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading || prereqLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
        <span className="text-sm">در حال بارگذاری موارد در انتظار بررسی...</span>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Inbox className="size-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">صف بازبینی خالی است</p>
          <p className="text-sm text-muted-foreground">
            موردی برای تایید، رد یا نهایی‌سازی وجود ندارد.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 pb-16">
      <div className="sticky top-0 z-10 -mx-4 mb-6 border-b bg-background/85 px-4 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">صف بازبینی</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} مورد در انتظار تایید، رد یا نهایی‌سازی
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {groups.map(({ type, meta, pending, approved }) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.bg} ${meta.text}`}
              >
                <meta.icon className="size-3.5" />
                {meta.label}
                <span className="tabular-nums opacity-70">
                  {pending.length + approved.length}
                </span>
              </span>
            ))}
            {prerequisites.length > 0 && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${PREREQ_META.bg} ${PREREQ_META.text}`}
              >
                <PREREQ_META.icon className="size-3.5" />
                {PREREQ_META.label}
                <span className="tabular-nums opacity-70">{prerequisites.length}</span>
              </span>
            )}
            {coRequisites.length > 0 && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${COREQ_META.bg} ${COREQ_META.text}`}
              >
                <COREQ_META.icon className="size-3.5" />
                {COREQ_META.label}
                <span className="tabular-nums opacity-70">{coRequisites.length}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {groups.map(({ type, meta, pending, approved }) => (
          <section key={type}>
            <div className="mb-3 flex items-center gap-2">
              <div className={`flex size-7 items-center justify-center rounded-lg ${meta.bg}`}>
                <meta.icon className={`size-4 ${meta.text}`} />
              </div>
              <h2 className="text-sm font-semibold">{meta.label}ها</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                ({pending.length + approved.length})
              </span>
            </div>

            {pending.length > 0 && (
              <div className="space-y-2">
                {pending.map((item) => renderPendingRow(item, meta))}
              </div>
            )}

            {approved.length > 0 && (
              <div className={pending.length > 0 ? "mt-4 space-y-2" : "space-y-2"}>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                  آماده نهایی‌سازی
                </p>
                {approved.map((item) => renderApprovedRow(item, meta))}
              </div>
            )}
          </section>
        ))}

        {prerequisites.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <div className={`flex size-7 items-center justify-center rounded-lg ${PREREQ_META.bg}`}>
                <PREREQ_META.icon className={`size-4 ${PREREQ_META.text}`} />
              </div>
              <h2 className="text-sm font-semibold">پیشنیازهای دروس</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                ({prerequisites.length})
              </span>
            </div>

            <div className="space-y-2">
              {prerequisites.map((item) => renderPrereqRow(item, PREREQ_META))}
            </div>
          </section>
        )}

        {coRequisites.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <div className={`flex size-7 items-center justify-center rounded-lg ${COREQ_META.bg}`}>
                <COREQ_META.icon className={`size-4 ${COREQ_META.text}`} />
              </div>
              <h2 className="text-sm font-semibold">هم‌نیازهای دروس</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                ({coRequisites.length})
              </span>
            </div>

            <div className="space-y-2">
              {coRequisites.map((item) => renderPrereqRow(item, COREQ_META))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default Page;