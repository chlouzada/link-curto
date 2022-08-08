// pages/_middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.url.indexOf("/api/new") != -1) return;

  const split = req.nextUrl.pathname.split("/").pop();

  if (split === "") return;

  const res = await fetch(req.nextUrl.origin + "/api/redirect/" + split);
  const data = await res.json();

  if (!data.url) return NextResponse.redirect(req.nextUrl.origin);

  return NextResponse.redirect(data.url);
}
