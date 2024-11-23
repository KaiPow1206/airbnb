import { Exclude, Expose } from "class-transformer";

export class DatPhongDto{
    // @Exclude// giấu
    @Expose() // hiển thị
    id_dat_phong : number;
    
    @Expose()
    id_phong: number;
    
    @Expose()
    id_nguoi_dat: number;

    @Expose()
    ngay_den: Date;

    @Expose()
    ngay_di: Date;

    @Expose()
    so_luong_khach: number;


    // tạo object mà tất cả các attribute đều là optional
    constructor(partial: Partial<DatPhongDto>){
        Object.assign(this, partial);
    }
}