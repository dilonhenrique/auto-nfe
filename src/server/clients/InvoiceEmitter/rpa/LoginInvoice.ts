import { InvoiceUser } from "@/types/invoice";
import { Page } from "puppeteer";

const NF_URL =
  "https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional/DPS/Pessoas";

export class LoginInvoice {
  constructor(private page: Page) {}

  // private async waitLoading() {
  //   await this.page.waitForFunction(() => {
  //     return document.body.innerText.includes("Por favor, aguarde...");
  //   });

  //   await this.page.waitForFunction(() => {
  //     return !document.body.innerText.includes("Por favor, aguarde...");
  //   });
  // }

  private async clickSubmit() {
    await this.page.locator("button[type=submit]").click();
    // await this.page.waitForNavigation();
  }

  public async execute(user: InvoiceUser) {
    console.log("\nLogin na plataforma...");

    await this.page.goto(NF_URL, { waitUntil: "load" });
    await this.page.locator("input[name=Inscricao]").fill(user.cnpj);
    await this.page.locator("input[name=Senha]").fill(user.password);

    await this.clickSubmit();
    console.log("✅ Login efetuado");
  }
}
