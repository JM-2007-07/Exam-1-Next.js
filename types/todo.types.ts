    export interface IResponse<T = IData[]> {
        data:T,
        errors:[] | string[],
        statusCode:number
    }
    export interface IData{
        id: number,
        isCompleted: boolean,
        images: IImages[],
        name: string,
        description: string
    }
    export interface IImages{
        id:number,
        imageName:string
    }
    export interface IAddTodo {
        name: string
        description: string
        images: File[]
        }

    export interface IEditTodo {
        id: number
        name: string
        description: string
    }