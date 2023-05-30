"use client"
import { create } from 'zustand'

interface TodoState {
    angka: number
    increase: (by: number) => void
}

export const useTodoStore = create<TodoState>()((set) => ({
    angka: 2,
    increase: (by) => set((state) => ({ angka: state.angka + by })),
}))

