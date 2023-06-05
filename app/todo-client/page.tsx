import { Button } from "@/components/ui/button";
import Link from "next/link";
import TodoClient from "./todo-client";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams;

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="flex flex-col self-start">
      <Button
        variant={"link"}
        asChild
        className="text-3xl leading-normal my-3 self-start"
      >
        <Link href={"/todo-client"}>Todo List</Link>
      </Button>

      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Async Server Component */}
        <TodoClient page={page} />
      </Suspense>
    </div>
  );
}

