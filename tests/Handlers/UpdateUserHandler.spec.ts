import { describe, expect, it, vi } from "vitest";

import * as z from "zod";
import { Prisma } from "@Database/Prisma";
import { UpdateUserHandlerFixture } from "./UpdateUserHandlerFixture";
import { UpdateUserHandler } from "@Handlers/Users/Update/UpdateUserHandler";

describe("update user handler", () => {
  const handler = new UpdateUserHandler(Prisma);
  const { updated, command } = UpdateUserHandlerFixture;

  it("should update a user successfully", async () => {
    vi.spyOn(Prisma.user, "update").mockResolvedValue(updated);

    const result = await handler.handle(command.valid);

    expect(Prisma.user.update).toHaveBeenCalledOnce();
    expect(result.id).toEqual(updated.id);
    expect(result.name).toEqual(updated.name);
    expect(result.phone).toEqual(updated.phone);
    expect(result.country).toEqual(updated.country);
  });

  it("should throw error when user does not exist", async () => {
    const prismaError = new Error("Record to update not found");
    vi.spyOn(Prisma.user, "update").mockRejectedValue(prismaError);

    await expect(handler.handle(command.valid)).rejects.toThrow("Record to update not found");
    expect(Prisma.user.update).toHaveBeenCalledOnce();
  });

  it("should not update a user with invalid data", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(z.ZodError);
  });
});
