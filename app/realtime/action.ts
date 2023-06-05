"use server"

import prisma from "@/lib/prisma"
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 5000));


export async function getTodo() {
    const data = await prisma.todo.findMany()
    return data
}

export const addTodo = async (title: any) => {
    // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
    // await delay()
    return await prisma.todo.create({
        data: {
            title: title as string,
        },
    });

    // return todo
}

export async function deleteTodo(id: number) {
    return await prisma.todo.delete({
        where: { id },
    });
}

export async function updateTodo(id: number, newTitle: string) {
    // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
    return await prisma.todo.update({
        where: { id },
        data: {
            title: newTitle,
        },
    });

}