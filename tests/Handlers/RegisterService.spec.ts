import { describe, expect, it, vi } from "vitest";

import * as zod from "zod";
import { Prisma } from "@Database/Prisma";
import { RegisterServiceFixture } from "@Fixtures/RegisterServiceFixture";
import { RegisterServiceHandler } from "@Handlers/Services/Register/RegisterServiceHandler";

describe("register service handler", () => {
  const handler = new RegisterServiceHandler(Prisma);
  const { service, command } = RegisterServiceFixture;

  it("should register a service successfully", async () => {
    vi.spyOn(Prisma.service, "findFirst").mockResolvedValue(null);
    vi.spyOn(Prisma.service, "create").mockResolvedValue(service);

    const registered = await handler.handle(command.valid);

    expect(Prisma.service.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.service.create).toHaveBeenCalledOnce();
    
    expect(registered.name).toEqual(service.name);
    expect(registered.price).toEqual(service.price.toNumber());
  });

  it("should throw an error when service already exists", async () => {
    vi.spyOn(Prisma.service, "findFirst").mockResolvedValue(service);
    const error = new Error("Service with this name already exists.");

    await expect(handler.handle(command.valid)).rejects.toThrow(error);
    expect(Prisma.service.findFirst).toHaveBeenCalledOnce();
  });

  it("should throw a validation error for invalid command", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(zod.ZodError);
  });
});
