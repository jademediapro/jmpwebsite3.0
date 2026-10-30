import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { newsletterSchema, reviewRequestSchema, websiteAddressSchema } from "./newsletter";

const request = { source: "free-website-review", name: "Jane", email: "jane@example.com", website: "example.com", language: "fr" };

describe("free review requirements", () => {
  test("requires a name", () => {
    assert.equal(newsletterSchema.safeParse({ ...request, name: " " }).success, false);
  });
  test("requires a valid email", () => {
    assert.equal(reviewRequestSchema.safeParse({ ...request, email: "invalid" }).success, false);
  });
  test("requires the website even through the newsletter endpoint", () => {
    const { website, ...incomplete } = request;
    assert.equal(newsletterSchema.safeParse(incomplete).success, false);
  });
  test("keeps the French language and normalizes a website address", () => {
    assert.deepEqual(newsletterSchema.parse(request), { ...request, website: "https://example.com" });
  });
  test("rejects unsafe website protocols", () => {
    assert.equal(websiteAddressSchema.safeParse("javascript:alert(1)").success, false);
  });
  test("preserves email-only footer subscriptions", () => {
    assert.deepEqual(newsletterSchema.parse({ email: "jane@example.com", source: "footer" }), { email: "jane@example.com", source: "footer" });
  });
});