import { describe, expect, it, vi } from "vitest";

import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { UpdateServiceFixture } from "@Fixtures/UpdateServiceFixture";
import { UpdateServiceHandler } from "@Handlers/Services/Update/UpdateServiceHandler";

describe("update service handler", () => {
  const handler = new UpdateServiceHandler(Prisma);
  const { service, command } = UpdateServiceFixture;

  it("should update a service successfully", async () => {
    vi.spyOn(Prisma.service, "findFirst").mockResolvedValue(service);
    vi.spyOn(Prisma.service, "update").mockResolvedValue(service);

    const updated = await handler.handle(command.valid);

    expect(Prisma.service.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.service.update).toHaveBeenCalledOnce();

    expect(updated.name).toEqual(service.name);
    expect(updated.price).toEqual(service.price.toNumber());
  });

  it("should throw an error when service does not exist", async () => {
    vi.spyOn(Prisma.service, "findFirst").mockResolvedValue(null);
    const error = new Error("Service does not exist.");

    await expect(handler.handle(command.valid)).rejects.toThrow(error);
    expect(Prisma.service.findFirst).toHaveBeenCalledOnce();
  });

  it("should throw a validation error for invalid command", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(zod.ZodError);
  });
});
