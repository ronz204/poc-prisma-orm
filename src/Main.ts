import { Unit } from "@Database/Unit";
import { Prisma } from "@Database/Prisma";
import { StatusUserSpec } from "@Specs/StatusUserSpec";

const unit = new Unit(Prisma);

const spec = new StatusUserSpec({
  active: true,
  limit: 10,
  page: 0,
});


