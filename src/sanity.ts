import { prisma } from "./datasource/p";

/***
 * For quick tests
 * 
 * `npm run sanity`
 * 
 * will ts-node this file
 */

prisma.memberRole.count().then( v=>{
    console.log(v)
})
