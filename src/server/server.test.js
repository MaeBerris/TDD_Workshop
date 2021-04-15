import sinon, { restore } from "sinon";
import request from "supertest";
import { expect } from "chai";
import db from "./db";
import { app } from "./server";

describe(" GET /users/:username", () => {
  it("sends the correct response when a user with the username is found", async () => {
    const fakeData = { id: "123", username: "abc", email: "abc@email.com" };

    const stub = sinon.stub(db, "getUserByUserName").resolves(fakeData);

    await request(app)
      .get("/users/abc")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(fakeData);

    expect(stub.getCall(0).args[0]).to.equal("abc");

    stub.restore();
  });

  it("sends the correct response when there is an error", async () => {
    const fakeError = { message: "something went wrong" };

    const stub = sinon.stub(db, "getUserByUserName").throws(fakeError);

    await request(app)
      .get("/users/abc")
      .expect(500)
      .expect("Content-Type", /json/)
      .expect(fakeError);

    stub.restore();
  });
  it("sends the appropriate response when the user is not found", async () => {
    const fakeData = null;

    const stub = sinon.stub(db, "getUserByUserName").resolves(null);

    await request(app)
      .get("/users/duckling")
      .expect(404)
      .expect("Content-Type", /json/)
      .expect(fakeData);

    expect(stub.getCall(0).args[0]).to.equal("duckling");

    stub.restore();
  });
});
