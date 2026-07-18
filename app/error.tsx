"use client"
import Link from "next/link";
import { Home, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
    return (
        <main className="container mx-auto flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-xl ">
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <Link href="/">
                        <Button >
                            <Home className="ml-2 h-4 w-4" />
                            صفحه اصلی
                        </Button>
                    </Link>

                </div>


                <Card className="my-12">

                    <CardHeader>
                        <CardTitle>
                           <h1 className="mx-auto">
                            یه جای کارو خراب کردی ...
                           </h1>
                        </CardTitle>
                    </CardHeader>
  
                </Card>

            </div>
        </main>
    );
}