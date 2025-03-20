import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@abstrato/hero-ui";
import { WithChildren } from "@abstrato/hero-ui";

type Props = WithChildren & {
  locale?: string;
};

export default function UIProvider({ children, locale }: Props) {
  const router = useRouter();

  return (
    <HeroUIProvider
      navigate={router.push}
      locale={locale}
      theme={{
        button: { radius: "lg" },
        field: { variant: "bordered" },
      }}
      warningMessages={{
        // formLeavePageWithoutSave: t("confirm_leave_without_save"),
        // formParameterError: t("internal_server_error"),
        // formServerError: t("invalid_parameters"),
      }}
    >
      {children}
    </HeroUIProvider>
  );
}
