import { Exclude, Expose } from "class-transformer";

export class nguoiDungDto{

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    pass_word: string;
    
    @Expose()
    phone: string;

    @Expose()
    birth_day: string;
    
    @Expose()
    gender: string;

    @Expose()
    role: string;

    constructor(partial:Partial<nguoiDungDto>){
        Object.assign(this,partial);
    }
}