package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DanhGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer> {
    
    // Lấy đánh giá của sản phẩm (chỉ lấy những cái đang hiện)
    List<DanhGia> findBySanPham_SanPhamIdAndTrangThaiTrue(Integer sanPhamId);

    // Lấy đánh giá của dịch vụ (chỉ lấy những cái đang hiện)
    List<DanhGia> findByDichVu_DichVuIdAndTrangThaiTrue(Integer dichVuId);

    // Tìm kiếm và lọc cho Admin
    @Query("SELECT d FROM DanhGia d WHERE " +
           "(:soSao IS NULL OR d.soSao = :soSao) AND " +
           "(:trangThai IS NULL OR d.trangThai = :trangThai)")
    Page<DanhGia> findAllByFilters(@Param("soSao") Integer soSao, 
                                   @Param("trangThai") Boolean trangThai, 
                                   Pageable pageable);
}
