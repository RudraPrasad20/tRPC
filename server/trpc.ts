import { initTRPC } from '@trpc/server';

// step 1 of context :
const t = initTRPC.context<{
    username: string
}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;