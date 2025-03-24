"use server";

import { emissorNacional } from "@/server/clients/emissorNacional/emissorNacional";

type Item = {
  id: string;
  text: string;
};

type Response = {
  results: Item[];
};

export default async function searchCity(term: string) {
  return await emissorNacional<Response>(
    `BuscarNomeMunicipio?term=${term}&_type=query&q=${term}`
  );
}
