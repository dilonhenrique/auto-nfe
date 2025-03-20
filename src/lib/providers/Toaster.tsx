import { ToastProvider } from "@abstrato/hero-ui";

export default function Toaster() {
  return (
    <ToastProvider
      placement="bottom-center"
      toastOffset={10}
      toastProps={{
        shouldShowTimeoutProgress: true,
        classNames: {
          title: "text-foreground",
          base: "bg-background",
          progressTrack: "opacity-50",
        },
      }}
    />
  );
}
