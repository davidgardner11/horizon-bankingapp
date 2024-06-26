'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        console.log("Entering signIn(), email: " + email + " password: " + password);

        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        return parseStringify(response);

    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error', error);
    }
}

export async function getLoggedInUser() {
    try {
        console.log("Entering getLoggedInUser() try-catch block...");
        const { account } = await createSessionClient();

        const user = await account.get();
        console.log("getLoggedInUser() user: " + parseStringify(user));

        return parseStringify(user);
    } catch (error) {
        console.error('Error', error);
        return null;
    }
  }

  export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');

        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
  }
  