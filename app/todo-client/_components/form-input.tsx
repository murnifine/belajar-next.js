"use client";
import { Input } from "@/components/ui/input";
import { addTodo } from "../actions";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FormInput() {
  return (
    <>
      <form action={addTodo} className="flex gap-3 ">
        <Input placeholder="..." name="title" autoFocus required />
        <Button type="submit" className="w-40">
          <Save className="mr-2 h-4 w-4" />
          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
          Tambah
        </Button>
      </form>
    </>
  );
}
