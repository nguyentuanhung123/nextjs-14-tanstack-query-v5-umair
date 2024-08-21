"use client";
import { useQuery, useIsFetching } from "@tanstack/react-query";

export default function Home() {

  const { data, isLoading, isError, isSuccess } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: () => 
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
  })

  if(isLoading) {
    return (
      <main className="mt-4 flex min-h-screen flex-col items-center">
        It is loading...
      </main>
    )
  }

  console.log(data);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>home page</div>
    </main>
  );
}
