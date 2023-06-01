import { Suspense } from "react";
import Rahasia from "./rahasia";

export default function Page() {
  return (
    <div className="flex flex-col p-24 justify-center items-center gap-5">
      <h1 className="text-6xl ">Halaman Rahasia</h1>

      <Suspense fallback={<p>Loading Datanya</p>}>
        {/* @ts-expect-error Async Server Component */}
        <Rahasia />
      </Suspense>
    </div>
  );
}
