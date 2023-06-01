"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTodo(judul: string) {
    return new Promise(async (resolve) => {
        const addTodo = await prisma.todo.create({
            data: {
                title: judul,
            },
        });
        setTimeout(() => {
            resolve(addTodo);
            revalidatePath("/test")
        }, 200); // Simulate a .2s delay


    });
}

export async function hapusTodo(id: number) {
    return new Promise(async (resolve) => {
        const hapus = await prisma.todo.delete({
            where: {
                id
            },
        });
        setTimeout(() => {
            resolve(hapus);
            revalidatePath("/test")
        }, 200); // Simulate a .2s delay


    });
}

export async function handleSubmit(form: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // const { nama, umur } = Object.fromEntries(form)
    // console.log({ nama, umur })
    console.log("hlo");

}