import { Exclude, Expose } from "class-transformer";

export class BinhLuanDto{
    // @Exclude// giấu
    @Expose() // hiển thị
    id_binh_luan : number;
    
    @Expose()
    id_phong: number;
    
    @Expose()
    id_nguoi_binh_luan: number;

    @Expose()
    ngay_binh_luan: Date;

    @Expose()
    noi_dung: string;

    @Expose()
    sao_binh_luan: number;


    // tạo object mà tất cả các attribute đều là optional
    constructor(partial: Partial<BinhLuanDto>){
        Object.assign(this, partial);
    }
}