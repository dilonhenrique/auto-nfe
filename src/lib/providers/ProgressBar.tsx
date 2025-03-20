import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="hsl(var(--heroui-primary-600))"
      options={{ showSpinner: false }}
    />
  );
}
