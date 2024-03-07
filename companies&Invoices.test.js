process.env.NODE_ENV = 'test';

const request = require("supertest");
const app = require("./app");
const db = require("./db");
const { beforeEach, afterEach, describe, default: test } = require("node:test");

let testbiztimedb;
beforeEach(async () => {
const resCompanies = await db.query(`INSERT INTO companies (name, description) VALUES ('apple', 'ibm')
RETURNIN code, name, description`);
const resInvoices = await db.query(`INSERT INTO invoices (amt, paid, add_date, paid_date) VALUES (12, 'paid', '3/1/2024', '3/5/2024') `)
testbiztimedb = resCompanies.rows[0];
testbiztimedb = resInvoices.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`)
});

afterAll(async () => {
    await db.end()
    await db.end()
});

describe("GET /companies", () => {
    test("Get all companies", async () => {
        const res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([testbiztimedb])
    })
  
})

describe("GET /Invoices", () => {
    test("Gets all invoces", async () => {
        const res = await request(app).get('/invoices')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([testbiztimedb])
    })
})

describe("GET /companies/:code", () => {
    test("Get a single company by its code", async () => {
        const res = await request(app).get(`/companies/${testbiztimedb.code}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([testbiztimedb])
    })
  
})

describe("GET /invoices/:id", () => {
    test("Get a single invoice by its id", async () => {
        const res = await request(app).get(`/invoices/${testbiztimedb.id}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([testbiztimedb])
    });
});

describe("POST /companies", () => {
    test("Creates a single company", async () => {
        const res = (await request(app).post('/companies')).setEncoding({name: 'Microsoft', description:'IBM'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            company: {code: expect.any(Number), name: 'Microsoft', description: 'IBM'}
        });
    });
});

describe("POST /invoices", () => {
    test("Creates a single company", async () => {
        const res = (await request(app).post('/companies')).setEncoding({amt: 200, paid:'Not paid', add_date: '3/1/2024', paid_date: '3/5/2024' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
        invoices: {id: expect.any(Number),amt: 200, paid:'Not paid', add_date: '3/1/2024', paid_date: '3/5/2024'}
        });
    });
});

describe("PATCH /companies/:code", () => {
    test("Updates a single company", async () => {
        const res = (await request(app).patch(`/companies/${testbiztimedb.code}`)).setEncoding({name: 'microsoft', description:'ibm'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            company: {code: testbiztimedb.code, name: 'microsoft', description: 'ibm'}
        });
    });
});

describe("PATCH /invoices/:id", () => {
    test("Updates a single invoice", async () => {
        const res = (await request(app).patch(`/companies/${testbiztimedb.id}`)).setEncoding({amt: 250, paid:'paid', add_date: '3/1/2024', paid_date: '3/5/2024' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
        invoices: {id: expect.any(Number),amt: 250, paid:'paid', add_date: '3/1/2024', paid_date: '3/5/2024'}
        });
    });
});

