import { cn, WithChildren } from "@abstrato/hero-ui";

type Props = WithChildren & {
  className?: string;
};

export default function PageContainer({ children, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4 items-start p-4 sm:p-8", className)}>
      {children}
    </div>
  );
}
