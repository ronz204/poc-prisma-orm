import { describe, expect, it, vi } from "vitest";

import * as z from "zod";
import { Prisma } from "@Database/Prisma";
import { DeleteUserHandlerFixture } from "./DeleteUserHandlerFixture";
import { DeleteUserHandler } from "@Handlers/Users/Delete/DeleteUserHandler";

describe("delete user handler", () => {
  const handler = new DeleteUserHandler(Prisma);
  const { deleted, command } = DeleteUserHandlerFixture;

  it("should delete a user successfully", async () => {
    vi.spyOn(Prisma.user, "delete").mockResolvedValue(deleted);

    const result = await handler.handle(command.valid);

    expect(Prisma.user.delete).toHaveBeenCalledOnce();
    expect(result.id).toEqual(deleted.id);
    expect(result.name).toEqual(deleted.name);
    expect(result.phone).toEqual(deleted.phone);
    expect(result.country).toEqual(deleted.country);
  });

  it("should throw error when user does not exist", async () => {
    const prismaError = new Error("Record to delete does not exist");
    vi.spyOn(Prisma.user, "delete").mockRejectedValue(prismaError);

    await expect(handler.handle(command.valid)).rejects.toThrow("Record to delete does not exist");
    expect(Prisma.user.delete).toHaveBeenCalledOnce();
  });

  it("should not delete a user with invalid data", async () => {
    await expect(handler.handle(command.invalid)).rejects.toThrow(z.ZodError);
  });
});
