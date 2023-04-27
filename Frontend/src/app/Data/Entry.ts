import { Category } from "./Category";
import { User } from "./User";

export interface Entry{
    id:number;
    user:User|null;
    categories:Category[];
    description:string;
    date:Date;
    duration:number;
    energyLevel:number;
    stressLevel:number;
}

export interface  UserAndCategories{
    user:User;
    categories:Category[];
}
