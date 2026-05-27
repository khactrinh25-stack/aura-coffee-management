package com.auracoffee.management.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class HoaDonRequest {

    @Min(value = 0, message = "Tổng tiền không hợp lệ")
    private Integer tongTien;

    @NotNull(message = "Phương thức thanh toán không được để trống")
    private String phuongThucThanhToan;

    private Integer maNhanVien;

    private Integer maKhachHang;

    private Integer diemSuDung = 0;

    private Integer diemCongThem = 0;

    @NotEmpty(message = "Chi tiết hóa đơn không được để trống")
    @Valid
    private List<ChiTietHoaDonRequest> chiTietList;

    public Integer getTongTien() { return tongTien; }
    public void setTongTien(Integer tongTien) { this.tongTien = tongTien; }
    public String getPhuongThucThanhToan() { return phuongThucThanhToan; }
    public void setPhuongThucThanhToan(String phuongThucThanhToan) { this.phuongThucThanhToan = phuongThucThanhToan; }
    public Integer getMaNhanVien() { return maNhanVien; }
    public void setMaNhanVien(Integer maNhanVien) { this.maNhanVien = maNhanVien; }
    public Integer getMaKhachHang() { return maKhachHang; }
    public void setMaKhachHang(Integer maKhachHang) { this.maKhachHang = maKhachHang; }
    public Integer getDiemSuDung() { return diemSuDung; }
    public void setDiemSuDung(Integer diemSuDung) { this.diemSuDung = diemSuDung; }
    public Integer getDiemCongThem() { return diemCongThem; }
    public void setDiemCongThem(Integer diemCongThem) { this.diemCongThem = diemCongThem; }
    public List<ChiTietHoaDonRequest> getChiTietList() { return chiTietList; }
    public void setChiTietList(List<ChiTietHoaDonRequest> chiTietList) { this.chiTietList = chiTietList; }
}