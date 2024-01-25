"use client";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

type CreateTodoInput = {
  userId: string;
  title: string;
};

type CreateTodoResponse = {
  todoId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export const createTodoAppsync = async (todoData: CreateTodoInput) => {
  try {
    const response = await client.graphql({
      query: `
          mutation CreateTodo($input: CreateTodoInput!) {
            createTodo(input: $input) {
              todoId
              title
              completed
              createdAt
              updatedAt
            }
          }
        `,
      variables: {
        input: todoData,
      },
      authMode: "userPool",
    });

    return (response as any).data.createTodo; // Use type assertion to any for response object
  } catch (error) {
    // Handle error if necessary
    throw error; // Rethrow the error or handle it according to your requirements
  }
};
