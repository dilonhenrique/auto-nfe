import AppHeader from "@/lib/components/shared/AppHeader/AppHeader";
import { WithChildren } from "@abstrato/hero-ui";

export default function LoggedLayout({ children }: WithChildren) {
  return (
    <div className="grid grid-rows-[4rem,_1fr]">
      <AppHeader />
      {children}
    </div>
  );
}
