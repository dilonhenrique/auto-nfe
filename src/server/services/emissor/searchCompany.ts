"use server";

import { emissorNacional } from "@/server/clients/emissorNacional/emissorNacional";
import { dateToIsoDate } from "@/utils/parsers/dateToIsoDate";

type Response = {
  inscricao: string;
  nomerazaosocial: string;
  codigopais: number;
  cep: string;
  codigoibgemunicipio: number;
  nomemunicipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
};

type Payload = {
  cnpj: string;
  date: Date;
};

export default async function searchCompany(payload: Payload) {
  const cnpj = payload.cnpj.trim().replace(/[^\d]/g, "");
  const date = dateToIsoDate(payload.date);

  // https://www.nfse.gov.br/emissornacional/api/EmissaoDPS/RecuperarInfoPessoaJuridicaTomador/36396246000171?data=2025-02-12
  return await emissorNacional<Response>(
    `RecuperarInfoPessoaJuridicaTomador/${cnpj}?data=${date}`
  );
}
