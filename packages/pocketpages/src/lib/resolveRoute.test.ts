import { test, expect } from "bun:test";
import { resolveRoute } from "./resolveRoute";

// Mock $app and $filepath globals for all tests
globalThis.$app = {
  store: () => ({ get: () => ({ config: {} }) }),
  logger: () => ({ debug: () => {} }) // evita erro do dbg
};
globalThis.$filepath = {
  toSlash: (s: string) => s.replace(/\\/g, "/"),
};

const baseRoute = (overrides = {}) => ({
  segments: [],
  isStatic: true,
  fingerprint: "abc",
  relativePath: "index",
  ...overrides,
});

test("matches index route", () => {
  const routes = [baseRoute({ segments: [{ nodeName: "index" }] })];
  const url = { pathname: "/", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("index");
});

test("matches static route", () => {
  const routes = [baseRoute({ segments: [{ nodeName: "about" }], relativePath: "about" })];
  const url = { pathname: "/about", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("about");
});

test("matches param route and sets param", () => {
  const routes = [baseRoute({ segments: [{ nodeName: "", paramName: "id" }], relativePath: "[id]" })];
  const url = { pathname: "/123", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("[id]");
  expect(result?.params.id).toBe("123");
});

test("matches static route with fingerprint", () => {
  const routes = [baseRoute({
    segments: [{ nodeName: "about" }],
    isStatic: true,
    fingerprint: "xyz",
    relativePath: "about",
  })];
  const url = { pathname: "/about.xyz", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("about");
});

test("returns null for no match", () => {
  const routes = [baseRoute({ segments: [{ nodeName: "foo" }], relativePath: "foo" })];
  const url = { pathname: "/bar", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result).toBeNull();
});

test("static route is matched before param route for /products/new", () => {
  const routes = [
    baseRoute({
      segments: [
        { nodeName: "products" },
        { nodeName: "", paramName: "id" },
      ],
      relativePath: "products/[id]",
    }),
    baseRoute({
      segments: [
        { nodeName: "products" },
        { nodeName: "new" },
      ],
      relativePath: "products/new",
    }),
  ];
  const url = { pathname: "/products/new", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("products/new");
  expect(result?.params.id).toBeUndefined();
});

test("param route is matched for /products/123 when static does not match", () => {
  const routes = [
    baseRoute({
      segments: [
        { nodeName: "products" },
        { nodeName: "", paramName: "id" },
      ],
      relativePath: "products/[id]",
    }),
    baseRoute({
      segments: [
        { nodeName: "products" },
        { nodeName: "new" },
      ],
      relativePath: "products/new",
    }),
  ];
  const url = { pathname: "/products/123", query: {} };
  const result = resolveRoute(url as any, routes as any);
  expect(result?.route.relativePath).toBe("products/[id]");
  expect(result?.params.id).toBe("123");
});