/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  httpRequest,
  HttpRequestOptions,
} from "@/utils/httpRequest/httpRequest";
import { buildEmissorNacionalOptions } from "@/utils/buildEmissorNacionalHeader";

const baseUrl = "https://www.nfse.gov.br/emissornacional/api/emissaodps/";

export async function emissorNacional<T = any>(
  url: string,
  options: HttpRequestOptions = {}
) {
  const resolvedOptions = await buildEmissorNacionalOptions(options);

  if (!resolvedOptions)
    throw new Error("Sessão do Emissor Nacional não encontrada");

  return await httpRequest<T>(`${baseUrl}${url}`, resolvedOptions);
}
