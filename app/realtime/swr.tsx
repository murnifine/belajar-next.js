"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { addTodo, getTodo } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Swr() {
  const { data, error, isLoading, mutate } = useSWR("cuy", getTodo, {
    refreshInterval: 1000,
  });
  const [input, setInput] = useState("");

  async function mutateTodo({ id, title }: { id: any; title: string }) {
    await addTodo(title);
    return [...(data as any), { id, title }];
  }

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div>
      <h1 className="text-3xl mb-8">Test Realtime Data</h1>
      <form onSubmit={(ev) => ev.preventDefault()} className="flex gap-2">
        <Input
          value={input}
          autoFocus
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            setInput("");

            const newTodo = {
              id: Date.now(),
              title: input,
            };

            try {
              await mutate(mutateTodo(newTodo), {
                optimisticData: [...(data as any), newTodo],
                rollbackOnError: true,
                populateCache: true,
                revalidate: false,
              });
              toast({
                title: "Tersimpan",
                description: "Friday, February 10, 2023 at 5:57 PM",
              });
            } catch (error) {}
          }}
        >
          Simpan
        </Button>
      </form>
      <div className="flex flex-col mt-5">
        {/* {JSON.stringify(data)} */}

        {/* {data ? JSON.stringify(data) : "kosong"} */}

        {data &&
          data.map((todo, i) => (
            <div
              className="border
        px-4 py-2"
              key={i}
            >
              {todo.title}
            </div>
          ))}
      </div>
    </div>
  );
}
