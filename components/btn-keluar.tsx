"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";

export default function BtnKeluar() {
  return (
    <MenuIconButton
      info="Logout"
      icon={
        <LogOut
          onClick={() => signOut({ callbackUrl: "/" })}
          className="h-5 w-5"
        />
      }
    />
  );
}

function MenuIconButton({ icon, info }: { icon: ReactNode; info: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} className="w-10 rounded-full p-0">
            {icon}
            <span className="sr-only">Add</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
