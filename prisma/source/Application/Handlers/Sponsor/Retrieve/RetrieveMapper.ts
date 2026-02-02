import { RetrieveSponsorsSpec } from "./RetrieveSpec";
import type { SponsorGetPayload } from "@Prisma/models";
import type { RetrieveSponsorsResponse } from "./RetrieveResponse";

type query = ReturnType<RetrieveSponsorsSpec["toQuery"]>;
type payload = SponsorGetPayload<query>[];

export class RetrieveSponsorsMapper {
  public static toResponse(record: payload): RetrieveSponsorsResponse {
    return record.map(item => ({
      id: item.id,
      name: item.name,
      logo: item.logoUrl,
      website: item.websiteUrl,
    }));
  };
};
