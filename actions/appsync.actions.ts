"use client";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

type CreateTodoInput = {
  UserID: string;
  title: string;
};

type DeleteTodoInput = {
  UserID: string;
  title: string;
};

type UpdateTodoInput = {
  UserID: string;
  title: string;
};

type CreateTodoResponse = {
  UserID: string;
  TodoID: string;
  title: string;
  completed: boolean;
};

export const createTodoAppsync = async (todoData: CreateTodoInput) => {
  try {
    const response = await client.graphql({
      query: `
          mutation CreateTodo($input: CreateTodoInput!) {
            createTodo(input: $input) {
              UserID
              TodoID
              title
              completed
            }
          }
        `,
      variables: {
        input: todoData,
      },
      authMode: "userPool",
    });

    return (response as any).data.createTodo as CreateTodoResponse;
  } catch (error) {
    // Handle error if necessary
    throw error; // Rethrow the error or handle it according to your requirements
  }
};

type ListTodosResponse = {
  UserID: string;
  TodoID: string;
  title: string;
  completed: boolean;
}[];

export const listTodosAppsync = async (UserID: string) => {
  console.log("UserID", UserID);
  try {
    const response = await client.graphql({
      query: `
          query ListTodos($UserID: ID!) {
            listTodos(UserID: $UserID) {
              UserID
              TodoID
              title
              completed
            }
          }
        `,
      variables: {
        UserID,
      },
      authMode: "userPool",
    });

    return (response as any).data.listTodos as ListTodosResponse;
  } catch (error) {
    // Handle error if necessary
    throw error; // Rethrow the error or handle it according to your requirements
  }
};
export const deleteTodoAppsync = async (todoData: DeleteTodoInput) => {
  try {
    const response = await client.graphql({
      query: `
          mutation DeleteTodo($input: DeleteTodoInput!) {
            deleteTodo(input: $input) 
          }
        `,
      variables: {
        input: todoData,
      },
      authMode: "userPool",
    });

    return (response as any).data.deleteTodo as CreateTodoResponse;
  } catch (error) {
    // Handle error if necessary
    console.log("error", error);
    throw error; // Rethrow the error or handle it according to your requirements
  }
};

export const updateTodoAppsync = async (todoData: UpdateTodoInput) => {
  try {
    const response = await client.graphql({
      query: `
          mutation UpdateTodo(
            $input: UpdateTodoInput!
          ) {
            updateTodo(
              input: $input
            )
          }
        `,
      variables: {
        input: todoData,
      },
      authMode: "userPool",
    });

    return (response as any).data.updateTodo as CreateTodoResponse;
  } catch (error) {
    // Handle error if necessary
    console.log("error", error);
    throw error; // Rethrow the error or handle it according to your requirements
  }
};
