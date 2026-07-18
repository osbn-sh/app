"use client";

import Link from "next/link";
import { Home, RotateCcw, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error500() {
  return (
    <main className="container mx-auto flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-xl text-center">

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-5">
            <ServerCrash className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-destructive">500</h1>

        <h2 className="mt-5 text-3xl font-bold">
          اوه... یه مشکلی پیش اومده!
        </h2>

        <p className="mt-4 leading-8 text-muted-foreground">
          به نظر می‌رسه سرور نتونسته درخواست شما رو پردازش کنه.
          <br />
          ممکنه سرویس در حال بروزرسانی باشه یا موقتاً در دسترس نباشه.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => window.location.reload()}>
            <RotateCcw className="ml-2 h-4 w-4" />
            تلاش دوباره
          </Button>

          <Link href="/">
            <Button variant="outline">
              <Home className="ml-2 h-4 w-4" />
              صفحه اصلی
            </Button>
          </Link>
        </div>

        <Card className="mt-10 border-dashed">
          <CardContent className="py-6">
            <p className="font-medium">
              اگر این مشکل ادامه داشت، لطفاً چند دقیقه بعد دوباره امتحان کنید.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Error 500 • Internal Server Error
            </p>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}