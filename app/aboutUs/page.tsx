"use client";

import { Separator } from "@base-ui/react";
import { GraduationCap, BookOpen, User, Building2, Github, MessageSquareWarning } from "lucide-react";

const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Bun",
  "Tailwind CSS",
  "shadcn/ui",
  "Zustand",
  "React Hook Form",
  "SWR",
  "Lucide",
];

const ENTITIES = [
  {
    icon: GraduationCap,
    title: "رشته",
    desc: "مسیرهای تحصیلی رو با تجربه‌ی واقعی کسایی که خودشون گذروندنش مقایسه کن.",
    accent: "#7C3AED",
    tint: "rgba(124,58,237,0.07)",
    tintStrong: "rgba(124,58,237,0.14)",
  },
  {
    icon: BookOpen,
    title: "درس",
    desc: "سختی، حجم تکلیف و روش تدریس هر درس، قبل از ثبت‌نام.",
    accent: "#0369A1",
    tint: "rgba(3,105,161,0.07)",
    tintStrong: "rgba(3,105,161,0.14)",
  },
  {
    icon: User,
    title: "استاد",
    desc: "همون چیزی که استادبان رو استادبان کرد: نقد و امتیاز صادقانه‌ی اساتید.",
    accent: "#B45309",
    tint: "rgba(180,83,9,0.07)",
    tintStrong: "rgba(180,83,9,0.14)",
  },
  {
    icon: Building2,
    title: "دانشگاه",
    desc: "فضا، امکانات و حال‌وهوای واقعی دانشگاه‌ها از زبان خود دانشجوها.",
    accent: "#047857",
    tint: "rgba(4,120,87,0.07)",
    tintStrong: "rgba(4,120,87,0.14)",
  },
];

export default function AboutPage() {
  return (
    <div dir="rtl" lang="fa" className="min-h-screen ">
      <section className="paper-texture hero-glow relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">


          <p className="rise-1 font-mono-tech text-xs tracking-wide text-[#8A7E5F]">
            پروژه‌ی متن‌باز — osbn-sh/app
          </p>

          <h1 className="rise-1 font-display mt-3 text-4xl font-black leading-[1.35] md:text-5xl">
            استادبان، جایی برای
            <br />
            <span className="text-amber-500">تجربه‌های واقعی</span> دانشجویی
          </h1>

          <p className="rise-2 font-display mx-auto mt-5 max-w-xl text-base leading-8 ">
            پلتفرمی که دانشجوها با کمک هم می‌سازنش؛ برای اینکه هیچ‌کس بی‌اطلاع
            سراغ یک استاد، درس یا دانشگاه نره.
          </p>

          <div className="rise-3 mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/osbn-sh/app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm bg-amber-500 font-medium text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Github className="size-4" />
              مشاهده در گیت‌هاب
            </a>
            <a
              href="https://github.com/osbn-sh/app/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "rgba(30,42,47,0.14)", color: "#1E2A2F" }}
            >
              <MessageSquareWarning className="size-4" />
              ثبت پیشنهاد یا مشکل
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-3xl" style={{ backgroundColor: "#E6DCC3" }} />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-right text-2xl font-extrabold">
          درباره‌ی استادبان
        </h2>
        <div className="font-display mt-5 space-y-4 text-right text-[15px] leading-8 ">
          <p>
            استادبان از دل یک نیاز ساده متولد شد: قبل از انتخاب واحد، هیچ‌کس
            نباید کورکورانه تصمیم بگیره. ما به‌جای تبلیغات و شایعه، به تجربه‌ی
            مستقیم خود دانشجوها اعتماد داریم.
          </p>
          <p>
            هر نقد، امتیاز و بازخوردی که ثبت می‌شه، مسیر تصمیم‌گیری نفر بعدی
            رو روشن‌تر می‌کنه. کد این پروژه هم کاملاً متن‌بازه، یعنی هرکسی
            می‌تونه ببینه دقیقاً چطور کار می‌کنه و در ساختش سهیم بشه.
          </p>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-3xl" style={{ backgroundColor: "#E6DCC3" }} />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display text-right text-2xl font-extrabold">
          چی رو با هم بررسی می‌کنیم؟
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ENTITIES.map(({ icon: Icon, title, desc, accent, tint, tintStrong }) => (
            <div
              key={title}
              className="group flex items-start gap-4 rounded-2xl border p-5 text-right transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: tint,
                borderColor: tintStrong,
              }}
            >
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors"
                style={{ backgroundColor: tintStrong }}
              >
                <Icon className="size-5" style={{ color: accent }} />
              </div>
              <div>
                <p className="font-display text-base font-bold" style={{ color: accent }}>
                  {title}
                </p>
                <p className="font-display mt-1 text-sm leading-7 text-[#5A5344]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-3xl" style={{ backgroundColor: "#E6DCC3" }} />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-extrabold">با چی ساخته شده؟</h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {STACK.map((t) => (
            <span
              key={t}
              className="font-mono-tech rounded-lg border bg-white px-3 py-1.5 text-[13px] text-[#3A3428] shadow-sm"
              style={{ borderColor: "rgba(30,42,47,0.10)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>
      

      <section
        className="paper-texture px-6 py-16 text-center"
        
      >
        <h2 className="font-display text-xl font-extrabold">
          این پروژه با مشارکت شما بهتر می‌شه
        </h2>
        <p className="font-display mx-auto mt-3 max-w-md text-sm leading-7">
          چه یک خط کد باشه، چه یک گزارش باگ، چه یه ایده‌ی جدید — همه‌چیز
          روی گیت‌هاب باز و در دسترسه.
        </p>
        <a
          href="https://github.com/osbn-sh/app"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm bg-amber-500 font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <Github className="size-4" />
          رفتن به osbn-sh/app
        </a>
      </section>
    </div>
  );
}