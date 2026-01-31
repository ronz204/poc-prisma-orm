import { RetrieveCountriesSpec } from "./RetrieveSpec";
import type { CountryGetPayload } from "@Prisma/models";
import type { RetrieveCountriesResponse } from "./RetrieveResponse";

type query = ReturnType<RetrieveCountriesSpec["toQuery"]>;
type payload = CountryGetPayload<query>[];

export class RetrieveCountriesMapper {
  public static toResponse(record: payload): RetrieveCountriesResponse {
    return record.map(item => ({
      id: item.id,
      name: item.name,
      code: item.code,
    }));
  };
};
