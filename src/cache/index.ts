
import GetDatasource, {IsDatasourceInitialized} from "../datasource"
import { MemberRole } from "../entities/MemberRoles"

const memberRoleCache: Map<string, MemberRole> = new Map()




/** Should only be called after datasource initialized.
 * 
 * Loads the roles table into a map so db queries don't need to be frequently executed on a rarely-changing and small table. 
 */
export async function InitializeCache() {
    if(!IsDatasourceInitialized()) {
        throw "Datasource unitialized! Only init cache after you have connected to the database."
    }
    const datasource = GetDatasource()
    const roles = await datasource.manager.find(MemberRole)
    for(let r of roles) {
        memberRoleCache.set(r.role_name, r)
    }
}

export async function RefreshCache() {
    if(!IsDatasourceInitialized()) {
        throw "Datasource unitialized! Only use cache after you have connected to the database."
    }
    for(let key of memberRoleCache.keys()) {
        memberRoleCache.delete(key)
    }
    const datasource = GetDatasource()
    const roles = await datasource.manager.find(MemberRole)
    for(let r of roles) {
        memberRoleCache.set(r.role_name, r)
    }
}

export default memberRoleCache


