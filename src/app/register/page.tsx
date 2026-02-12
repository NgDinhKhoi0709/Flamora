"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
      message: "Email không hợp lệ.",
    }),
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, you would call your API here to register the user
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đăng ký thành công",
        description: "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
      });
      router.push("/login");
    }, 1000);
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Đăng ký tài khoản
          </h1>
          <p className="text-sm text-muted-foreground">
            Nhập thông tin của bạn để tạo tài khoản mới
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <motion.label
                      className="block"
                      initial={{ opacity: 0.7, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      Họ và tên
                    </motion.label>
                    <FormControl>
                      <Input
                        placeholder="Nguyễn Văn A"
                        {...field}
                        className="transition-shadow focus-visible:shadow-outline focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      <FormMessage />
                    </motion.div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <motion.label
                      className="block"
                      initial={{ opacity: 0.7, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      Email
                    </motion.label>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        className="transition-shadow focus-visible:shadow-outline focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      <FormMessage />
                    </motion.div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <motion.label
                      className="block"
                      initial={{ opacity: 0.7, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      Mật khẩu
                    </motion.label>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="transition-shadow focus-visible:shadow-outline focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      <FormMessage />
                    </motion.div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <motion.label
                      className="block"
                      initial={{ opacity: 0.7, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      Xác nhận mật khẩu
                    </motion.label>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="transition-shadow focus-visible:shadow-outline focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: motionTokens.easing.soft,
                      }}
                    >
                      <FormMessage />
                    </motion.div>
                  </FormItem>
                )}
              />
              <Button
                className="w-full relative overflow-hidden"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="inline-block w-4 h-4 rounded-full bg-primary animate-pulse mr-2" />
                    Đang xử lý...
                  </motion.span>
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Đã có tài khoản? Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
