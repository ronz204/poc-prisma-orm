import { describe, expect, it } from "vitest";
import { CustomerFactory } from "@Database/Factories/CustomerFactory";
import { UpdateCustomerSpec } from "@Handlers/Customer/Update/UpdateCustomerSpec";

describe("update customer spec", () => {
  const customer1 = CustomerFactory.build({
    country: "USA",
    name: "Customer One",
    phone: "111-111-1111",
    email: "customer1@example.com",
  });

  it("should build update query with all fields", () => {
    const spec = new UpdateCustomerSpec({
      id: customer1.id,
      name: customer1.name,
      phone: customer1.phone,
      email: customer1.email,
      country: customer1.country,
    });

    const query = spec.toQuery();

    expect(query).toEqual({
      where: { id: customer1.id },
      data: {
        name: customer1.name,
        email: customer1.email,
        phone: customer1.phone,
        country: customer1.country,
      },
    });
  });
});
