import { Prisma } from "@Database/prisma";
import type { UserGetPayload, UserInclude } from "@Prisma/models";

const spec = {
  loans: { include: { book: true } }
} satisfies UserInclude;

export type UserWithLoans = UserGetPayload<{ include: typeof spec }>;

export const getUsersWithLoans = async (): Promise<UserWithLoans[]> => {
  return await Prisma.user.findMany({
    include: spec,
  });
};

const records = await getUsersWithLoans();
console.log(records[0]?.loans[0]?.book.title);
