"use server";

import { NFE_COOKIES } from "@/server/clients/emissorNacional/cookieNf";
import { cookies } from "next/headers";
import { buildCookieHeader } from "./buildCookiesHeader";
import { HttpRequestOptions } from "./httpRequest/httpRequest";

export async function buildEmissorNacionalOptions(
  options: HttpRequestOptions = {}
): Promise<HttpRequestOptions | null> {
  const session = cookies().get(NFE_COOKIES);

  if (!session) return null;

  const puppeteerCookies = JSON.parse(session.value);
  const cookieHeader = buildCookieHeader(puppeteerCookies);

  return {
    ...options,
    headers: {
      ...(options.headers || {}),
      Cookie: cookieHeader,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      Referer: "https://www.nfse.gov.br/EmissorNacional/DPS/Nova",
    },
  };
}
