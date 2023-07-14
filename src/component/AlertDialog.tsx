"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MouseEventHandler, ReactNode } from "react";

const AlertDialogComponent = ({
  Button,
  action,
  warning,
}: {
  Button: ReactNode;
  action: MouseEventHandler<HTMLButtonElement>;
  warning: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{Button}</AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-950 w-[94%]">
        <AlertDialogHeader>
          <AlertDialogTitle  className="text-slate-200">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription  className="text-slate-200">{warning}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-slate-200">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action} className="text-slate-200">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
