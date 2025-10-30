import { describe, expect, it } from "vitest";
import { CustomerFactory } from "@Database/Factories/CustomerFactory";
import { RegisterCustomerSpec } from "@Handlers/Customer/Register/RegisterCustomerSpec";

describe("register customer spec", () => {
  const customer1 = CustomerFactory.build({
    country: "USA",
    name: "Customer One",
    phone: "111-111-1111",
    email: "customer1@example.com",
  });

  const customer2 = CustomerFactory.build({
    country: "Canada",
    name: "Customer Two",
    phone: "222-222-2222",
    email: "customer2@example.com",
  });

  it("should build create query with all fields", () => {
    const spec = new RegisterCustomerSpec({
      name: customer1.name,
      phone: customer1.phone,
      email: customer1.email,
      country: customer1.country,
    });

    const query = spec.toQuery();

    expect(query).toEqual({
      data: {
        name: customer1.name,
        email: customer1.email,
        phone: customer1.phone,
        country: customer1.country,
      },
    });
  });

  it("should create different queries for different commands", () => {
    const spec1 = new RegisterCustomerSpec({
      name: customer1.name,
      phone: customer1.phone,
      email: customer1.email,
      country: customer1.country,
    });

    const spec2 = new RegisterCustomerSpec({
      name: customer2.name,
      phone: customer2.phone,
      email: customer2.email,
      country: customer2.country,
    });

    expect(spec1.toQuery()).not.toEqual(spec2.toQuery());
  });
});
