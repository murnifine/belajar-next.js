"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { addTodo, getTodos } from "./actions";

export default function Page() {
  const [text, setText] = useState("");
  const { data, mutate } = useSWR("/api/todos", getTodos);

  return (
    <div>
      <h1>Todos </h1>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          onClick={async () => {
            setText("");

            const newTodo = {
              id: Date.now(),
              title: text,
            };

            try {
              // Update the local state immediately and fire the
              // request. Since the API will return the updated
              // data, there is no need to start a new revalidation
              // and we can directly populate the cache.
              // await mutate(addTodo(newTodo), {
              //   optimisticData: [...data, newTodo],
              //   rollbackOnError: true,
              //   populateCache: true,
              //   revalidate: false,
              // });
              //   toast.success("Successfully added the new item.");
            } catch (e) {
              // If the API errors, the original data will be
              // rolled back by SWR automatically.
              //   toast.error("Failed to add the new item.");
            }
          }}
        >
          Add
        </button>
      </form>
      <ul>
        {data
          ? data.map((todo: any) => {
              return <li key={todo.id}>{todo.title}</li>;
            })
          : null}
      </ul>
    </div>
  );
}
