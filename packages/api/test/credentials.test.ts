import { describe, expect, it } from "vitest";

import { Language, QuranClient } from "../src";

describe("QuranClient credentials enforcement", () => {
  it("throws when clientId is missing or empty", () => {
    // @ts-expect-error - we want to simulate a missing value at runtime
    expect(() => new QuranClient({ clientId: undefined, clientSecret: "secret" }))
      .toThrow(/clientId/);

    expect(
      () =>
        new QuranClient({
          clientId: "   ",
          clientSecret: "secret",
        }),
    ).toThrow(/clientId/);

    expect(
      () =>
        new QuranClient({
          clientId: "",
          clientSecret: "secret",
        }),
    ).toThrow(/clientId/);
  });

  it("throws when clientSecret is missing or empty", () => {
    // @ts-expect-error - we want to simulate a missing value at runtime
    expect(
      () =>
        new QuranClient({
          clientId: "client",
          clientSecret: undefined,
        }),
    ).toThrow(/clientSecret/);

    expect(
      () =>
        new QuranClient({
          clientId: "client",
          clientSecret: "",
        }),
    ).toThrow(/clientSecret/);

    expect(
      () =>
        new QuranClient({
          clientId: "client",
          clientSecret: "   ",
        }),
    ).toThrow(/clientSecret/);
  });

  it("allows instantiation when both credentials are provided", () => {
    expect(
      () =>
        new QuranClient({
          clientId: "client",
          clientSecret: "secret",
          defaults: {
            language: Language.ENGLISH,
          },
        }),
    ).not.toThrow();
  });

  it("throws when updateConfig is called with empty credentials", () => {
    const client = new QuranClient({
      clientId: "client",
      clientSecret: "secret",
    });

    expect(() => client.updateConfig({ clientId: "" })).toThrow(/clientId/);
    expect(() => client.updateConfig({ clientSecret: "" })).toThrow(/clientSecret/);
  });
});
