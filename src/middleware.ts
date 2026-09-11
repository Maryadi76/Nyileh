import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("www.nyileh.id")) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "nyileh.id";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return await updateSession(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|woff2?|ico)$).*)",
  ],
};
