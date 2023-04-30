import datasource from "./datasource";

/***
 * For quick tests
 * 
 * `npm run sanity`
 * 
 * will ts-node this file
 */

datasource.memberRole.count().then( v=>{
    console.log(v)
})
