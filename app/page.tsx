import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import Image from "next/image";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import BtnKeluar from "../components/btn-keluar";
import LoginForm from "@/components/login-form";

const Home = async () => {
  // const session = await getServerSession();
  // // const token = getToken;

  return (
    <div className="flex flex-col p-24 justify-center items-center">
      <h1 className="text-6xl ">Halaman Dasbor</h1>
    </div>
  );
};

export default Home;
