'use client'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores"

const myWixClient = createClient({
    modules: {
      products,
    },
    auth: OAuthStrategy({
      clientId: "<YOUR_CLIENT_ID>",
      tokens: {
        accessToken: {
          value: "<ACCESS_TOKEN_VALUE>",
          expiresAt: "<ACCESS_TOKEN_EXPIRY_DATE>",
        },
        refreshToken: {
          value: "<REFRESH_TOKEN_VALUE>",
        },
      },
    }),
  });
  
