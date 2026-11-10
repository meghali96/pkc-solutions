import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { contactSchema } from "@/routes/index";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("accepts a complete, correctly formatted contact enquiry", () => {
    expect(
      contactSchema.safeParse({ name: "Avery Chen", email: "avery@example.com", message: "We are planning a new website." }).success,
    ).toBe(true);
  });

  it("rejects malformed and incomplete contact details", () => {
    expect(
      contactSchema.safeParse({ name: "A", email: "not-an-email", message: "Short" }).success,
    ).toBe(false);
  });
});
