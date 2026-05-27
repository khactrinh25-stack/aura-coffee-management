package com.auracoffee.management.dto;

import com.auracoffee.management.entity.HoaDon;
import java.time.LocalDateTime;
import java.util.List;

public class HoaDonResponse {

    private Integer maHoaDon;
    private LocalDateTime ngayTao;
    private Integer tongTien;
    private String phuongThucThanhToan;
    private Integer maNhanVien;
    private String tenNhanVien;
    private Integer maKhachHang;
    private Integer diemSuDung;
    private Integer diemCongThem;
    private List<ChiTietHoaDonResponse> chiTietList;

    public static HoaDonResponse from(HoaDon entity, String tenNhanVien, List<ChiTietHoaDonResponse> chiTietList) {
        HoaDonResponse dto = new HoaDonResponse();
        dto.setMaHoaDon(entity.getMaHoaDon());
        dto.setNgayTao(entity.getNgayTao());
        dto.setTongTien(entity.getTongTien());
        dto.setPhuongThucThanhToan(entity.getPhuongThucThanhToan());
        dto.setMaNhanVien(entity.getMaNhanVien());
        dto.setTenNhanVien(tenNhanVien);
        dto.setMaKhachHang(entity.getMaKhachHang());
        dto.setDiemSuDung(entity.getDiemSuDung());
        dto.setDiemCongThem(entity.getDiemCongThem());
        dto.setChiTietList(chiTietList);
        return dto;
    }

    public Integer getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(Integer maHoaDon) { this.maHoaDon = maHoaDon; }
    public LocalDateTime getNgayTao() { return ngayTao; }
    public void setNgayTao(LocalDateTime ngayTao) { this.ngayTao = ngayTao; }
    public Integer getTongTien() { return tongTien; }
    public void setTongTien(Integer tongTien) { this.tongTien = tongTien; }
    public String getPhuongThucThanhToan() { return phuongThucThanhToan; }
    public void setPhuongThucThanhToan(String phuongThucThanhToan) { this.phuongThucThanhToan = phuongThucThanhToan; }
    public Integer getMaNhanVien() { return maNhanVien; }
    public void setMaNhanVien(Integer maNhanVien) { this.maNhanVien = maNhanVien; }
    public String getTenNhanVien() { return tenNhanVien; }
    public void setTenNhanVien(String tenNhanVien) { this.tenNhanVien = tenNhanVien; }
    public Integer getMaKhachHang() { return maKhachHang; }
    public void setMaKhachHang(Integer maKhachHang) { this.maKhachHang = maKhachHang; }
    public Integer getDiemSuDung() { return diemSuDung; }
    public void setDiemSuDung(Integer diemSuDung) { this.diemSuDung = diemSuDung; }
    public Integer getDiemCongThem() { return diemCongThem; }
    public void setDiemCongThem(Integer diemCongThem) { this.diemCongThem = diemCongThem; }
    public List<ChiTietHoaDonResponse> getChiTietList() { return chiTietList; }
    public void setChiTietList(List<ChiTietHoaDonResponse> chiTietList) { this.chiTietList = chiTietList; }
}