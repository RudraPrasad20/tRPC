import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',

      // step 4 of context :
      async headers (){
        return{
          authorization: "Bearer "
        }
      }
    }),
  ],
});

async function notes() {
const res = await trpc.newNotes.mutate({
    title: "go to school",
    description: "from 10 to 4"
});
    console.log(res);
};
notes();