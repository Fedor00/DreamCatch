import { Category } from "./Category";


export interface ChartDataOptions{
    categories:Category[]|undefined;
    userId:number;
    type:string;
    value:number;
}

export interface ChartData{
    data: number[][];
    labels:string[]
}