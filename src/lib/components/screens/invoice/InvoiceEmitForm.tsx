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
import { getLastMonth } from "@/utils/getLastMonth";

type ResponseData = {
  url: string;
  resume: Record<string, string>[];
};

type Props = {
  loggedUser: InvoiceUser;
  onSuccess?: (data: ResponseData) => void;
  className?: string;
};

export default function InvoiceEmitForm({
  loggedUser,
  className,
  onSuccess,
}: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Form
      className={className}
      schema={invoiceDataSchema}
      action={(payload) => {
        return invoiceActions.emit({ user: loggedUser, invoice: payload });
      }}
      onSuccess={(res) => {
        console.log(res);
        setOpen(true);
        onSuccess?.(res.data);
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
        granularity="day"
        defaultValue={getLastMonth()}
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
  );
}
