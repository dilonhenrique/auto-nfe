export interface InvoiceUser {
  name: string;
  cnpj: string;
  password: string;
}

export interface ReferenceDate {
  string: string;
  date: Date;
}

export interface InvoiceData {
  reference: Date;
  value: number;
  pix: string;
  cnpj: string;
  tribNac: string;
  nbs: string;
  city: string;
  email: string;
}

export type GenerateInvoicePeopleData = {
  reference: Date;
  cnpj: string;
};

export type GenerateInvoiceServiceData = {
  city: string;
  tribNac: string;
  description: string;
  nbs: string;
};

export type GenerateInvoiceData = {
  people: GenerateInvoicePeopleData;
  service: GenerateInvoiceServiceData;
  value: string;
};
