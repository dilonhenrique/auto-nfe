import { invoiceActions } from "@/server/actions/invoice";
import { InvoiceUser } from "@/types/invoice";
import { MASKS } from "@/utils/masks/masks";
import { invoiceDataSchema } from "@/utils/schemas/invoiceData";
import {
  addToast,
  DatePicker,
  Form,
  Icon,
  Input,
  SubmitButton,
} from "@abstrato/hero-ui";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

type Props = {
  loggedUser: InvoiceUser;
  className?: string;
};

export default function InvoiceEmitForm({ loggedUser, className }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Form
        className={className}
        schema={invoiceDataSchema}
        action={(payload) => {
          return invoiceActions.emit({ user: loggedUser, invoice: payload });
        }}
        onSuccess={(res) => {
          console.log(res);
          // addToast({ title: res.message, color: "success" });
          setOpen(true);
        }}
        onError={({ response }) => {
          console.log(response);
          addToast({ title: response?.message, color: "danger" });
        }}
      >
        <Input
          name="cnpj"
          inputMode="decimal"
          label="CNPJ do tomador"
          mask={MASKS.cnpj}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_CNPJ}
          autoFocus
        />
        <DatePicker
          name="reference"
          label="Data de referência"
          maxValue={now(getLocalTimeZone())}
        />

        <Input
          name="city"
          label="Cidade"
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_CITY}
        />
        <Input
          name="tribNac"
          inputMode="decimal"
          label="Tributação Nacional"
          mask={MASKS.tribNac}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_TRIBNAC}
        />
        <Input
          name="nbs"
          inputMode="decimal"
          label="Código NBS"
          mask={MASKS.nbs}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_NBS}
        />

        <Input
          name="pix"
          label="Chave PIX"
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_PIX}
        />
        <Input
          name="value"
          inputMode="decimal"
          label="Valor da Nota"
          startContent={
            <span className="text-body-xs text-foreground-400 mb-0.5">R$</span>
          }
          mask={MASKS.decimal}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_VALUE}
        />

        <SubmitButton
          color="primary"
          startContent={<Icon icon="invoice" size="sm" />}
        >
          Emitir Nota Fiscal
        </SubmitButton>
      </Form>

      <SuccessModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
}
