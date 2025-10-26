import { describe, expect, it } from "vitest";
import { ServiceFactory } from "@Database/Factories/ServiceFactory";
import { VerifyServiceExistSpec } from "@Specs/Shared/VerifyServiceExistSpec";

describe("verify service exist spec", () => {
  const service = ServiceFactory.build({
    name: "Premium Cleaning",
  });

  it("should build OR query with id only", () => {
    const spec = new VerifyServiceExistSpec({ id: service.id });
    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          id: service.id,
        }]
      }
    });
  });

  it("should build OR query with name only", () => {
    const spec = new VerifyServiceExistSpec({ name: service.name });
    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          name: service.name,
        }]
      }
    });
  });

  it("should build OR query with id and name", () => {
    const spec = new VerifyServiceExistSpec({
      id: service.id, name: service.name
    });
    
    const query = spec.toQuery();

    expect(query).toEqual({
      where: {
        OR: [{
          id: service.id,
          name: service.name
        }]
      }
    });
  });
});
