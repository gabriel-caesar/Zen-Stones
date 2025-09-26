'use server'

import z from 'zod';
import { User } from '../types/types';
import postgres from 'postgres';
import { createSession, deleteSession } from './session';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// login schema to validade use input
const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .trim()
})

export async function login(prevState: any, formData: FormData) {
  // parsing email and password form data agains loginSchema
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  // if the parsing wasn't successful, return the errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  // destructuring the email from the validated user
  const { email, password } = result.data;

  // getting the user from db
  const dbUser = await getUserFromDb(email, password);

  // if it wasn't able to get the user from db, credentials were invalid
  if (!dbUser) {
    return {
      errors: {
        password: ['Invalid credentials']
      }
    }
  }

  // getting a session token for the user
  await createSession(dbUser.id, dbUser.admin);

  // redirect user to main page
  redirect('/');
};

async function getUserFromDb(email: string, password: string):Promise<User | undefined> {
  try {

    // querying the database for the user
    const user = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email} AND password = ${password};
    `

    return user[0];

  } catch (error) {
    throw new Error(`Couldn't fetch user from db. ${error}`)
  }
}

// deletes the cookie session and redirects user
export async function logout() {
  await deleteSession();
  redirect('/');
};