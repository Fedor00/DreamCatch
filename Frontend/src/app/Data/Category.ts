import { Entry } from "./Entry";

export interface Category{
    id:number|null;
    name:String;
    entries:Entry[];
    
}