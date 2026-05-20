import "server-only";

import bcrypt from "bcryptjs";

import type { UserRole } from "@/types";
import { prisma } from "@/lib/prisma";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUserByEmail(
  email: string,
): Promise<StoredUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  return prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<StoredUser> {
  const normalizedEmail = params.email.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(params.password, 10);

  try {
    return await prisma.user.create({
      data: {
        name: params.name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: params.role ?? "user",
      },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      const duplicateError = new Error("EMAIL_EXISTS");
      (duplicateError as any).code = "EMAIL_EXISTS";
      throw duplicateError;
    }
    throw error;
  }
}

export async function verifyUserPassword(params: {
  email: string;
  password: string;
}): Promise<StoredUser | null> {
  const user = await getUserByEmail(params.email);
  if (!user) return null;
  const ok = await bcrypt.compare(params.password, user.passwordHash);
  return ok ? user : null;
}
