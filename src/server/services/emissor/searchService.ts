"use server";

import { emissorNacional } from "@/server/clients/emissorNacional/emissorNacional";

type Item = {
  id: string;
  text: string;
};

type Response = {
  results: Item[];
};

export default async function searchService(term: string) {
  return await emissorNacional<Response>(
    `BuscarNomeServico?term=${term}&_type=query&q=${term}`
  );
}
