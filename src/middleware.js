import { updateSession } from "@/app/utils/supabase/middleware";

export async function middleware(request) {
  // console.log("mid");

  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
