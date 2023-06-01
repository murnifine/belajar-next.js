import prisma from "@/lib/prisma";
// import Optimistic from "./optimistic";
import { LuBird } from "react-icons/lu";
import Optimistic from "./optimistic";
import { handleSubmit } from "./actions";

export default async function Page() {
  async function getTodos() {
    "use server";
    return new Promise(async (resolve) => {
      const todos = await prisma.todo.findMany();
      setTimeout(() => {
        resolve(todos);
      }, 2000); // Simulate a .2s delay
    });
  }
  const simpan = "Halo";

  const allTodos = await getTodos();

  return (
    <div className="">
      {/* 
      <form action={handleSubmit} >
        <input type="text" name="nama" />
        <SaveButton />
      </form> */}

      <h1>Halaman Testing</h1>

      <Optimistic allTodos={allTodos} />
    </div>
  );
}
