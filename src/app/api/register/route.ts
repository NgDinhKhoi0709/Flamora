import { NextResponse } from "next/server";
import { z } from "zod";

import { createUser } from "@/lib/user-store";

export const runtime = "nodejs";

const registerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự."),
  email: z.string().email("Email không hợp lệ."),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validated = registerSchema.safeParse(json);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu không hợp lệ.",
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await createUser({
      name: validated.data.name,
      email: validated.data.email,
      password: validated.data.password,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "EMAIL_EXISTS" || error?.message === "EMAIL_EXISTS") {
      return NextResponse.json(
        {
          success: false,
          message: "Email này đã được đăng ký.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      },
      { status: 500 },
    );
  }
}
