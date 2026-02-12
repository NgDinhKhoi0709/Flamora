import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/auth/sign-out-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-5xl">
            Account
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Manage your account details and orders.
          </p>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Account information and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    {session.user?.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user?.name ?? "User"}
                      />
                    ) : (
                      <AvatarFallback>
                        {(session.user?.name ?? "U").charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div>
                    <p className="mb-2">
                      <strong>Name:</strong> {session.user?.name ?? "—"}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> {session.user?.email ?? "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/orders" className="text-primary underline">
                  Your orders
                </Link>
                <div className="ml-4">
                  <SignOutButton />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
