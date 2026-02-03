import { RegisterPlayerSpec } from "./RegisterSpec";
import type { PlayerGetPayload } from "@Prisma/models";
import type { RegisterPlayerResponse } from "./RegisterResponse";

type query = ReturnType<RegisterPlayerSpec["toQuery"]>;
type payload = PlayerGetPayload<query>;

export class RegisterPlayerMapper {
  public static toResponse(record: payload): RegisterPlayerResponse {
    return {
      id: record.id,
      name: record.name,
      status: record.status,
      isFree: record.isFreeAgent,
      country: record.country.name,
    };
  };
};
