import supertest from "supertest";
import app from "../src/index";

const api = supertest(app);

describe("/health", () => {
    it("should return OK when ask /health", async () => {
        const {status, text } = await api.get("/health");
        expect(status).toBe(200)
        expect(text).toBe("OK!");})
})