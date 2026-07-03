import { describe, expect, it } from "vitest";
import { validateForm } from "../../src/lib/formValidation";

describe("validateForm", () => {
  it("returns a form-level error for unknown form types", () => {
    expect(
      validateForm("not-real" as Parameters<typeof validateForm>[0], {}),
    ).toEqual({ valid: false, errors: { _form: "Unknown form type" } });
  });

  it("returns configured required-field errors for demo requests", () => {
    expect(validateForm("demo-request", {}).errors).toEqual({
      fullName: "Full name is required",
      email: "Valid work email is required",
    });
  });

  it("trims values before checking required fields and patterns", () => {
    expect(
      validateForm("demo-request", {
        fullName: "  Ada Lovelace  ",
        email: "  ada@example.com  ",
      }),
    ).toEqual({ valid: true, errors: {} });
  });

  it("uses the whitepaper email validation message", () => {
    expect(
      validateForm("whitepaper", {
        fullName: "Grace Hopper",
        email: "not-an-email",
      }).errors,
    ).toEqual({ email: "Valid work email is required" });
  });

  it("rejects startup academic LinkedIn URLs without an http scheme", () => {
    expect(
      validateForm("startup-academic", {
        fullName: "Katherine Johnson",
        email: "katherine@example.com",
        linkedin: "linkedin.com/in/katherine",
        company: "NASA",
        role: "academic",
      }).errors,
    ).toEqual({ linkedin: "LinkedIn URL is required" });
  });

  it("accepts valid demo request data", () => {
    expect(
      validateForm("demo-request", {
        fullName: "Dorothy Vaughan",
        email: "dorothy@example.com",
      }),
    ).toEqual({ valid: true, errors: {} });
  });

  it("accepts valid startup academic data", () => {
    expect(
      validateForm("startup-academic", {
        fullName: "Mary Jackson",
        email: "mary@example.com",
        linkedin: "https://linkedin.com/in/mary",
        company: "NASA",
        role: "startup",
      }),
    ).toEqual({ valid: true, errors: {} });
  });
});
