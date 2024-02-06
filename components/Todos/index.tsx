// "use cient";
// import React, { useEffect } from "react";
// import Table from "./Table";
// import { listTodosAppsync } from "@/actions/appsync.actions";
// import { useUserStore } from "@/store/userStore";

// const Todos = () => {
//   const [status, setStatus] = React.useState("loading");
//   const [todos, setTodos] = React.useState<any>([]);
//   const { sub } = useUserStore();
//   console.log("sub", sub);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (sub) {
//           // Check if sub is truthy
//           const todosData = await listTodosAppsync(sub as string);
//           setTodos(todosData);
//           setStatus("success");
//         } else {
//           setStatus("Loading");
//         }
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//         setStatus("error");
//       }
//     };

//     fetchData();
//   }, [sub]); // Run effect when sub changes

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "error") {
//     return <div>Error occurred while fetching todos</div>;
//   }

//   if (todos.length === 0) {
//     return <h4 className="text-center mt-5">Create Todo's</h4>;
//   }

//   return (
//     <div>
//       <Table data={todos} />
//     </div>
//   );
// };

// export default Todos;
import React from "react";
import Table from "./Table";
import { listTodosAppsync } from "@/actions/appsync.actions";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import { getTodos } from "@/actions/apigateway.actions";

const Todos = () => {
  const { sub } = useUserStore();
  const { data: todos, error } = useSWR(
    sub ? ["todos", sub] : null,
    // () => getTodos(sub as string)
    () => listTodosAppsync(sub as string)
  ) as any;

  if (!sub) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error occurred while fetching todos</div>;
  }

  if (!todos || todos.length === 0) {
    return <h4 className="text-center mt-5">Create Todo's</h4>;
  }

  return (
    <div>
      <Table data={todos as any} />
    </div>
  );
};

export default Todos;
