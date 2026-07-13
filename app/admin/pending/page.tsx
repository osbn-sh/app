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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/label";

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

// نوع موجودیت‌ها - برای ساخت URL و نمایش لیبل استفاده میشه
type EntityType = "major" | "lesson" | "professor" | "university";

const ENTITY_LABELS: Record<EntityType, string> = {
  major: "رشته",
  lesson: "درس",
  professor: "استاد",
  university: "دانشگاه",
};

// آیتم یکپارچه‌شده که همه موجودیت‌ها رو با یه شکل واحد نشون میده
interface UnifiedItem {
  id: number | string;
  name: string;
  type: EntityType;
}

const Page = () => {
  const [data, setData] = useState<IPending>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const result = await api.get<IPending>("/manipulation/get-all");
        // مهم: هر فیلدی که از سرور null/undefined بیاد رو به آرایه خالی تبدیل می‌کنیم
        // تا spread (...) روی undefined خطای "not iterable" نده
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

  // همه‌ی چهارتا آرایه رو با اضافه کردن type به یک آرایه واحد تبدیل می‌کنیم
  const unifiedItems: UnifiedItem[] = [
    ...(data.major ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      type: "major" as const,
    })),
    ...(data.lesson ?? []).map((l) => ({
      id: l.id,
      name: l.name,
      type: "lesson" as const,
    })),
    ...(data.professor ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      type: "professor" as const,
    })),
    ...(data.university ?? []).map((u) => ({
      id: u.id,
      name: u.name,
      type: "university" as const,
    })),
  ];

  // تایید (approve) - برای هر نوع موجودیت
  const handleApprove = async (item: UnifiedItem) => {
    try {
      await api.post(`/manipulation/${item.type}/approve/${item.id}`);
      removeItem(item);
    } catch (err) {
      console.error(err);
    }
  };

  // رد (reject) با دلیل - برای هر نوع موجودیت
  const handleReject = async (
    e: React.FormEvent<HTMLFormElement>,
    item: UnifiedItem,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reason = formData.get("name") as string;

    try {
      await api.post(`/manipulation/${item.type}/reject/${item.id}`, {
        reason,
      });
      removeItem(item);
    } catch (err) {
      console.error(err);
    }
  };

  // حذف آیتم از state بعد از تایید/رد موفق (optimistic update)
  const removeItem = (item: UnifiedItem) => {
    setData((prev) => ({
      ...prev,
      [item.type]: (prev[item.type] ?? []).filter(
        (i: { id: number | string }) => i.id !== item.id,
      ),
    }));
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (unifiedItems.length === 0) {
    return <div>موردی برای بررسی وجود ندارد.</div>;
  }

  return (
    <>
      {unifiedItems.map((item) => (
        <div key={`${item.type}-${item.id}`}>
          <span style={{ opacity: 0.6, marginInlineEnd: 8 }}>
            [{ENTITY_LABELS[item.type]}]
          </span>
          {item.name}

          <Button variant={"secondary"} onClick={() => handleApprove(item)}>
            ok
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button variant={"destructive"}>no</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={(e) => handleReject(e, item)}>
                <DialogHeader>
                  <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor={`reason-${item.type}-${item.id}`}>
                      دلیل
                    </Label>
                    <Textarea
                      id={`reason-${item.type}-${item.id}`}
                      name="name"
                      placeholder="دلیل رد را بنویسید"
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button variant={"secondary"} type="submit">
                    ok
                  </Button>
                  <DialogClose>
                    <Button variant={"destructive"} type="button">
                      no
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </>
  );
};
export default Page;
