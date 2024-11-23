import { Exclude, Expose } from "class-transformer";
export class phongDto {
  @Expose()
  ten_phong: string;

  @Expose()
  khach: number;

  @Expose()
  phong_ngu: number;

  @Expose()
  giuong: number;

  @Expose()
  phong_tam: number;

  @Expose()
  mo_ta: string;

  @Expose()
  gia_tien: number;

  @Expose()
  may_giat: boolean;

  @Expose()
  ban_la: boolean;

  @Expose()
  tivi: boolean;

  @Expose()
  dieu_hoa: boolean;

  @Expose()
  wifi: boolean;

  @Expose()
  bep: boolean;

  @Expose()
  do_xe: boolean;

  @Expose()
  ho_boi: boolean

  @Expose()
  ban_ui: boolean;

  @Expose()
  hinh_anh: string;

  @Expose()
  id_vi_tri: number;

  constructor(partial: Partial<phongDto>) {
    Object.assign(this, partial);
  }
}