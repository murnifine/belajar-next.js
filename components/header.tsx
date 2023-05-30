import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "./ui/button";
import { Grip, LogIn, LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Separator } from "./ui/separator";
import BtnKeluar from "@/components/btn-keluar";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { authOptions } from "@/config/next-auth-options";

export default async function Header() {
  const session = await getServerSession(authOptions);

  // console.log({ session });

  return (
    <header className="  ">
      <div className="flex p-3 px-8 items-center justify-center">
        <div className="flex-1 font-extrabold">
          <Link href="/">Logo</Link>
        </div>

        <nav className="">
          <ul className="flex  gap-1 items-center justify-center">
            <li className="mx-4">
              <Link href="/todo">Todo</Link>
            </li>
            <li className="mx-4">
              <Link href="/about">About</Link>
            </li>
            <li>
              <Separator orientation="vertical" />
            </li>
            <Separator orientation="vertical" />
            {session ? (
              <li>
                <BtnKeluar />
                {/* <MenuIconButton
                  info="LogOut"
                  icon={<LogOut oncli className="h-5 w-5" />}
                /> */}
              </li>
            ) : (
              <li>
                <Link href={"/login"}>
                  <MenuIconButton
                    info="LogIn"
                    icon={<LogIn className="h-5 w-5" />}
                  />
                </Link>
              </li>
            )}

            <li>
              <MenuIconButton info="Apps" icon={<Grip className="h-5 w-5" />} />
            </li>
          </ul>
        </nav>
      </div>
      <Separator />

      <span className="flex justify-center items-center text-center">
        {session ? "Sudah Login" : "Belum Login"}
      </span>
    </header>
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
