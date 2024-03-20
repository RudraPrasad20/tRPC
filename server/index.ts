import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
import { z } from "zod"

const notesZod = z.object({
    title: z.string(),
    description: z.string().optional(),
})

const addressZod = z.object({
    state: z.string(),
    street: z.string().optional(),
    pin: z.string(),
})

const signupZod = z.object({
    email: z.string(),
    password: z.string(),
})

const appRouter = router({
    signup: publicProcedure
            .input(signupZod)
                .mutation( async (opts) => {

                    const username = opts.ctx.username
                    const email = opts.input.email
                    const password = opts.input.password

                    return {
                        status: "200",
                        msg: "all good"
                    }
                }),

    newNotes: publicProcedure
        .input(notesZod)
            .mutation( async (opts) => {
                // ctx
                console.log(opts.ctx.username)
                const title = opts.input.title
                const description = opts.input.description

                // do db 
                let newToken = "newToken"
                return {
                    newToken,
                    complete: "no"
                }
            }),

        address: publicProcedure
            .input(addressZod)
                .mutation( async (opts) => {
                    const state = opts.input.state
                    const street = opts.input.street
                    const pin = opts.input.pin

                    // db
                    return {
                        status: "200"
                    }
                })
});

const server = createHTTPServer({
    router: appRouter,
    // step 2 of context :
    createContext(opts) {
        const authHeader = opts.req.headers["authorization"];
        return{
            username: "alex"
        }
    }
  });
   
  server.listen(3000);
export type AppRouter = typeof appRouter;