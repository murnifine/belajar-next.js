"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { addTodo, hapusTodo } from "./actions";
import svg from "@/public/next.svg";
import Image from "next/image";
import { CircleDollarSign, ShoppingCart } from "lucide-react";

import { FaBeer } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Optimistic({ allTodos }: { allTodos: any }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    allTodos,
    (state, newTodo) => {
      const [judul, aksi] = newTodo as any;

      if (aksi === "delete") {
        let willDeleteID: number;
        let datadelete: any;
        const filter = state.filter((item: any) => {
          if (item.title === judul) {
            willDeleteID = item.id;
            datadelete = item;
          }
          return item.title !== judul;
        });

        return [...filter, { judul: datadelete.title, aksi: "delete" }];
      }

      if (aksi === "add") {
        return [...state, { judul: judul, aksi: aksi }];
      }
    }
  );

  // function hapus(e: any) {
  //   const title = e.target.getAttribute("title");
  //   // updateList(list.filter(item => item.title !== title));
  //   // // console.log(name);
  //   addOptimisticMessage([title, "delete"]);
  // }

  const formRef = useRef() as any;

  return (
    <div>
      {optimisticMessages.map((m: any) => (
        <div key={m.id} className="flex justify-between">
          <div className="border">
            {m.title}
            {m.judul}
            {m.aksi == "add" && "| Menyimpan..."}
            {m.aksi == "delete" && "| Manghapus..."}
          </div>
          <div className="">
            <button
              onClick={async () => {
                addOptimisticMessage([m.title, "delete"]);
                await hapusTodo(m.id);
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}

      <form
        action={async (formData) => {
          const judul = formData.get("judul");
          formRef.current.reset();
          addOptimisticMessage([judul, "add"]);
          await addTodo(judul as any);
        }}
        ref={formRef}
      >
        <Input type="text" name="judul" />
        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}

// export function SaveButton() {
//   const { pending } = useFormStatus();
//   return (

//     <Button type="submit" disabled={pending}>Kirim</Button>
//   )

// }
