"use client";
import { useQuery, useIsFetching } from "@tanstack/react-query";

interface Todo {
  // userId: number;
  id: number;
  title: string;
  // completed: boolean;
}

export default function Home() {

  const { data: todosData, isLoading, isError, isSuccess } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => 
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json()),
      select: (todos) => 
        todos.map((todo) => ({ id: todo.id, title: todo.title }))
  })

  const { data: usersData } = useQuery<any>({
    queryKey: ["users"],
    queryFn: () => 
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json()), 
      enabled: !!todosData // userData sẽ không được chạy nếu todosData chưa chạy xong
  })

  if(isLoading) {
    return (
      <main className="mt-4 flex min-h-screen flex-col items-center">
        It is loading...
      </main>
    )
  }

  if(isError) {
    return (
      <main className="mt-4 flex min-h-screen flex-col items-center">
        There is an error
      </main>
    )
  }

  console.log(todosData);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl">TODOS</h1>
      <div className="flex flex-col gap-2">
        {
          todosData?.slice(0,5).map((todo: Todo) => (
            <div key={todo.id} className="flex">
              <h2>{" " + todo.title}</h2>
            </div>
          ))
        }
      </div>

      <h1 className="text-xl mt-9">USERS</h1>
      <div className="flex flex-col gap-2">
        {
          usersData?.map((user: any) => (
            <div key={user.id} className="flex">
              <h2>{" " + user.name}</h2>
            </div>
          ))
        }
      </div>
    </main>
  );
}
