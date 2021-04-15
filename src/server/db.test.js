import { getUserByUserName } from "./db";
import { expect } from "chai";

import {
  resetDatabase,
  setDatabaseData,
  getDataBaseData,
} from "./test-helpers";

describe("getUserByUserName", () => {
  afterEach("reset the database", async () => {
    await resetDatabase();
  });

  it("get the correct user from a database given a username", async () => {
    const fakeData = [
      { id: "123", username: "abc", email: "abc@email.com" },
      { id: "124", username: "wrong", email: "wrong@email.com" },
    ];

    await setDatabaseData("users", fakeData);
    console.log("set");
    const actual = await getUserByUserName("abc");
    const finalDbState = await getDataBaseData("users");

    const expected = { id: "123", username: "abc", email: "abc@email.com" };
    expect(actual).excludingEvery("_id").to.deep.equal(expected);
    expect(finalDbState).excludingEvery("_id").to.deep.equal(fakeData);
  });

  it("returns null when the user is not found", async () => {
    const fakeData = [
      { id: "123", username: "abc", email: "abc@email.com" },
      { id: "124", username: "wrong", email: "wrong@email.com" },
    ];

    await setDatabaseData("users", fakeData);

    const actual = await getUserByUserName("duckling");
    const expected = null;

    expect(actual).to.equal(expected);
  });
});
