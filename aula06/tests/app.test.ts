import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });
  it("should return object when ask ", async () =>{
    const result = await api.get("/event");
    expect(result.body).toEqual(   
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          image: expect.any(String),
          date: expect.any(String)
        })
    )
  });
});