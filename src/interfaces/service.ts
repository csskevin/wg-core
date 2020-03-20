import { Request, Response } from "express"; 

interface Service { 
    method: "checkout" | "copy" | "delete" | "get" | "head" | "lock" | "merge" | "mkactivity" | "mkcol" | "move" | "m-search" | "notify" | "options" | "patch" | "post" | "purge" | "put" | "report" | "search" | "subscribe" | "trace" | "unlock" | "unsubscribe", 
    path: string,
    parser?: Function,
    handler(req: Request, res: Response): any
}

export default Service;