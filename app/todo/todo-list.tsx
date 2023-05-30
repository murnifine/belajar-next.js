"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { ConfirmDelete } from "./confirm-delete";
import { UpdateTodo } from "./update-todo";

type Props = {
  id: number;
  title: string;
  isComplete: boolean;
  todoCompleted: (id: number, isComplete: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, newTitle: string) => Promise<void>;
};

export default function TodoList({
  id,
  title,
  isComplete,
  todoCompleted,
  deleteTodo,
  updateTodo,
}: Props) {
  // const tugas = useTodoStore();

  // console.log(tugas);

  return (
    <div
      className="flex border group p-2 justify-center items-center hover:text-inherit hover:bg-slate-50 hover:shadow"
      key={id}
    >
      <div
        className={`${
          isComplete ? "bg-green-400" : "bg-red-400"
        } w-3 h-3 rounded-full ml-2`}
      ></div>
      <div className={`flex-1 ml-4 ${isComplete && " line-through"}`}>
        {title}
      </div>
      <div className="text-transparent group-hover:text-inherit">
        <ConfirmDelete deleteTodo={deleteTodo} id={id} />

        {/* <Button variant={"ghost"}>
          <Edit className="w-4 h-4" />
        </Button> */}
        <UpdateTodo updateTodo={updateTodo} id={id} title={title} />

        <Button
          variant={"ghost"}
          onClick={async () => await todoCompleted(id, isComplete)}
        >
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
