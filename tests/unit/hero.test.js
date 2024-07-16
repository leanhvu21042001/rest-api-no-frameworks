import test from "node:test";
import assert from "node:assert";

const callTracker = new assert.CallTracker();
process.on("exit", () => callTracker.verify());

import { routes } from "./../../src/routes/heroRoute.js";
import { DEFAULT_HEADER } from "./../../src/util/util.js";

test("Hero routes - endpoints test suite", async (t) => {
  await t.todo("it should call /heroes:get route", async () => {
    const databaseMock = [
      {
        id: "10cd20bf-1b8d-47a5-aa02-c767e1c7ea9c",
        name: "Batman",
        age: 50,
        power: "rich",
      },
    ];

    const heroServiceStub = {
      find: () => databaseMock,
    };

    const endpoints = routes({
      heroServiceMock: heroServiceStub,
    });

    const endpoint = "/heroes:get";
    const request = {};
    const response = {
      write: callTracker.calls((item) => {
        const expected = JSON.stringify({
          result: databaseMock,
        });

        assert.strictEqual(
          item,
          expected,
          "write should be called with the correct payload"
        );
      }),
      end: callTracker.calls((item) => {
        assert.strictEqual(
          item,
          undefined,
          "end should be called without params"
        );
      }),
    };

    const route = endpoints[endpoint];
    await route(request, response);
  });

  await t.todo("it should call /heroes:post route", async () => {});
});
