import supertest from "supertest";
import { UserInput } from "../src/repository";
import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = {
      email: "email@exemplo.com",
      password:"12345"
    }
    const { status } = await api.post("/users").send(user);
    expect(status).toBe(201) 
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user1: UserInput = {
      email: "email@exemplo.com",
      password:"12345"
    }

    await api.post("/users").send(user1);
    
    const user2: UserInput = {
      email: "email@exemplo.com",
      password:"67687"
    }
    const { status } = await api.post("/users").send(user2);
    expect(status).toBe(409)
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user: UserInput = {
      email: "email@exemplo.com",
      password:"12345"
    }
    const userCreated = await prisma.user.create({
      data: user
    });
    const {body, status} = await api.get(`/users/${userCreated.id}`);
    expect(status).toBe(200)
    expect(body).toEqual(userCreated)
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users/2");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    const user: UserInput = {
      email: "email@exemplo.com",
      password:"12345"
    }
    const userCreated = await prisma.user.create({
      data: user
    });
    const { body, status } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))

  });

})