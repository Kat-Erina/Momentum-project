// export interface Status
export interface Employee{
    id:number
    name: string
    surname: string
    avatar: string
}
export interface Priority{
icon:string;
id:number;
name:string
}

export interface Status{
    id:number;
    name:string
    }

    export interface Department extends Status{}
    