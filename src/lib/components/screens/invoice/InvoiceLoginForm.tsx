import { invoiceActions } from "@/server/actions/invoice";
import { InvoiceUser } from "@/types/invoice";
import { SessionUser } from "@/types/session";
import { MASKS } from "@/utils/masks/masks";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  addToast,
  Form,
  Input,
  PasswordInput,
  SubmitButton,
} from "@abstrato/hero-ui";

type Props = {
  user: SessionUser;
  onSuccess: (user: InvoiceUser) => void;
  className?: string;
};

export default function InvoiceLoginForm({
  user,
  onSuccess,
  className,
}: Props) {
  return (
    <Form
      className={className}
      schema={invoiceUserSchema}
      action={invoiceActions.login}
      onSuccess={(res) => {
        addToast({ title: res.message, color: "success" });
        onSuccess(res.data);
      }}
      onError={({ response }) => {
        addToast({ title: response?.message, color: "danger" });
      }}
    >
      <Input
        name="name"
        label="Nome completo"
        defaultValue={user?.name}
        autoFocus
      />
      <Input
        name="cnpj"
        label="Seu CNPJ"
        mask={MASKS.cnpj}
        defaultValue={process.env.NEXT_PUBLIC_USER_CNPJ}
      />
      <PasswordInput
        name="password"
        label="Senha da NFe"
        defaultValue={process.env.NEXT_PUBLIC_USER_PASS}
      />

      <SubmitButton color="primary" disabledWhenNotValid>
        Entrar
      </SubmitButton>
    </Form>
  );
}
