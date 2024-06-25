import { signUpSchema } from "@/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  // server side validations
  const result = signUpSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  return NextResponse.json(
    Object.keys(zodErrors)?.length ? { errors: zodErrors } : { success: true }
  );
}
