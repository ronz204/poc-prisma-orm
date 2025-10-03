import { Unit } from "@Database/Unit";
import { Prisma } from "@Database/Prisma";
import { StatusUserSpec } from "@Specs/StatusUserSpec";

const unit = new Unit(Prisma);

const spec = new StatusUserSpec({
  active: true,
  limit: 10,
  page: 0,
});

const records = await unit.user.list(spec);
/* console.log(records[0]?.contracts[0]?.service); */
