import { describe, expect, it } from "vitest";
import { CustomerFactory } from "@Database/Factories/CustomerFactory";
import { VerifyCustomerExistSpec } from "@Specs/Shared/VerifyCustomerExistSpec";

describe("verify customer exist spec", () => {
  const customer = CustomerFactory.build({
    country: "USA",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  });

  it("should build OR query with id only", () => {
    const spec = new VerifyCustomerExistSpec({ id: customer.id });
    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          id: customer.id,
        }]
      }
    });
  });

  it("should build OR query with email only", () => {
    const spec = new VerifyCustomerExistSpec({ email: customer.email });
    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          email: customer.email,
        }]
      }
    });
  });

  it("should build OR query with id and email", () => {
    const spec = new VerifyCustomerExistSpec({
      id: customer.id, email: customer.email
    });

    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          id: customer.id,
          email: customer.email,
        }]
      }
    });
  });
});
