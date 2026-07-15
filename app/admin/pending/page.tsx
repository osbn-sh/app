"use client";
import { Lesson, Major, Professor, University } from "@/entity/entity";
import { api } from "@/utils/api/base";
import { useEffect, useState } from "react";
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
  type LucideIcon,
} from "lucide-react";

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

interface EntityMeta {
  label: string;
  icon: LucideIcon;
  text: string;
  bg: string;
  ring: string;
  bar: string;
}

// هر نوع موجودیت یه هویت بصری مستقل می‌گیره تا لیست مختلط، قابل اسکن سریع باشه
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

const ENTITY_ORDER: EntityType[] = ["lesson", "major", "professor", "university"];

interface UnifiedItem {
  id: number | string;
  name: string;
  type: EntityType;
}

const Page = () => {
  const [data, setData] = useState<IPending>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  // آیدی آیتم‌هایی که الان در حال ارسال approve/reject هستن - برای دیزیبل کردن دکمه‌ها
  const [pendingActionIds, setPendingActionIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const result = await api.get<IPending>("/manipulation/get-all");
        setData({
          major: result.data?.major ?? [],
          lesson: result.data?.lesson ?? [],
          professor: result.data?.professor ?? [],
          university: result.data?.university ?? [],
        });
      } catch (err) {
        console.error(err);
        setData(EMPTY_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const groups = ENTITY_ORDER.map((type) => ({
    type,
    meta: ENTITY_META[type],
    items: (data[type] ?? []).map(
      (entity): UnifiedItem => ({ id: entity.id, name: entity.name, type }),
    ),
  })).filter((group) => group.items.length > 0);

  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

  const itemKey = (item: UnifiedItem) => `${item.type}-${item.id}`;

  const setItemBusy = (item: UnifiedItem, busy: boolean) => {
    setPendingActionIds((prev) => {
      const next = new Set(prev);
      busy ? next.add(itemKey(item)) : next.delete(itemKey(item));
      return next;
    });
  };

  const handleApprove = async (item: UnifiedItem) => {
    setItemBusy(item, true);
    try {
      await api.post(`/manipulation/${item.type}/approvement/yes/${item.id}`);
      removeItem(item);
    } catch (err) {
      console.error(err);
      setItemBusy(item, false);
    }
  };

  const handleReject = async (
    e: React.FormEvent<HTMLFormElement>,
    item: UnifiedItem,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reason = formData.get("name") as string;

    setItemBusy(item, true);
    try {
      await api.post(`/manipulation/${item.type}/approvement/no/${item.id}`, {
        reason,
      });
      removeItem(item);
    } catch (err) {
      console.error(err);
      setItemBusy(item, false);
    }
  };

  const removeItem = (item: UnifiedItem) => {
    setData((prev) => ({
      ...prev,
      [item.type]: (prev[item.type] ?? []).filter(
        (i: { id: number | string }) => i.id !== item.id,
      ),
    }));
  };

  if (loading) {
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
            موردی برای تایید یا رد وجود ندارد.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 pb-16">
      {/* نوار خلاصه بالای صفحه */}
      <div className="sticky top-0 z-10 -mx-4 mb-6 border-b bg-background/85 px-4 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">صف بازبینی</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} مورد در انتظار تایید یا رد
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {groups.map(({ type, meta, items }) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.bg} ${meta.text}`}
              >
                <meta.icon className="size-3.5" />
                {meta.label}
                <span className="tabular-nums opacity-70">{items.length}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* گروه‌های موجودیت */}
      <div className="space-y-8">
        {groups.map(({ type, meta, items }) => (
          <section key={type}>
            <div className="mb-3 flex items-center gap-2">
              <div className={`flex size-7 items-center justify-center rounded-lg ${meta.bg}`}>
                <meta.icon className={`size-4 ${meta.text}`} />
              </div>
              <h2 className="text-sm font-semibold">{meta.label}ها</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                ({items.length})
              </span>
            </div>

            <div className="space-y-2">
              {items.map((item) => {
                const busy = pendingActionIds.has(itemKey(item));
                return (
                  <div
                    key={itemKey(item)}
                    className={`group flex items-center gap-3 rounded-xl border bg-card ps-3 pe-2 py-2.5 transition-colors ${
                      busy ? "opacity-60" : "hover:bg-muted/40"
                    }`}
                  >
                    {/* نوار رنگی سمت راست کارت برای تفکیک بصری سریع نوع */}
                    <span className={`h-8 w-1 shrink-0 rounded-full ${meta.bar}`} />

                    <span className="flex-1 truncate text-sm font-medium">
                      {item.name}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={busy}
                        onClick={() => handleApprove(item)}
                        className="gap-1 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
                      >
                        <Check className="size-3.5" />
                        تایید
                      </Button>

                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={busy}
                              className="gap-1"
                            >
                              <X className="size-3.5" />
                              رد
                            </Button>
                          }
                        />
                        <DialogContent>
                          <form onSubmit={(e) => handleReject(e, item)}>
                            <DialogHeader>
                              <div className="mb-1 flex size-9 items-center justify-center rounded-full bg-destructive/10">
                                <AlertTriangle className="size-4.5 text-destructive" />
                              </div>
                              <DialogTitle>رد کردن «{item.name}»</DialogTitle>
                              <DialogDescription>
                                این مورد از {meta.label}‌های در انتظار بررسی حذف
                                می‌شود. دلیل رد را برای ثبت در سابقه بنویسید.
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
                              <Button
                                variant="destructive"
                                type="submit"
                                disabled={busy}
                                className="gap-1"
                              >
                                {busy && <Loader2 className="size-3.5 animate-spin" />}
                                رد کردن
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
export default Page;