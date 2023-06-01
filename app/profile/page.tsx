import { Suspense } from "react";
import Profile from "./profile";

export default async function Page() {
  return (
    <div className="flex flex-col p-24 justify-center items-center gap-5">
      <h1 className="text-6xl ">Halaman Profil</h1>

      <Suspense fallback={<p>Loading Datanya</p>}>
        {/* @ts-expect-error Async Server Component */}
        <Profile />
      </Suspense>
    </div>
  );
}
