"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 text-center sm:w-[350px]">
        <h1 className="text-4xl font-bold">403</h1>
        <h2 className="text-2xl font-semibold">Truy cập bị từ chối</h2>
        <p className="text-sm text-muted-foreground">
          Bạn không có quyền truy cập vào trang này.
        </p>
        <Button asChild>
          <Link href="/">Quay lại trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
