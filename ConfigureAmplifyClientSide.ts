"use client";

import { Amplify } from "aws-amplify";
import { ResourcesConfig } from "@aws-amplify/core";

const config: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
      region: process.env.NEXT_PUBLIC_REGION as string,
      defaultAuthMode: "userPool",
    },
    REST: {
      TodoHttpAPI: {
        endpoint: process.env.NEXT_PUBLIC_APIGATEWAY_ENDPOINT as string,
        region: process.env.NEXT_PUBLIC_REGION as string,
      },
    },
  },
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID as string,
      signUpVerificationMethod: "code",
    },
  },
};

Amplify.configure(config, {
  ssr: true,
});
export default function ConfigureAmplifyClientSide() {
  return null;
}
