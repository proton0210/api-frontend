"use client";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

type CreateTodoInput = {
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
