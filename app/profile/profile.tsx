import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
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

  return (
    <div className="flex flex-col p-24 justify-center items-center gap-5">
      <h1 className="text-3xl text-green-500 font-bold ">Akses diberikan</h1>
      <div className="text-xl">
        <div>ID : {session.user.id}</div>
        <div>NAMA : {session.user.name}</div>
        <div>ROLE : {session.user.role}</div>
      </div>
    </div>
  );
}
