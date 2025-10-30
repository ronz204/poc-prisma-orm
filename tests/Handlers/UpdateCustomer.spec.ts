import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { describe, expect, it, vi } from "vitest";
import { UpdateCustomerFixture } from "@Fixtures/UpdateCustomerFixture";
import { UpdateCustomerHandler } from "@Handlers/Customer/Update/UpdateCustomerHandler";

describe("update customer handler", () => {
  const handler = new UpdateCustomerHandler(Prisma);
  const { customer, command } = UpdateCustomerFixture;

  it("should update a customer successfully", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(customer);
    vi.spyOn(Prisma.customer, "update").mockResolvedValue(customer);

    const updated = await handler.handle(command.valid);

    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.customer.update).toHaveBeenCalledOnce();
    expect(updated.name).toEqual(customer.name);
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
