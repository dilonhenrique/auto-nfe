import { InvoiceData, InvoiceUser } from "@/types/invoice";
import { InvoiceAutomation } from "./InvoiceAutomation";
import { GenerateInvoice } from "./rpa/GenerateInvoice";
import { EmitInvoice } from "./rpa/EmitInvoice";
import { DownloadLastInvoice } from "./rpa/DownloadLastInvoice";
import { createDescription } from "@/utils/invoice/createDescription";
import { parseCurrency } from "@/utils/parsers/currency";
import { LoginInvoice } from "./rpa/LoginInvoice";

export class InvoiceEmitter {
  private automation: InvoiceAutomation;

  private resume?: Record<string, string>[];

  constructor() {
    this.automation = new InvoiceAutomation();
  }

  public async init() {
    await this.automation.init();
    return this;
  }

  public async login(user: InvoiceUser) {
    const page = this.automation.getPage();

    return await new LoginInvoice(page).execute(user);
  }

  public async generate(data: InvoiceData) {
    const page = this.automation.getPage();

    const process = new GenerateInvoice(page);

    this.resume = await process.execute({
      people: {
        reference: data.reference.string,
        cnpj: data.cnpj,
      },
      service: {
        city: data.city,
        description: createDescription(data),
        tribNac: data.tribNac,
        nbs: data.nbs,
      },
      value: parseCurrency(data.value),
    });
  }

  // public async askForApproval(): Promise<boolean> {
  //   if (!this.resume) throw new Error("Nenhuma Nota fiscal para aprovação");
  //   return new InvoiceReviewer(this.resume).askApproval();
  // }

  public async emitAndDownload() {
    const page = this.automation.getPage();
    if (!this.resume) throw new Error("Nenhuma Nota fiscal para emitir");

    const process = new EmitInvoice(page);
    return await process.execute();
  }

  public async downloadLastInvoice() {
    const page = this.automation.getPage();
    const process = new DownloadLastInvoice(page);
    return await process.execute();
  }
}
