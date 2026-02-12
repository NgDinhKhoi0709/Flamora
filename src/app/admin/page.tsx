import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if ((session.user as any)?.role !== "admin") redirect("/403");

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-5xl">
            Quản trị
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Trung tâm quản trị cho Flamora.
          </p>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quản trị</CardTitle>
                <CardDescription>
                  Truy cập các công cụ quản trị và tiện ích.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/admin/scent-generator"
                      className="text-primary underline"
                    >
                      Tạo câu chuyện hương thơm
                    </Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/admin/scent-generator">
                  <Button> Mở công cụ</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
