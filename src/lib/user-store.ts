import "server-only";

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import type { UserRole } from "@/types";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: number;
};

const STORE_DIR = path.join(process.cwd(), ".flamora");
const USERS_FILE = path.join(STORE_DIR, "users.json");

async function ensureStoreDir() {
  await fs.mkdir(STORE_DIR, { recursive: true });
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredUser[];
  } catch (error: any) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function writeUsers(users: StoredUser[]) {
  await ensureStoreDir();
  const tempFile = `${USERS_FILE}.${crypto.randomBytes(8).toString("hex")}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(users, null, 2), "utf8");
  await fs.rename(tempFile, USERS_FILE);
}

export async function getUserByEmail(
  email: string,
): Promise<StoredUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === normalizedEmail) ?? null;
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<StoredUser> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const users = await readUsers();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    const error = new Error("EMAIL_EXISTS");
    (error as any).code = "EMAIL_EXISTS";
    throw error;
  }

  const passwordHash = await bcrypt.hash(params.password, 10);
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: params.name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: params.role ?? ("user" as UserRole),
    createdAt: Date.now(),
  };

  users.push(user);
  await writeUsers(users);
  return user;
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
