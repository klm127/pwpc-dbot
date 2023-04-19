import Discord, { CacheType } from "discord.js"


type TIntExec<T extends Discord.Interaction> = (i:T)=>void 

interface TTransformed<T> {
    (i:T): Promise<void>,
    /** Adds a pre-validator function, called before any other middles are used */
    addPreValidator: (validatorfunc:(i:T)=>Promise<void>)=>TTransformed<T>,
    /** Adds a validator function. If this returns false, execution will stop. */
    addValidator: (validatorfunc:(i:T)=>Promise<boolean>)=>TTransformed<T>,
    /** Adds a pre-processor, called after validation but before execution. */
    addPreProcessor: (preprocfunc:(i:T)=>Promise<void>)=>TTransformed<T>,
    /** Adds a post-processor, called after execution. */
    addPostProcessor: (postprocfunc:(i:T)=>Promise<void>)=>TTransformed<T>
}

/**
 * Middleize wraps an "execute" function, adding several methods to it.
 * 
 * These methods allow basic middleware to be registered.
 * 
 * Pre validators take an interaction and return void.
 * 
 * Validators take an interaction and return boolean; if they return false, the pipeline will stop.
 * 
 * pre processor are called after validation but before the original execute function is called.
 * 
 * Then execute is called.
 * 
 * Finally, post processors are called. 
 * 
 * 
 */
export function Middleize<T>( executefunction: (i:T)=>void ) : TTransformed<T> {

    const pre_val_funcs: Array<(i:T)=>Promise<void>> = []
    const val_funcs: Array<(i:T)=>Promise<boolean>> = []
    const pre_funcs : Array<(i:T)=>Promise<void>> = []
    const post_funcs : Array<(i:T)=>Promise<void>> = []

    async function execInOrder(i:T) {
        for(let pvf of pre_val_funcs) {
            pvf(i)
        }
        let validated = true;
        for(let vf of val_funcs) {
            validated = await vf(i)
            if(!validated) break;
        }
        if(validated) {
            executefunction(i)
            for(let pef of post_funcs) {
                pef(i)
            }
        }
    }

    const tt = Object.assign(execInOrder, {
        addPreValidator:  (validatorfunc:(i:T)=>Promise<void>) => {
            pre_val_funcs.push(validatorfunc)
            return tt
        },
        addValidator: (validatorfunc:(i:T)=>Promise<boolean>) => {
            val_funcs.push(validatorfunc)
            return tt
        },
        addPreProcessor: (validatorfunc:(i:T)=>Promise<void>) => {
            pre_funcs.push(validatorfunc)
            return tt
        },
        addPostProcessor: (validatorfunc:(i:T)=>Promise<void>) => {
            post_funcs.push(validatorfunc)
            return tt
        }

    })
    return tt
}