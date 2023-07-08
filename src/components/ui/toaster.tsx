"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        let bg =
          props.variant === "destructive" ? "bg-red-700" : "bg-slate-950";
        return (
          <Toast key={id} {...props} className={bg}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-slate-200">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-slate-200">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
