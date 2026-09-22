"use client";
import React from "react";
import { useLead, type LeadOptions } from "./LeadProvider";

/** Кнопка, открывающая собственную форму заявки. Позволяет секциям оставаться серверными компонентами. */
export function LeadButton({ lead, children, ...rest }: { lead: LeadOptions; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open } = useLead();
  return (
    <button type="button" {...rest} onClick={() => open(lead)}>
      {children}
    </button>
  );
}
