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
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  // const router = useRouter();
  // const currentRoute = router.;
  // const activeSegment = useSelectedLayoutSegment();

  return (
    <header>
      <div className="flex p-3 px-8 items-center justify-center">
        <div className="flex-1 font-extrabold">
          <Link href="/" className={` text-3xl`}>
            Logo
          </Link>
        </div>

        <nav className="">
          <ul className="flex  gap-1 items-center justify-center">
            <li className="mx-4">
              <Link href="/">Home</Link>
            </li>
            <li className="mx-4">
              <Link href="/realtime">RealTime</Link>
            </li>
            <li className="mx-4">
              <Link className="" href="/rahasia">
                Rahasia
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/profile">Profile</Link>
            </li>
            {/* <li className="mx-4">
              <Link href="/test">Test</Link>
            </li> */}
            {/* <li className="mx-4">
              <Link href="/todo-server">Todo Server</Link>
            </li> */}
            <li className="mx-4">
              <Link href="/todo-client">Todo</Link>
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
                {/* <Link href={"/login"}>
                  <MenuIconButton
                    info="LogIn"
                    icon={<LogIn className="h-5 w-5" />}
                  />
                  Masuk
                </Link> */}

                <Link
                  href={"/login"}
                  type="submit"
                  className={buttonVariants()}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                  Masuk
                </Link>
              </li>
            )}
            <li>
              {!session ? (
                <div className="text-red-600 px-4 py-2 font-bold">
                  Belum Login
                </div>
              ) : (
                <div>
                  <div className="text-green-600 px-4 py-2 font-bold">
                    Sudah Login
                  </div>
                </div>
              )}
            </li>

            {/* <li>
              <MenuIconButton info="Apps" icon={<Grip className="h-5 w-5" />} />
            </li> */}
          </ul>
        </nav>
      </div>
      <Separator />
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
