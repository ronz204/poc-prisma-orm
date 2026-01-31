import { RetrieveGamesSpec } from "./RetrieveSpec";
import type { GameGetPayload } from "@Prisma/models";
import type { RetrieveGamesResponse } from "./RetrieveResponse";

type query = ReturnType<RetrieveGamesSpec["toQuery"]>;
type payload = GameGetPayload<query>[];

export class RetrieveGamesMapper {
  public static toResponse(record: payload): RetrieveGamesResponse {
    return record.map(item => ({
      id: item.id,
      title: item.title,
      genre: item.genre,
      developer: item.developer,
    }));
  };
};
