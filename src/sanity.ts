import prisma from "./datasource";

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
