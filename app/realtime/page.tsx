import ReactQuery from "./react-query";
import Swr from "./swr";
import { FaSave } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export default async function Page() {
  return (
    <div className="gap-3">
      {/* @ts-expect-error Async Server Component */}
      <Swr />
      {/* <ReactQuery /> */}
    </div>
  );
}
