import { describe, expect, it, vi } from "vitest";

import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { SuspendCustomerFixture } from "@Fixtures/SuspendCustomerFixture";
import { SuspendCustomerHandler } from "@Handlers/Customer/Suspend/SuspendCustomerHandler";

describe("suspend customer handler", () => {
  const handler = new SuspendCustomerHandler(Prisma);
  const { customer, command } = SuspendCustomerFixture;

  it("should suspend a customer successfully", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(customer);
    vi.spyOn(Prisma.customer, "update").mockResolvedValue(customer);

    const updated = await handler.handle(command.valid);

    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.customer.update).toHaveBeenCalledOnce();
    
    expect(updated.id).toEqual(customer.id);
    expect(updated.active).toBe(false);
  });

  it("should throw an error when customer does not exist", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(null);
    const error = new Error("Customer does not exist.");

    await expect(handler.handle(command.valid)).rejects.toThrow(error);
    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
  });

  it("should throw a validation error for invalid command", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(zod.ZodError);
  });
});
