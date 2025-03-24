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
  }

  private async checkIsLogged() {
    return new Promise<boolean>((resolve) => {
      try {
        this.page
          .locator(".alert-warning ::-p-text(Usuário e/ou senha inválidos)")
          .wait()
          .then(() => resolve(false));
        this.page
          .locator(".navbar-brand.completa")
          .wait()
          .then(() => resolve(true));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}
    });
  }

  public async execute(user: InvoiceUser) {
    console.log("\nLogin na plataforma...");

    await this.page.goto(NF_URL, { waitUntil: "load" });
    await this.page.locator("input[name=Inscricao]").fill(user.cnpj);
    await this.page.locator("input[name=Senha]").fill(user.password);

    await this.clickSubmit();
    const isLogged = await this.checkIsLogged();

    if (isLogged) {
      return await this.page.browserContext().cookies();
    }

    return null;
  }
}
