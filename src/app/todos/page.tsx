"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { log } from "console";

const Todos = () => {

    const queryClient = useQueryClient();

    const mutation: any = useMutation<any>({
        mutationFn: (newTodo) => {
            return axios.post("http://localhost:3001/todos", newTodo)
        },
        // Sau khi thêm thì nó không hiện lên trên màn hình mà phải refresh, nên phải thêm đoạn code bên dưới
        // variables object newTodo đang được truyền với mutationFn
        onMutate: (variables) => {
            console.log('A mutation is about to happen', variables);
        },
        onError: (error, variables, context) => {
            console.log('An error happened', error.message);
        },
        onSuccess: (data, variables, context) => {
            console.log('The mutation has succeeded', data);
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })

    const { data: todosData } = useQuery<any>({
        queryKey: ["todos"],
        queryFn: () => 
            fetch("http://localhost:3001/todos")
                .then((res) => res.json()),
    })

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {
                mutation.isPending ? (
                    'Adding todo...'
                ) : (
                    <>
                        {
                            mutation.isError ? (
                                <div>An error occurred: {mutation.error.message}</div>
                            ) : null
                        }

                        {
                            mutation.isSuccess ? 
                                <div>Todo added!</div> : null
                        }

                        <button
                            onClick={() => {
                                mutation.mutate({ id: new Date(), title: 'Do Laundry' })
                            }}
                        >
                            Create Todo
                        </button>

                        <h1 className="text-xl">TODOS</h1>
                            <div className="flex flex-col gap-2">
                                {
                                    todosData?.map((todo: any) => (
                                        <div key={todo.id} className="flex">
                                            <h2>{" " + todo.title}</h2>
                                        </div>
                                    ))
                                }
                            </div>
                    </>
                )
            }


        </div>
    )
}

export default Todos