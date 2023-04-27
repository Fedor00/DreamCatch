import { Entry } from "./Entry";

export interface User{
    id:number;
    username:string;
    email:string;
    password:string;
    entries:Entry[]|undefined;
}
let user: User | null = null;