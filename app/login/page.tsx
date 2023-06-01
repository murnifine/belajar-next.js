import LoginForm from "@/app/login/login-form";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default function Page() {
  async function cekUser(username: string, password: string) {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    "use server";
    const dbUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return dbUser;
  }

  return (
    <div className="flex flex-col">
      <div className="text-3xl font-bold text-center">Login</div>

      <Suspense fallback={<p>Loading Datanya</p>}>
        <LoginForm cekUser={cekUser} />
      </Suspense>
    </div>
  );
}
