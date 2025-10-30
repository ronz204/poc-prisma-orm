import { describe, expect, it, vi } from "vitest";

import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { RegisterCustomerFixture } from "@Fixtures/RegisterCustomerFixture";
import { RegisterCustomerHandler } from "@Handlers/Customer/Register/RegisterCustomerHandler";

describe("register customer handler", () => {
  const handler = new RegisterCustomerHandler(Prisma);
  const { customer, command } = RegisterCustomerFixture;

  it("should register a customer successfully", async () => {
    vi.spyOn(Prisma.customer, "create").mockResolvedValue(customer);
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(null);

    const created = await handler.handle(command.valid);

    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.customer.create).toHaveBeenCalledOnce();
    expect(created.name).toEqual(customer.name);
  });

  it("should throw an error when customer already exists", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(customer);
    const error = new Error("Customer with this email already exists.");

    await expect(handler.handle(command.valid)).rejects.toThrow(error);
    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
  });

  it("should throw a validation error for invalid command", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(zod.ZodError);
  });
});
