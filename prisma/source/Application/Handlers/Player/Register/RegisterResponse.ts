import { PlayerStatus } from "@Prisma/enums";

export type RegisterPlayerResponse = {
  id: number;
  name: string;
  country: string;
  isFree: boolean;
  status: PlayerStatus;
};
