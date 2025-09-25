export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  admin: boolean,
}

export type SessionPayload = {
  userId: string;
  isAdmin: boolean;
  expiresAt: Date;
};