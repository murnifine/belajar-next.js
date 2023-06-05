"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { addTodo, deleteTodo, getTodo } from "./action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PenBox, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Swr() {
  const { data, error, isLoading, mutate } = useSWR("cuy", getTodo, {
    refreshInterval: 1000,
    onSuccess: (data) => data.sort((a, b) => b.id - a.id),
  });
  const [input, setInput] = useState("");

  async function handleCreate(input: string) {
    setInput("");
    const newTodo = [
      {
        id: Date.now(),
        title: input,
        status: "create",
      },
      ...(data as any),
    ];

    const addMutation = async () => {
      await addTodo(input);
      return newTodo;
    };

    const mutateOptions = {
      optimisticData: newTodo,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    };

    try {
      await mutate(addMutation(), mutateOptions);
      toast({
        title: "Tersimpan",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      toast({
        title: "Gagal Tersimpan",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }

  async function handleUpdate(id: number, title: string) {
    setInput("");
    const filtered: any = data?.filter((item) => item.id !== id);
    const newTodo = [
      {
        id: Date.now(),
        title: input,
      },
      ...filtered,
    ];

    const mutateOptions = {
      optimisticData: newTodo,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    };

    try {
      await mutate(async () => {
        await deleteTodo(id);
        return newTodo;
      }, mutateOptions);
      toast({
        title: "Berhasil di Ubah",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      toast({
        title: "Gagal di Ubah",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }

  async function handleDelete(id: number) {
    const newTodo = data?.filter((item) => item.id !== id);

    const mutateOptions = {
      optimisticData: newTodo,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    };

    try {
      await mutate(async () => {
        await deleteTodo(id);
        return newTodo;
      }, mutateOptions);
      toast({
        title: "Berhasil di Hapus",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      toast({
        title: "Gagal Terhapus",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div>
      <h1 className="text-3xl mb-8">Test Realtime Data</h1>
      <div className="flex gap-2">
        <Input
          value={input}
          autoFocus
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button onClick={() => handleCreate(input)}>Simpan</Button>
      </div>
      <div className="flex flex-col mt-5">
        {/* {JSON.stringify(data)} */}

        {/* {data ? JSON.stringify(data) : "kosong"} */}

        {data &&
          data.map((t, i) => (
            <div
              className="border px-3 py-2 flex justify-center items-center"
              key={i}
            >
              <div className="flex-1">{t.title}</div>
              <div className="flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <PenBox className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ubah</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Judul
                        </Label>
                        <Input
                          id={String(t.id)}
                          defaultValue={t.title}
                          className="col-span-3"
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogClose>
                      <Button
                        type="button"
                        onClick={() => handleUpdate(t.id, input)}
                      >
                        Simpan Perubahan
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>

                <Button variant={"ghost"} onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
