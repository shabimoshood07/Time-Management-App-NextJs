"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MouseEventHandler, ReactNode } from "react";

type Props = {
  button: ReactNode;
  children?: ReactNode;
  title: string;
};

const DialogComponent = ({ button, children, title }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className="bg-slate-950">
        <DialogHeader className="text-slate-200">
          <DialogTitle className="text-slate-200">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
