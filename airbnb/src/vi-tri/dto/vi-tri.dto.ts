import { Exclude, Expose } from "class-transformer";


export class ViTriDto{
   @Expose() 
   id_vi_tri : number;
   
   @Expose()
   ten_vi_tri: string;
   
   @Expose()
   tinh_thanh: string;

   @Expose()
   quoc_gia: number;

   @Expose()
   hinh_anh: string;

   constructor(partial: Partial<ViTriDto>){
      Object.assign(this, partial);
  }
}