import Link from "next/link";
import { Home, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
    return (
        <main className="container mx-auto flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-xl ">
                <p className="text-8xl font-extrabold text-primary text-center">404</p>

                <h1 className="mt-6 text-3xl font-bold text-center">
                    صفحه مورد نظر پیدا نشد
                </h1>

                <p className="mt-4 text-muted-foreground leading-8">
                    ممکن است آدرس اشتباه وارد شده باشد، صفحه حذف شده باشد یا هنوز
                    در استادبان ثبت نشده باشد.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <Link href="/">
                        <Button >
                            <Home className="ml-2 h-4 w-4" />
                            صفحه اصلی
                        </Button>
                    </Link>

                </div>

            </div>
        </main>
    );
}