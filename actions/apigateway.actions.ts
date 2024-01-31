import { get } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
const API_NAME = "TodoHttpAPI";

export async function getTodos(sub: string) {
  const authToken = (await fetchAuthSession()).tokens?.accessToken?.toString();
  const id = sub;
  try {
    const restOperation = get({
      apiName: API_NAME,
      path: "/todo?id=" + id,
      options: {
        headers: {
          Authorization: authToken as string,
        },
      },
    });
    const { body } = await restOperation.response;
    const json = (await body.json()) as any;
    const { todos } = json;
    return todos;
  } catch (error) {
    console.log("GET call failed: ", error);
  }
}
