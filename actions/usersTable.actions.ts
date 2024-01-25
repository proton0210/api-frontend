import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { any } from "zod";
const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET as string,
  },
});
export const getUserByID = async (UserID: string) => {
  try {
    const params = {
      TableName: "Users",
      Key: marshall({ UserID: UserID }),
    };
    const command = new GetItemCommand(params);

    const response = await client.send(command);
    const user = unmarshall(response.Item || {});
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
