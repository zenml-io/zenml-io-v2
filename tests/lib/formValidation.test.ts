import { describe, expect, it } from "vitest";
import {
  FORM_RULES,
  type FormType,
  validateForm,
} from "../../src/lib/formValidation";

type FormValidationCase = {
  validData: Record<string, string>;
  invalidData: Record<string, string>;
  expectedErrors: Record<string, string>;
};

const formValidationCases = {
  "demo-request": {
    validData: {
      fullName: "Dorothy Vaughan",
      email: "dorothy@example.com",
      jobTitle: "Data Scientist",
    },
    invalidData: {
      email: "not-an-email",
    },
    expectedErrors: {
      fullName: "Full name is required",
      email: "Valid work email is required",
    },
  },
  whitepaper: {
    validData: {
      fullName: "Grace Hopper",
      email: "grace@example.com",
      jobTitle: "Other",
    },
    invalidData: {
      email: "not-an-email",
    },
    expectedErrors: {
      fullName: "Full name is required",
      email: "Valid work email is required",
    },
  },
  "brick-manual": {
    validData: {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
    },
    invalidData: {
      email: "not-an-email",
    },
    expectedErrors: {
      fullName: "Full name is required",
      email: "Valid email is required",
    },
  },
  "startup-academic": {
    validData: {
      fullName: "Mary Jackson",
      email: "mary@example.com",
      linkedin: "https://linkedin.com/in/mary",
      company: "NASA",
      role: "founder-co-founder",
    },
    invalidData: {
      email: "not-an-email",
      linkedin: "linkedin.com/in/katherine",
    },
    expectedErrors: {
      fullName: "Full name is required",
      email: "Valid email is required",
      linkedin: "Valid LinkedIn profile URL is required",
      company: "Organization name is required",
      role: "Please select a role",
    },
  },
} satisfies Record<FormType, FormValidationCase>;

const configuredFormTypes = Object.keys(FORM_RULES) as FormType[];

describe("validateForm", () => {
  it("returns a form-level error for unknown form types", () => {
    expect(
      validateForm("not-real" as Parameters<typeof validateForm>[0], {}),
    ).toEqual({ valid: false, errors: { _form: "Unknown form type" } });
  });

  it.each(
    configuredFormTypes,
  )("accepts representative valid %s data", (formType) => {
    expect(
      validateForm(formType, formValidationCases[formType].validData),
    ).toEqual({
      valid: true,
      errors: {},
    });
  });

  it.each(
    configuredFormTypes,
  )("returns configured validation errors for invalid %s data", (formType) => {
    expect(
      validateForm(formType, formValidationCases[formType].invalidData),
    ).toEqual({
      valid: false,
      errors: formValidationCases[formType].expectedErrors,
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

  it.each(
    configuredFormTypes,
  )("rejects HTML, line breaks, control characters, and oversized full names for %s", (formType) => {
    const validData = formValidationCases[formType].validData;
    const unsafeNames = [
      '<a href="https://evil.example">Click here</a>',
      "Ada\nLovelace",
      "Ada Lovelace\r\n",
      "Ada\u0000Lovelace",
      "A".repeat(101),
    ];

    for (const fullName of unsafeNames) {
      expect(validateForm(formType, { ...validData, fullName }).errors).toEqual(
        {
          fullName:
            "Full name must be 100 characters or fewer and cannot contain HTML or line breaks",
        },
      );
    }
  });

  it.each([
    "demo-request",
    "whitepaper",
    "startup-academic",
  ] as const)("rejects HTML, line breaks, control characters, and oversized company names for %s", (formType) => {
    const validData = formValidationCases[formType].validData;
    const unsafeCompanies = [
      '<a href="https://evil.example">Click here</a>',
      "Analytical\nEngines",
      "Analytical Engines\r\n",
      "Analytical\u0000Engines",
      "A".repeat(201),
    ];

    for (const company of unsafeCompanies) {
      expect(validateForm(formType, { ...validData, company }).errors).toEqual({
        company:
          "Company or organization name must be 200 characters or fewer and cannot contain HTML or line breaks",
      });
    }
  });

  it("accepts ordinary Unicode and punctuation in names and companies", () => {
    expect(
      validateForm("demo-request", {
        fullName: "María O'Connor-Sørensen",
        email: "maria@example.com",
        company: "München AI GmbH & Co. KG",
      }),
    ).toEqual({ valid: true, errors: {} });
  });

  it("accepts names and companies at their maximum lengths", () => {
    expect(
      validateForm("demo-request", {
        fullName: "A".repeat(100),
        email: "ada@example.com",
        company: "B".repeat(200),
      }),
    ).toEqual({ valid: true, errors: {} });
  });

  it("rejects startup academic LinkedIn URLs without an https scheme", () => {
    expect(
      validateForm("startup-academic", {
        fullName: "Katherine Johnson",
        email: "katherine@example.com",
        linkedin: "linkedin.com/in/katherine",
        company: "NASA",
        role: "researcher-scientist",
      }).errors,
    ).toEqual({ linkedin: "Valid LinkedIn profile URL is required" });
  });

  it.each([
    "demo-request",
    "whitepaper",
  ] as const)("rejects job titles outside the configured options for %s", (formType) => {
    expect(
      validateForm(formType, {
        ...formValidationCases[formType].validData,
        jobTitle: '<a href="https://evil.example">Click here</a>',
      }).errors,
    ).toEqual({ jobTitle: "Please select a valid job title" });
  });

  it("rejects startup roles outside the configured options", () => {
    expect(
      validateForm("startup-academic", {
        ...formValidationCases["startup-academic"].validData,
        role: '<a href="https://evil.example">Click here</a>',
      }).errors,
    ).toEqual({ role: "Please select a valid role" });
  });

  it.each([
    "https://evil.example/in/mary",
    "https://linkedin.com.evil.example/in/mary",
    "https://linkedin.com/company/zenml",
    "https://linkedin.com/in/<script>",
    "https://linkedin.com/in/mary\nmalicious",
  ])("rejects unsafe or non-profile LinkedIn URL %s", (linkedin) => {
    expect(
      validateForm("startup-academic", {
        ...formValidationCases["startup-academic"].validData,
        linkedin,
      }).errors,
    ).toEqual({ linkedin: "Valid LinkedIn profile URL is required" });
  });

  it("accepts a canonical www LinkedIn profile URL", () => {
    expect(
      validateForm("startup-academic", {
        ...formValidationCases["startup-academic"].validData,
        linkedin: "https://www.linkedin.com/in/mary-jackson/",
      }),
    ).toEqual({ valid: true, errors: {} });
  });

  it("uses the brick manual email validation message", () => {
    expect(
      validateForm("brick-manual", {
        fullName: "Ada Lovelace",
        email: "not-an-email",
      }).errors,
    ).toEqual({ email: "Valid email is required" });
  });
});
