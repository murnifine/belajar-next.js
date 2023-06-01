"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { ConfirmDelete } from "./confirm-delete";
import { UpdateTodo } from "./update-todo";
import { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { Input } from "@/components/ui/input";
import { addTodo } from "../actions";
import { Badge } from "@/components/ui/badge";

type Props = {
  allTodo: any;
  todoCompleted: (id: number, isComplete: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, newTitle: string) => Promise<void>;
};

export default function TodoList({
  allTodo,
  todoCompleted,
  deleteTodo,
  updateTodo,
}: Props) {
  const [optimisticAllTodos, addOptimisticAllTodos] = useOptimistic(
    allTodo,
    (state, newTodo) => [{ todo: newTodo, sending: true }, ...state]
  );

  const formRef = useRef<any>();

  async function handleSubmit(formData: FormData) {
    const title = formData.get("title");
    // formRef.current.reset();
    formRef.current.reset();
    addOptimisticAllTodos(title);
    await addTodo(formData);
  }

  return (
    <div className="">
      <form action={handleSubmit} ref={formRef} className="flex gap-3 mb-10">
        <Input placeholder="..." name="title" autoFocus required />
        <Button type="submit" className="w-40">
          <Save className="mr-2 h-4 w-4" />
          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
          Tambah
        </Button>
      </form>

      {optimisticAllTodos.map((m: any) => (
        <div className="" key={m.id}>
          <div
            className="flex border group p-2 justify-center items-center hover:text-inherit hover:bg-slate-50 hover:shadow"
            key={m.id}
          >
            <div
              className={`${m.isComplete ? "bg-green-400" : "bg-red-400"
                } w-2 h-2 rounded-full ml-2`}
            ></div>

            <div className={`flex-1  ml-4 ${m.isComplete && " line-through"}`}>
              {m.title}
              {m.todo}
            </div>

            {m.sending ? (
              <Button disabled variant={"ghost"}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan ke Database
              </Button>
            ) : (
              <div className="text-transparent group-hover:text-inherit">
                <ConfirmDelete id={m.id} />
                <UpdateTodo updateTodo={updateTodo} id={m.id} title={m.title} />
                <Button
                  variant={"ghost"}
                  onClick={async () => await todoCompleted(m.id, m.isComplete)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
