import "@testing-library/jest-dom";
import { afterEach } from "vitest";

// jsdom does not implement scrollTo; stub it so components that call it don't warn.
window.scrollTo = () => {};

// Provide a working localStorage in the test environment.
const store = new Map();
const localStorageMock = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

afterEach(() => {
  store.clear();
});
