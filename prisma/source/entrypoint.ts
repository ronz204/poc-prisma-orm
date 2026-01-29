import { Prisma } from "@Database/connector";





/* import { Prisma } from "@Database/prisma";
import type { UserInclude } from "@Prisma/models";

const include = { loans: { include: { book: true } } } satisfies UserInclude;

export const getUsersWithLoans = async () => {
  return await Prisma.user.findMany({ include });
};

const records = await getUsersWithLoans();
console.log(records[0]?.loans[0]?.book.title);
 */