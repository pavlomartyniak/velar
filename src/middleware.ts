import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Пропускаємо API, внутрішні маршрути Next та статичні файли (robots.txt, sitemap.xml тощо)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
