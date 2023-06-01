import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Rahasia() {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <div className="flex flex-col p-24 justify-center items-center gap-5">
          <h1 className="text-3xl text-red-500 font-bold ">
            Silahkan Login dulu
          </h1>
        </div>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div>
        <div className="flex flex-col p-24 justify-center items-center gap-5">
          {/* <h1 className="text-6xl ">Halaman Rahasia</h1> */}
          <h1 className="text-3xl text-red-500 font-bold ">
            Halaman ini hanya bisa di akses oleh ADMIN
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-24 justify-center items-center gap-5">
      <h1 className="text-3xl text-green-500 font-bold ">Akses diberikan</h1>
    </div>
  );
}
