"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const zod_1 = require("zod");
const notesZod = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().optional()
});
const addressZod = zod_1.z.object({
    state: zod_1.z.string(),
    street: zod_1.z.string().optional(),
    pin: zod_1.z.string(),
});
const signupZod = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
const appRouter = (0, trpc_1.router)({
    signup: trpc_1.publicProcedure
        .input(signupZod)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // ctx
        // step 3 of context :
        const username = opts.ctx.username;
        const email = opts.input.email;
        const password = opts.input.password;
        // db
        return {
            status: "200",
            msg: "all good"
        };
    })),
    newNotes: trpc_1.publicProcedure
        .input(notesZod)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // ctx
        console.log(opts.ctx.username);
        const title = opts.input.title;
        const description = opts.input.description;
        // do db 
        let newToken = "newToken";
        return {
            newToken,
            complete: "no"
        };
    })),
    address: trpc_1.publicProcedure
        .input(addressZod)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const state = opts.input.state;
        const street = opts.input.street;
        const pin = opts.input.pin;
        // db
        return {
            status: "200"
        };
    }))
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    // step 2 of context :
    createContext(opts) {
        const authHeader = opts.req.headers["authorization"];
        return {
            username: "alex"
        };
    }
});
server.listen(3000);
