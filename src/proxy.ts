// Next 16: proxy.ts ersätter middleware.ts.
// Vi använder den för:
//   1. Supabase auth-cookies (refresh tokens på varje request)
//   2. Skydd för /admin
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Skydda /admin (men inte /admin/login)
  if (path.startsWith("/admin") && path !== "/admin/login" && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  // Redirect inloggade bort från login
  if (path === "/admin/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Kör BARA på /admin. Publika sidor (/, /info, /demo, /[slug]) ska inte
  // träffa middleware — annars körs ett Supabase auth-anrop på varje request
  // och cachade/statiska sidor tappar sin CDN-snabbhet.
  matcher: ["/admin", "/admin/:path*"],
};
