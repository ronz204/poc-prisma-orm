import { describe, expect, it, vi } from "vitest";

import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { RetrieveCustomerFixture } from "./RetrieveCustomerFixture";
import { RetrieveCustomerHandler } from "@Handlers/Customer/Retrieve/RetrieveCustomerHandler";

describe("retrieve customer handler", () => {
  const handler = new RetrieveCustomerHandler(Prisma);
  const { customer, query, service } = RetrieveCustomerFixture;

  it("should retrieve a customer successfully", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(customer);

    const retrieved = await handler.handle(query.valid);

    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
    expect(retrieved.id).toEqual(customer.id);
    expect(retrieved.name).toEqual(customer.name);

    expect(retrieved.contracts).toBeDefined();
    expect(retrieved.contracts.length).toBe(1);

    expect(retrieved.contracts[0]?.service).toEqual(service.name);
  });

  it("should throw an error when customer does not exist", async () => {
    vi.spyOn(Prisma.customer, "findFirst").mockResolvedValue(null);
    const error = new Error("Customer does not exist.");

    await expect(handler.handle(query.valid)).rejects.toThrow(error);
    expect(Prisma.customer.findFirst).toHaveBeenCalledOnce();
  });

  it("should throw a validation error for invalid query", async () => {
    await expect(handler.handle(query.invalid)).rejects.toThrow(zod.ZodError);
  });
});
