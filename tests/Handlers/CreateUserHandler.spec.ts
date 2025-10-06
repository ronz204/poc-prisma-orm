import { describe, expect, it, vi } from "vitest";

import * as z from "zod";
import { Prisma } from "@Database/Prisma";
import { CreateUserHandlerFixture } from "./CreateUserHandlerFixture";
import { CreateUserHandler } from "@Handlers/Users/Create/CreateUserHandler";

describe("create user handler", () => {
  const handler = new CreateUserHandler(Prisma);
  const { user, command } = CreateUserHandlerFixture;

  it("should create a new user successfully", async () => {
    vi.spyOn(Prisma.user, "findFirst").mockResolvedValue(null);
    vi.spyOn(Prisma.user, "create").mockResolvedValue(user);

    const created = await handler.handle(command.valid);

    expect(Prisma.user.findFirst).toHaveBeenCalledOnce();
    expect(Prisma.user.create).toHaveBeenCalledOnce();
    expect(created.name).toEqual(user.name);
  });

  it("should not create a user with existing email", async () => {
    vi.spyOn(Prisma.user, "findFirst").mockResolvedValue(user);
    const error = "User with this email already exists";

    await expect(handler.handle(command.valid)).rejects.toThrow(error);
    expect(Prisma.user.findFirst).toHaveBeenCalledOnce();
  });

  it("should not create a user with invalid data", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(z.ZodError);
  });
});
