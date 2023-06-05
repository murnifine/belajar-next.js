import ReactQuery from "./react-query";
import Swr from "./swr";

export default async function Page() {
  return (
    <div className="gap-3">
      {/* @ts-expect-error Async Server Component */}
      <Swr />
      {/* <ReactQuery /> */}
    </div>
  );
}
