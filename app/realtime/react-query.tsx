"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getTodo } from "./action";
import axios from "axios";

const queryClient = new QueryClient();

export default function ReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error Async Server Component */}
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getTodo,
    // refetchInterval: 3000,
  });

  if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1>Mabtab</h1>
      <h1>{JSON.stringify(data)}</h1>
    </>
  );
}
