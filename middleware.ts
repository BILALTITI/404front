import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API, Next internals, and static files (see next-intl middleware docs).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
