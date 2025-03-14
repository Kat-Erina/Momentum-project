// export interface Status
export interface Employee{
    id:number
    name: string
    surname: string
    avatar: string
    department:{id:number,
        name:string
    }
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
 
export interface Data{
    name:string, 
    descrription: string,
    priority:Priority,
    department:Department,
    due_date: string,
    status:Status,
    employee:Employee
}    
    