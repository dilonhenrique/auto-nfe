import { Cookie } from "puppeteer";

export function buildCookieHeader(cookies: Cookie[]) {
  return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
}
