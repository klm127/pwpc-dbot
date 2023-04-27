
import { MemberRole } from "@prisma/client"
import datasource from "../datasource"

const memberRoleCache: Map<string, MemberRole> = new Map()




/** Should only be called after datasource initialized.
 * 
 * Loads the roles table into a map so db queries don't need to be frequently executed on a rarely-changing and small table. 
 */
export async function InitializeCache() {
    const roles = await datasource.memberRole.findMany()
    for(let r of roles) {
        memberRoleCache.set(r.roleName, r)
    }
}

export async function RefreshCache() {
    for(let key of memberRoleCache.keys()) {
        memberRoleCache.delete(key)
    }
    const roles = await datasource.memberRole.findMany()
    for(let r of roles) {
        memberRoleCache.set(r.roleName, r)
    }
}

export default memberRoleCache


