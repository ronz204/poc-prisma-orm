import { Unit } from "@Database/Unit";
import { Prisma } from "@Database/Prisma";

const unit = new Unit(Prisma);

const records = await unit.user.list();
console.log(records);
