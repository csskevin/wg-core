import { RequestParamHandler } from "express"; 

interface Service { 
    method: "checkout" | "copy" | "delete" | "get" | "head" | "lock" | "merge" | "mkactivity" | "mkcol" | "move" | "m-search" | "notify" | "options" | "patch" | "post" | "purge" | "put" | "report" | "search" | "subscribe" | "trace" | "unlock" | "unsubscribe", 
    path: string,
    parser?: Function,
    handler: RequestParamHandler
}

export default Service;