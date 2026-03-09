-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: petlorshop_v2
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bai_viet`
--

DROP TABLE IF EXISTS `bai_viet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bai_viet` (
  `bai_viet_id` int NOT NULL AUTO_INCREMENT,
  `tieu_de` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `noi_dung` longtext NOT NULL,
  `anh_bia` text,
  `ngay_dang` datetime DEFAULT CURRENT_TIMESTAMP,
  `nhan_vien_id` int NOT NULL,
  `danh_muc_bv_id` int DEFAULT NULL,
  `trang_thai` enum('NHAP','CONG_KHAI','AN') DEFAULT 'NHAP',
  `da_xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`bai_viet_id`),
  KEY `fk_bv_dm` (`danh_muc_bv_id`),
  KEY `fk_bv_nv` (`nhan_vien_id`),
  CONSTRAINT `fk_bv_dm` FOREIGN KEY (`danh_muc_bv_id`) REFERENCES `danh_muc_bai_viet` (`danh_muc_bv_id`),
  CONSTRAINT `fk_bv_nv` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bai_viet`
--

LOCK TABLES `bai_viet` WRITE;
/*!40000 ALTER TABLE `bai_viet` DISABLE KEYS */;
INSERT INTO `bai_viet` VALUES (28,'? 7 Điều Người Mới Nuôi Chó Nhất Định Phải Biết','7-ieu-nguoi-moi-nuoi-cho-nhat-inh-phai-biet','<h2><strong>Mô&nbsp;tả&nbsp;ngắn:</strong></h2><p>&nbsp;Tổng&nbsp;hợp&nbsp;kiến&nbsp;thức&nbsp;cơ&nbsp;bản&nbsp;giúp&nbsp;bạn&nbsp;chăm&nbsp;sóc&nbsp;chó&nbsp;đúng&nbsp;cách,&nbsp;từ&nbsp;ăn&nbsp;uống,&nbsp;vệ&nbsp;sinh&nbsp;đến&nbsp;huấn&nbsp;luyện.</p><h3>Nội&nbsp;dung</h3><p>Nuôi&nbsp;chó&nbsp;không&nbsp;chỉ&nbsp;là&nbsp;cho&nbsp;ăn&nbsp;và&nbsp;dắt&nbsp;đi&nbsp;dạo.&nbsp;Để&nbsp;thú&nbsp;cưng&nbsp;khỏe&nbsp;mạnh&nbsp;và&nbsp;hạnh&nbsp;phúc,&nbsp;bạn&nbsp;cần&nbsp;lưu&nbsp;ý:</p><h3>1.&nbsp;Chọn&nbsp;giống&nbsp;phù&nbsp;hợp</h3><p>Nên&nbsp;chọn&nbsp;chó&nbsp;theo&nbsp;diện&nbsp;tích&nbsp;nhà,&nbsp;thời&nbsp;gian&nbsp;chăm&nbsp;sóc&nbsp;và&nbsp;mức&nbsp;độ&nbsp;vận&nbsp;động.</p><h3>2.&nbsp;Dinh&nbsp;dưỡng&nbsp;hợp&nbsp;lý</h3><ul><li>Chó&nbsp;con:&nbsp;3–4&nbsp;bữa/ngày</li><li>Chó&nbsp;trưởng&nbsp;thành:&nbsp;2&nbsp;bữa/ngày</li><li>Hạn&nbsp;chế&nbsp;đồ&nbsp;ăn&nbsp;mặn,&nbsp;ngọt,&nbsp;xương&nbsp;nhỏ.</li></ul><h3>3.&nbsp;Tiêm&nbsp;phòng&nbsp;định&nbsp;kỳ</h3><p>Các&nbsp;mũi&nbsp;cơ&nbsp;bản:&nbsp;care,&nbsp;parvo,&nbsp;dại.</p><h3>4.&nbsp;Vệ&nbsp;sinh&nbsp;–&nbsp;tắm&nbsp;rửa</h3><p>2–3&nbsp;tuần/lần,&nbsp;dùng&nbsp;sữa&nbsp;tắm&nbsp;chuyên&nbsp;dụng.</p><h3>5.&nbsp;Huấn&nbsp;luyện&nbsp;sớm</h3><p>Dạy&nbsp;đi&nbsp;vệ&nbsp;sinh&nbsp;đúng&nbsp;chỗ&nbsp;và&nbsp;các&nbsp;lệnh&nbsp;cơ&nbsp;bản.</p><h3>6.&nbsp;Vận&nbsp;động&nbsp;mỗi&nbsp;ngày</h3><p>Dắt&nbsp;đi&nbsp;dạo&nbsp;ít&nbsp;nhất&nbsp;20–30&nbsp;phút/ngày.</p><h3>7.&nbsp;Khám&nbsp;thú&nbsp;y&nbsp;định&nbsp;kỳ</h3><p>6&nbsp;tháng/lần&nbsp;để&nbsp;phát&nbsp;hiện&nbsp;bệnh&nbsp;sớm.</p>','e97e42e4-f53c-427a-af8d-09f881abd0b0.jpg','2026-02-05 19:30:33',5,1,'CONG_KHAI',_binary '\0'),(29,'? Cách Chăm Sóc Mèo Đúng Chuẩn Cho Người Mới','cach-cham-soc-meo-ung-chuan-cho-nguoi-moi','<h2><strong>Mô&nbsp;tả:</strong></h2><p>&nbsp;Hướng&nbsp;dẫn&nbsp;chi&nbsp;tiết&nbsp;giúp&nbsp;mèo&nbsp;khỏe&nbsp;mạnh&nbsp;và&nbsp;sống&nbsp;lâu&nbsp;hơn.</p><h3>Nội&nbsp;dung</h3><p>Mèo&nbsp;là&nbsp;loài&nbsp;độc&nbsp;lập&nbsp;nhưng&nbsp;vẫn&nbsp;cần&nbsp;chăm&nbsp;sóc&nbsp;đúng&nbsp;cách:</p><ul><li>Chuẩn&nbsp;bị&nbsp;khay&nbsp;cát&nbsp;sạch&nbsp;sẽ</li><li>Cho&nbsp;ăn&nbsp;thức&nbsp;ăn&nbsp;dành&nbsp;riêng&nbsp;cho&nbsp;mèo</li><li>Chải&nbsp;lông&nbsp;2–3&nbsp;lần/tuần</li><li>Tiêm&nbsp;phòng&nbsp;đầy&nbsp;đủ</li><li>Không&nbsp;cho&nbsp;ăn&nbsp;cá&nbsp;sống,&nbsp;hành,&nbsp;socola</li><li>Tạo&nbsp;không&nbsp;gian&nbsp;leo&nbsp;trèo,&nbsp;chơi&nbsp;đùa</li></ul><p>Việc&nbsp;tương&nbsp;tác&nbsp;mỗi&nbsp;ngày&nbsp;giúp&nbsp;mèo&nbsp;thân&nbsp;thiện&nbsp;và&nbsp;giảm&nbsp;stress.</p>','ca9ad79e-2a02-4160-a63b-448e161f3fcc.jpg','2026-02-05 19:32:17',5,2,'CONG_KHAI',_binary '\0'),(30,'? KHUYẾN MÃI','khuyen-mai','<h2>?&nbsp;Ưu&nbsp;Đãi&nbsp;Tháng&nbsp;Này&nbsp;–&nbsp;Giảm&nbsp;Giá&nbsp;Đến&nbsp;40%&nbsp;Cho&nbsp;Thú&nbsp;Cưng</h2><p><strong>Mô&nbsp;tả:</strong></p><p>&nbsp;Tổng&nbsp;hợp&nbsp;chương&nbsp;trình&nbsp;khuyến&nbsp;mãi&nbsp;hấp&nbsp;dẫn&nbsp;dành&nbsp;cho&nbsp;chó&nbsp;mèo.</p><h3>Nội&nbsp;dung</h3><ul><li>Giảm&nbsp;20–40%&nbsp;thức&nbsp;ăn&nbsp;hạt</li><li>Mua&nbsp;2&nbsp;tặng&nbsp;1&nbsp;đồ&nbsp;chơi</li><li>Tặng&nbsp;voucher&nbsp;spa&nbsp;cho&nbsp;đơn&nbsp;từ&nbsp;500k</li><li>Miễn&nbsp;phí&nbsp;vận&nbsp;chuyển&nbsp;nội&nbsp;thành</li></ul><p>⏰&nbsp;Thời&nbsp;gian&nbsp;áp&nbsp;dụng:&nbsp;đến&nbsp;hết&nbsp;tháng.</p>','a957c294-5f0b-4e60-b817-c0a2e3c12fa7.jpg','2026-02-05 19:36:16',5,3,'CONG_KHAI',_binary '\0'),(31,'? KIẾN THỨC NUÔI THỎ','kien-thuc-nuoi-tho','<h2>?&nbsp;Hướng&nbsp;Dẫn&nbsp;Nuôi&nbsp;Thỏ&nbsp;Tại&nbsp;Nhà&nbsp;Đơn&nbsp;Giản</h2><h3>Nội&nbsp;dung</h3><ul><li>Chuồng&nbsp;khô&nbsp;ráo,&nbsp;thoáng&nbsp;mát</li><li>Thức&nbsp;ăn&nbsp;chính:&nbsp;cỏ&nbsp;khô,&nbsp;rau&nbsp;xanh</li><li>Không&nbsp;cho&nbsp;ăn&nbsp;rau&nbsp;ướt</li><li>Thay&nbsp;nước&nbsp;mỗi&nbsp;ngày</li><li>Vệ&nbsp;sinh&nbsp;chuồng&nbsp;2&nbsp;lần/tuần</li></ul><p>Thỏ&nbsp;rất&nbsp;nhạy&nbsp;cảm&nbsp;với&nbsp;nhiệt&nbsp;độ&nbsp;cao,&nbsp;nên&nbsp;tránh&nbsp;nắng&nbsp;gắt.</p>','77bc7a20-60a0-4350-9b8f-1d95bb604bf7.jpg','2026-02-05 19:37:03',5,5,'CONG_KHAI',_binary '\0'),(32,'? DINH DƯỠNG THÚ CƯNG','dinh-duong-thu-cung','<h2>?&nbsp;Chế&nbsp;Độ&nbsp;Ăn&nbsp;Khoa&nbsp;Học&nbsp;Cho&nbsp;Chó&nbsp;Mèo</h2><h3>Nội&nbsp;dung</h3><p>Mỗi&nbsp;giai&nbsp;đoạn&nbsp;cần&nbsp;khẩu&nbsp;phần&nbsp;khác&nbsp;nhau:</p><h3>Chó</h3><ul><li>Protein:&nbsp;18–25%</li><li>Chất&nbsp;béo:&nbsp;10–15%</li></ul><h3>Mèo</h3><ul><li>Protein&nbsp;cao&nbsp;(30–40%)</li><li>Bổ&nbsp;sung&nbsp;Taurine</li></ul><p>Nên&nbsp;chọn&nbsp;thức&nbsp;ăn&nbsp;có&nbsp;nguồn&nbsp;gốc&nbsp;rõ&nbsp;ràng&nbsp;và&nbsp;phù&nbsp;hợp&nbsp;độ&nbsp;tuổi.</p>','a2032b97-bacc-4e8b-bfe5-2c4998d4f8d2.jpg','2026-02-05 19:38:57',5,6,'CONG_KHAI',_binary '\0'),(33,'? SỰ KIỆN & KHUYẾN MÃI','su-kien-khuyen-mai','<h2>?&nbsp;Ngày&nbsp;Hội&nbsp;Thú&nbsp;Cưng&nbsp;–&nbsp;Check-in&nbsp;Nhận&nbsp;Quà</h2><h3>Nội&nbsp;dung</h3><p>Chúng&nbsp;tôi&nbsp;tổ&nbsp;chức&nbsp;sự&nbsp;kiện&nbsp;offline:</p><p>?&nbsp;Giao&nbsp;lưu&nbsp;thú&nbsp;cưng</p><p>&nbsp;?&nbsp;Thi&nbsp;ảnh&nbsp;đẹp</p><p>&nbsp;?&nbsp;Tư&nbsp;vấn&nbsp;thú&nbsp;y&nbsp;miễn&nbsp;phí</p><p>&nbsp;?&nbsp;Nhận&nbsp;quà&nbsp;khi&nbsp;tham&nbsp;gia</p><p>?&nbsp;Thời&nbsp;gian:&nbsp;Chủ&nbsp;nhật&nbsp;tuần&nbsp;cuối&nbsp;mỗi&nbsp;tháng.</p>','d1712f61-3be9-47d9-8f74-e22dca605600.jpg','2026-02-05 19:39:25',5,7,'CONG_KHAI',_binary ''),(34,'asdasd','asdasd','<p>sdasd</p>',NULL,'2026-02-05 19:43:17',5,1,'CONG_KHAI',_binary ''),(35,'asd','asd','<p>asd</p>',NULL,'2026-02-05 19:49:55',5,5,'CONG_KHAI',_binary ''),(36,'asd','asd','<p>asd</p>',NULL,'2026-02-05 19:52:02',5,3,'CONG_KHAI',_binary ''),(37,'asd','asd','<p>asd</p>',NULL,'2026-02-05 19:53:00',5,1,'CONG_KHAI',_binary ''),(38,'asdasd','asdasd','<p>asdasd</p>',NULL,'2026-02-05 20:00:25',5,1,'CONG_KHAI',_binary ''),(39,'asd','asd','<p>asd</p>',NULL,'2026-02-05 20:20:42',5,2,'CONG_KHAI',_binary ''),(40,'Cách chăm sóc chó Poodle tại nhà','cach-cham-soc-cho-poodle-tai-nha','<p>Nội dung bài viết chi tiết...</p>','c34a956e-9166-4c9d-9de9-fbb58b0e3a84.jpg','2026-02-05 20:33:17',2,2,'CONG_KHAI',_binary ''),(41,'asd','asd','<p>asd</p>',NULL,'2026-02-05 20:33:33',2,1,'CONG_KHAI',_binary ''),(42,'? SỰ KIỆN & KHUYẾN MÃI','su-kien-khuyen-mai','<h2>?&nbsp;Ngày&nbsp;Hội&nbsp;Thú&nbsp;Cưng&nbsp;–&nbsp;Check-in&nbsp;Nhận&nbsp;Quà</h2><h3>Nội&nbsp;dung</h3><p>Chúng&nbsp;tôi&nbsp;tổ&nbsp;chức&nbsp;sự&nbsp;kiện&nbsp;offline:</p><p>?&nbsp;Giao&nbsp;lưu&nbsp;thú&nbsp;cưng</p><p>&nbsp;?&nbsp;Thi&nbsp;ảnh&nbsp;đẹp</p><p>&nbsp;?&nbsp;Tư&nbsp;vấn&nbsp;thú&nbsp;y&nbsp;miễn&nbsp;phí</p><p>&nbsp;?&nbsp;Nhận&nbsp;quà&nbsp;khi&nbsp;tham&nbsp;gia</p><p>?&nbsp;Thời&nbsp;gian:&nbsp;Chủ&nbsp;nhật&nbsp;tuần&nbsp;cuối&nbsp;mỗi&nbsp;tháng.</p>','e66d5415-0ffb-47d2-893e-bde210e79e9c.jpg','2026-02-05 20:34:50',2,7,'CONG_KHAI',_binary '\0');
/*!40000 ALTER TABLE `bai_viet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_don_hang`
--

DROP TABLE IF EXISTS `chi_tiet_don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_don_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `don_hang_id` int NOT NULL,
  `san_pham_id` int NOT NULL,
  `so_luong` int NOT NULL,
  `don_gia` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ctdh_donhang` (`don_hang_id`),
  KEY `fk_ctdh_sp` (`san_pham_id`),
  CONSTRAINT `fk_ctdh_donhang` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`don_hang_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ctdh_sp` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_don_hang`
--

LOCK TABLES `chi_tiet_don_hang` WRITE;
/*!40000 ALTER TABLE `chi_tiet_don_hang` DISABLE KEYS */;
INSERT INTO `chi_tiet_don_hang` VALUES (83,42,24,1,170000.00),(84,42,23,1,185000.00),(85,43,24,1,170000.00),(86,43,23,1,185000.00),(87,44,24,1,170000.00),(88,44,23,1,185000.00),(89,45,23,1,185000.00),(90,46,23,1,185000.00),(91,47,23,1,185000.00),(92,48,23,1,185000.00),(93,49,34,8,165000.00),(94,49,33,7,245000.00),(95,49,32,12,220000.00),(96,49,31,6,40000.00),(97,49,30,1,45000.00),(98,49,29,1,120000.00),(99,49,28,1,35000.00),(100,49,27,1,180000.00),(101,49,26,1,190000.00),(102,49,25,1,25000.00),(103,49,24,1,170000.00),(104,49,23,1,185000.00),(105,50,23,94,185000.00),(106,51,23,1,185000.00),(107,52,23,1,185000.00),(108,53,24,1,170000.00),(109,53,23,1,185000.00),(110,54,24,1,170000.00),(111,54,23,1,185000.00),(112,55,24,1,170000.00),(113,55,23,1,185000.00),(114,56,23,1,185000.00),(115,56,24,1,170000.00),(116,57,24,1,170000.00),(117,57,23,1,185000.00),(118,58,24,1,170000.00),(119,58,23,1,185000.00),(120,59,24,1,170000.00),(121,59,23,1,185000.00),(133,67,24,1,170000.00),(134,67,23,1,185000.00),(135,68,23,2,185000.00),(136,68,24,2,170000.00),(137,69,24,1,170000.00),(138,69,23,3,185000.00),(139,70,24,1,170000.00),(140,70,23,1,185000.00);
/*!40000 ALTER TABLE `chi_tiet_don_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_don_thuoc`
--

DROP TABLE IF EXISTS `chi_tiet_don_thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_don_thuoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lieu_dung` varchar(255) DEFAULT NULL,
  `so_luong` int NOT NULL,
  `don_thuoc_id` int NOT NULL,
  `san_pham_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4e5xwwvsae5p0qafoc8cph52w` (`don_thuoc_id`),
  KEY `FKlf86gal9cc6vxrjrvk773hg2k` (`san_pham_id`),
  CONSTRAINT `FK4e5xwwvsae5p0qafoc8cph52w` FOREIGN KEY (`don_thuoc_id`) REFERENCES `don_thuoc` (`don_thuoc_id`),
  CONSTRAINT `FKlf86gal9cc6vxrjrvk773hg2k` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_don_thuoc`
--

LOCK TABLES `chi_tiet_don_thuoc` WRITE;
/*!40000 ALTER TABLE `chi_tiet_don_thuoc` DISABLE KEYS */;
INSERT INTO `chi_tiet_don_thuoc` VALUES (7,'sáng/tối',1,5,28),(8,'ds',1,6,27),(9,'1 viên 1 ngày',10,7,50);
/*!40000 ALTER TABLE `chi_tiet_don_thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_gio_hang`
--

DROP TABLE IF EXISTS `chi_tiet_gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_gio_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gio_hang_id` int NOT NULL,
  `san_pham_id` int NOT NULL,
  `so_luong` int NOT NULL DEFAULT '1',
  `ngay_them` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cart_item` (`gio_hang_id`,`san_pham_id`),
  UNIQUE KEY `UKrgaichkf593qhqk7yhgr99q6m` (`gio_hang_id`,`san_pham_id`),
  KEY `fk_ctgh_sp` (`san_pham_id`),
  CONSTRAINT `fk_ctgh_giohang` FOREIGN KEY (`gio_hang_id`) REFERENCES `gio_hang` (`gio_hang_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ctgh_sp` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`san_pham_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_gio_hang`
--

LOCK TABLES `chi_tiet_gio_hang` WRITE;
/*!40000 ALTER TABLE `chi_tiet_gio_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `chi_tiet_gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_phieu_nhap`
--

DROP TABLE IF EXISTS `chi_tiet_phieu_nhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_phieu_nhap` (
  `ctpn_id` int NOT NULL AUTO_INCREMENT,
  `phieu_nhap_id` int NOT NULL,
  `san_pham_id` int NOT NULL,
  `so_luong` int NOT NULL,
  `gia_nhap` decimal(38,2) NOT NULL,
  PRIMARY KEY (`ctpn_id`),
  KEY `fk_ctpn_phieu` (`phieu_nhap_id`),
  KEY `fk_ctpn_sp` (`san_pham_id`),
  CONSTRAINT `fk_ctpn_phieu` FOREIGN KEY (`phieu_nhap_id`) REFERENCES `phieu_nhap` (`phieu_nhap_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ctpn_sp` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_phieu_nhap`
--

LOCK TABLES `chi_tiet_phieu_nhap` WRITE;
/*!40000 ALTER TABLE `chi_tiet_phieu_nhap` DISABLE KEYS */;
INSERT INTO `chi_tiet_phieu_nhap` VALUES (8,5,23,2,100000.00),(9,6,23,1000,120000.00),(10,7,30,10000,10000.00),(11,8,23,50,10000.00);
/*!40000 ALTER TABLE `chi_tiet_phieu_nhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cua_hang`
--

DROP TABLE IF EXISTS `cua_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cua_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia_chi_chi_tiet` varchar(255) DEFAULT NULL,
  `ghtk_token` varchar(255) DEFAULT NULL,
  `phuong_xa` varchar(255) DEFAULT NULL,
  `quan_huyen` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `ten_cua_hang` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cua_hang`
--

LOCK TABLES `cua_hang` WRITE;
/*!40000 ALTER TABLE `cua_hang` DISABLE KEYS */;
INSERT INTO `cua_hang` VALUES (1,'ngõ 17 P. Phan Đình Giót, La Khê, Hà Đông, Hà Nội, Việt Nam','3EQrklGNDYniAbtKjFdUWXTp6BMcjLNBEZN6Qw2','La Khê','Quận Cầu Giấy','0972471680','Petlor Shop','Hà Nội');
/*!40000 ALTER TABLE `cua_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_gia`
--

DROP TABLE IF EXISTS `danh_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_gia` (
  `danh_gia_id` int NOT NULL AUTO_INCREMENT,
  `ngay_danh_gia` datetime(6) DEFAULT NULL,
  `noi_dung` text,
  `so_sao` int NOT NULL,
  `don_hang_id` int NOT NULL,
  `user_id` int NOT NULL,
  `san_pham_id` int DEFAULT NULL,
  `ngay_phan_hoi` datetime(6) DEFAULT NULL,
  `phan_hoi` text,
  PRIMARY KEY (`danh_gia_id`),
  KEY `FK6x9dbf9vytsh3dw6ibj9xa7c6` (`don_hang_id`),
  KEY `FKe92qvru6jwbl3b6ff0dl6nvnd` (`user_id`),
  KEY `FKpb5x40mo1o7n473vju2rc2luc` (`san_pham_id`),
  CONSTRAINT `FK6x9dbf9vytsh3dw6ibj9xa7c6` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`don_hang_id`),
  CONSTRAINT `FKe92qvru6jwbl3b6ff0dl6nvnd` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`),
  CONSTRAINT `FKpb5x40mo1o7n473vju2rc2luc` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_gia`
--

LOCK TABLES `danh_gia` WRITE;
/*!40000 ALTER TABLE `danh_gia` DISABLE KEYS */;
INSERT INTO `danh_gia` VALUES (9,'2026-02-07 12:51:15.682272','tốt',5,42,1,24,NULL,NULL),(10,'2026-02-07 12:51:15.682272','tốt',5,42,1,23,NULL,NULL),(11,'2026-03-09 12:22:17.224986','sản phẩm tốt ',5,49,1,34,NULL,NULL),(12,'2026-03-09 12:22:17.226985','sản phẩm tốt ',5,49,1,33,NULL,NULL),(13,'2026-03-09 12:22:17.226985','sản phẩm tốt ',5,49,1,32,NULL,NULL),(14,'2026-03-09 12:22:17.227991','sản phẩm tốt ',5,49,1,31,NULL,NULL),(15,'2026-03-09 12:22:17.228967','',5,49,1,30,NULL,NULL),(16,'2026-03-09 12:22:17.228967','',5,49,1,29,NULL,NULL),(17,'2026-03-09 12:22:17.230476','',5,49,1,28,NULL,NULL),(18,'2026-03-09 12:22:17.231508','',5,49,1,27,NULL,NULL),(19,'2026-03-09 12:22:17.231508','',5,49,1,26,NULL,NULL),(20,'2026-03-09 12:22:17.232505','',5,49,1,25,NULL,NULL),(21,'2026-03-09 12:22:17.233489','',5,49,1,24,NULL,NULL),(22,'2026-03-09 12:22:17.234513','',5,49,1,23,NULL,NULL);
/*!40000 ALTER TABLE `danh_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_muc_bai_viet`
--

DROP TABLE IF EXISTS `danh_muc_bai_viet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_muc_bai_viet` (
  `danh_muc_bv_id` int NOT NULL AUTO_INCREMENT,
  `ten_danh_muc` varchar(255) NOT NULL,
  `da_xoa` bit(1) DEFAULT NULL,
  `mo_ta` text,
  PRIMARY KEY (`danh_muc_bv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_muc_bai_viet`
--

LOCK TABLES `danh_muc_bai_viet` WRITE;
/*!40000 ALTER TABLE `danh_muc_bai_viet` DISABLE KEYS */;
INSERT INTO `danh_muc_bai_viet` VALUES (1,'Kiến thức nuôi chó',_binary '\0','asdasd'),(2,'Kiến thức nuôi mèo',_binary '\0','asfaczxc'),(3,'Khuyến mãi',_binary '\0',NULL),(4,'Chăm sóc thú cưng',_binary '',NULL),(5,'Kiến thức nuôi thỏ',_binary '\0',NULL),(6,'Dinh dưỡng thú cưng',_binary '\0',NULL),(7,'Sự kiện & Khuyến mãi',_binary '\0',NULL);
/*!40000 ALTER TABLE `danh_muc_bai_viet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_muc_dich_vu`
--

DROP TABLE IF EXISTS `danh_muc_dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_muc_dich_vu` (
  `danh_muc_dv_id` int NOT NULL AUTO_INCREMENT,
  `ten_danh_muc_dv` varchar(100) NOT NULL,
  `mo_ta` text,
  PRIMARY KEY (`danh_muc_dv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_muc_dich_vu`
--

LOCK TABLES `danh_muc_dich_vu` WRITE;
/*!40000 ALTER TABLE `danh_muc_dich_vu` DISABLE KEYS */;
INSERT INTO `danh_muc_dich_vu` VALUES (1,'Khám bệnh','Khám và chẩn đoán sức khỏe thú cưng'),(2,'Spa & Grooming','Tắm, cắt tỉa, vệ sinh'),(3,'Tiêm phòng','Tiêm vacxin định kỳ'),(4,'Tư vấn','Tư vấn sức khỏe và dinh dưỡng');
/*!40000 ALTER TABLE `danh_muc_dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_muc_san_pham`
--

DROP TABLE IF EXISTS `danh_muc_san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_muc_san_pham` (
  `danh_muc_id` int NOT NULL AUTO_INCREMENT,
  `ten_danh_muc` varchar(100) NOT NULL,
  `mo_ta` text,
  PRIMARY KEY (`danh_muc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_muc_san_pham`
--

LOCK TABLES `danh_muc_san_pham` WRITE;
/*!40000 ALTER TABLE `danh_muc_san_pham` DISABLE KEYS */;
INSERT INTO `danh_muc_san_pham` VALUES (1,'Thức ăn chó','Thức ăn khô, ướt dành cho chó'),(2,'Thức ăn mèo','Thức ăn hạt, pate cho mèo'),(3,'Thuốc thú y','Thuốc điều trị, phòng bệnh cho thú cưng'),(4,'Phụ kiện','Dây dắt, vòng cổ, khay ăn'),(5,'Đồ chơi','Đồ chơi vận động cho thú cưng');
/*!40000 ALTER TABLE `danh_muc_san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dich_vu`
--

DROP TABLE IF EXISTS `dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dich_vu` (
  `dich_vu_id` int NOT NULL AUTO_INCREMENT,
  `ten_dich_vu` varchar(255) NOT NULL,
  `mo_ta` text,
  `gia_dich_vu` decimal(10,2) NOT NULL,
  `thoi_luong_uoc_tinh` int DEFAULT '60',
  `danh_muc_dv_id` int DEFAULT NULL,
  `hinh_anh` text,
  PRIMARY KEY (`dich_vu_id`),
  KEY `fk_dv_danhmuc` (`danh_muc_dv_id`),
  CONSTRAINT `fk_dv_danhmuc` FOREIGN KEY (`danh_muc_dv_id`) REFERENCES `danh_muc_dich_vu` (`danh_muc_dv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dich_vu`
--

LOCK TABLES `dich_vu` WRITE;
/*!40000 ALTER TABLE `dich_vu` DISABLE KEYS */;
INSERT INTO `dich_vu` VALUES (13,'Khám tổng quát','Khám sức khỏe tổng quát cho chó mèo',200000.00,60,1,'kham-tong-quat.jpg'),(14,'Khám chuyên sâu','Khám bệnh, xét nghiệm chuyên sâu',300000.00,90,1,'kham-chuyen-sau.jpg'),(15,'Tắm & sấy cho chó','Tắm, sấy, vệ sinh cơ bản',150000.00,60,2,'tam-cho.jpg'),(16,'Grooming mèo','Cắt tỉa lông, vệ sinh tai móng',180000.00,90,2,'grooming-meo.jpg'),(17,'Tiêm phòng 5 bệnh','Vacxin 5 bệnh cho chó',250000.00,30,3,'tiem-5-benh.jpg'),(18,'Tiêm phòng dại','Vacxin phòng bệnh dại',120000.00,20,3,'tiem-dai.jpg'),(19,'Tư vấn dinh dưỡng','Tư vấn chế độ ăn phù hợp',100000.00,30,4,'tu-van-dinh-duong.jpg');
/*!40000 ALTER TABLE `dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_hang`
--

DROP TABLE IF EXISTS `don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_hang` (
  `don_hang_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `khuyen_mai_id` int DEFAULT NULL,
  `ngay_dat_hang` datetime DEFAULT CURRENT_TIMESTAMP,
  `tong_tien_hang` decimal(10,2) NOT NULL,
  `so_tien_giam` decimal(10,2) DEFAULT '0.00',
  `tong_thanh_toan` decimal(10,2) NOT NULL,
  `trang_thai` enum('CHO_XU_LY','DA_XAC_NHAN','DANG_GIAO','DA_GIAO','DA_HUY') DEFAULT 'CHO_XU_LY',
  `phuong_thuc_thanh_toan` enum('COD','VNPAY','MOMO') DEFAULT 'COD',
  `dia_chi_giao_hang` text NOT NULL,
  `so_dien_thoai_nhan` varchar(20) NOT NULL,
  `ly_do_huy` text,
  `email_nguoi_nhan` varchar(100) DEFAULT NULL,
  `ho_ten_nguoi_nhan` varchar(100) DEFAULT NULL,
  `phi_van_chuyen` decimal(10,2) DEFAULT NULL,
  `ma_giao_dich` varchar(255) DEFAULT NULL,
  `ngay_thanh_toan` datetime(6) DEFAULT NULL,
  `trang_thai_thanh_toan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`don_hang_id`),
  KEY `fk_dh_user` (`user_id`),
  KEY `fk_dh_km` (`khuyen_mai_id`),
  CONSTRAINT `fk_dh_km` FOREIGN KEY (`khuyen_mai_id`) REFERENCES `khuyen_mai` (`khuyen_mai_id`),
  CONSTRAINT `fk_dh_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_hang`
--

LOCK TABLES `don_hang` WRITE;
/*!40000 ALTER TABLE `don_hang` DISABLE KEYS */;
INSERT INTO `don_hang` VALUES (42,1,2,'2026-02-01 09:47:20',355000.00,355000.00,30000.00,'DA_GIAO','COD','Hà Đông, Hà Nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(43,28,2,'2026-02-05 19:23:27',355000.00,355000.00,30000.00,'DA_GIAO','COD','hanoi, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0837423232',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(44,1,2,'2026-02-07 13:01:00',355000.00,355000.00,30000.00,'DA_GIAO','MOMO','Hà , Xã Bình Chánh, Huyện Châu Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(45,1,NULL,'2026-02-07 13:01:47',185000.00,0.00,215000.00,'DA_GIAO','MOMO','Hà , Xã Khánh An, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(46,1,NULL,'2026-02-07 13:01:49',185000.00,0.00,215000.00,'DA_GIAO','MOMO','Hà , Xã Khánh An, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(47,1,NULL,'2026-02-07 13:01:52',185000.00,0.00,215000.00,'DA_GIAO','MOMO','Hà , Xã Khánh An, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(48,1,NULL,'2026-02-07 13:01:55',185000.00,0.00,215000.00,'DA_GIAO','MOMO','Hà , Xã Khánh An, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(49,1,NULL,'2026-02-07 13:17:22',6865000.00,0.00,6895000.00,'DA_GIAO','MOMO','Hà Đông, Hà Nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(50,1,NULL,'2026-02-07 13:51:23',17390000.00,0.00,17420000.00,'CHO_XU_LY','COD','Hà Đông, Hà Nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(51,1,NULL,'2026-02-07 14:09:33',185000.00,0.00,215000.00,'CHO_XU_LY','MOMO','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(52,1,NULL,'2026-02-07 14:10:00',185000.00,0.00,215000.00,'CHO_XU_LY','VNPAY','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(53,1,NULL,'2026-02-07 14:11:43',355000.00,0.00,385000.00,'CHO_XU_LY','MOMO','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(54,1,NULL,'2026-02-07 14:17:23',355000.00,0.00,385000.00,'DA_XAC_NHAN','MOMO','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHO_THANH_TOAN'),(55,1,NULL,'2026-02-07 15:02:36',355000.00,0.00,385000.00,'DA_XAC_NHAN','COD','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(56,NULL,NULL,'2026-02-07 15:51:35',355000.00,0.00,385000.00,'DA_XAC_NHAN','MOMO','Hà Đông, Hà Nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0323723444',NULL,'duong@gmail.com','duong',30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(57,1,1,'2026-02-07 15:54:38',355000.00,60000.00,325000.00,'DA_HUY','COD','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680','Muốn thay đổi địa chỉ/số điện thoại nhận hàng',NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(58,10,NULL,'2026-02-27 20:44:08',355000.00,0.00,385000.00,'CHO_XU_LY','COD','Hà Đông, Hà Nội, Xã Hoà Long, Thành phố Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu','0909999999',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(59,22,NULL,'2026-02-27 20:59:17',355000.00,0.00,385000.00,'CHO_XU_LY','COD','HaNoi, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471681',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(67,1,NULL,'2026-03-04 22:05:41',355000.00,0.00,385000.00,'CHO_XU_LY','COD','Số 6, La Khê, Hà Đông, Hà Nội','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(68,NULL,NULL,'2026-03-09 12:10:53',710000.00,0.00,740000.00,'CHO_XU_LY','MOMO','so 6 , Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','09326742674',NULL,'duongvu@gmail.com','duongvu',30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(69,1,1,'2026-03-09 12:11:45',725000.00,60000.00,695000.00,'DA_HUY','COD','Hà nội, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang','0972471680','Muốn thay đổi địa chỉ/số điện thoại nhận hàng',NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN'),(70,1,NULL,'2026-03-09 12:26:58',355000.00,0.00,385000.00,'CHO_XU_LY','COD','Số 6, La Khê, Hà Đông, Hà Nội','0972471680',NULL,NULL,NULL,30000.00,NULL,NULL,'CHUA_THANH_TOAN');
/*!40000 ALTER TABLE `don_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_thuoc`
--

DROP TABLE IF EXISTS `don_thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_thuoc` (
  `don_thuoc_id` int NOT NULL AUTO_INCREMENT,
  `chan_doan` text,
  `loi_dan` text,
  `ngay_ke` datetime(6) DEFAULT NULL,
  `trang_thai` enum('DA_HUY','DA_THANH_TOAN','MOI_TAO') DEFAULT NULL,
  `nhan_vien_id` int DEFAULT NULL,
  `lich_hen_id` int NOT NULL,
  `thu_cung_id` int DEFAULT NULL,
  PRIMARY KEY (`don_thuoc_id`),
  UNIQUE KEY `UK95ugkldnnda2ibmdbbbikd7g7` (`lich_hen_id`),
  KEY `FKcq0l5xojnbelghmxvvtcyb46n` (`nhan_vien_id`),
  KEY `FKk0x9pfc3anly6i84edntfmhye` (`thu_cung_id`),
  CONSTRAINT `FKcq0l5xojnbelghmxvvtcyb46n` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`),
  CONSTRAINT `FKk0x9pfc3anly6i84edntfmhye` FOREIGN KEY (`thu_cung_id`) REFERENCES `thu_cung` (`thu_cung_id`),
  CONSTRAINT `FKu2h5hrjmloafd2930x9x3von` FOREIGN KEY (`lich_hen_id`) REFERENCES `lich_hen` (`lich_hen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_thuoc`
--

LOCK TABLES `don_thuoc` WRITE;
/*!40000 ALTER TABLE `don_thuoc` DISABLE KEYS */;
INSERT INTO `don_thuoc` VALUES (5,'nhiễm khuẩn nặng do vi khuẩn Gram âm và tụ cầu khuẩn','','2026-02-01 10:00:50.519337','MOI_TAO',1,77,1),(6,'asd','asd','2026-02-27 12:35:16.596250','MOI_TAO',1,81,1),(7,'táo bón','ăn nhiều rau','2026-03-09 12:18:32.477789','MOI_TAO',1,89,1);
/*!40000 ALTER TABLE `don_thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giao_dich_thanh_toan`
--

DROP TABLE IF EXISTS `giao_dich_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giao_dich_thanh_toan` (
  `giao_dich_id` int NOT NULL AUTO_INCREMENT,
  `don_hang_id` int NOT NULL,
  `ma_giao_dich` varchar(255) DEFAULT NULL,
  `so_tien` decimal(38,2) NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `trang_thai` enum('THANH_CONG','THAT_BAI','CHO_XU_LY') DEFAULT 'CHO_XU_LY',
  `noi_dung_loi` text,
  PRIMARY KEY (`giao_dich_id`),
  KEY `fk_gd_donhang` (`don_hang_id`),
  CONSTRAINT `fk_gd_donhang` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`don_hang_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giao_dich_thanh_toan`
--

LOCK TABLES `giao_dich_thanh_toan` WRITE;
/*!40000 ALTER TABLE `giao_dich_thanh_toan` DISABLE KEYS */;
/*!40000 ALTER TABLE `giao_dich_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang` (
  `gio_hang_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ngay_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gio_hang_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_giohang_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (1,1,'2025-12-19 17:50:30'),(2,2,'2025-12-19 17:50:30'),(3,3,'2025-12-19 17:50:30'),(4,4,'2025-12-19 17:50:30'),(5,5,'2025-12-19 17:50:30'),(6,6,'2025-12-19 17:50:30'),(7,7,'2025-12-19 17:50:30'),(8,8,'2025-12-19 17:50:30'),(9,9,'2025-12-19 17:50:30'),(10,10,'2025-12-19 17:50:30'),(11,25,'2026-01-17 11:24:53'),(12,15,'2026-01-19 09:07:27'),(13,16,'2026-01-19 10:55:07'),(14,28,'2026-02-05 19:22:27'),(15,22,'2026-02-27 20:59:05');
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyen_mai`
--

DROP TABLE IF EXISTS `khuyen_mai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyen_mai` (
  `khuyen_mai_id` int NOT NULL AUTO_INCREMENT,
  `ma_code` varchar(50) NOT NULL,
  `mo_ta` text,
  `loai_giam_gia` enum('PHAN_TRAM','SO_TIEN') NOT NULL,
  `gia_tri_giam` decimal(10,2) NOT NULL,
  `ngay_bat_dau` datetime NOT NULL,
  `ngay_ket_thuc` datetime NOT NULL,
  `so_luong_gioi_han` int DEFAULT NULL,
  `don_toi_thieu` decimal(10,2) DEFAULT '0.00',
  `trang_thai` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`khuyen_mai_id`),
  UNIQUE KEY `ma_code` (`ma_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyen_mai`
--

LOCK TABLES `khuyen_mai` WRITE;
/*!40000 ALTER TABLE `khuyen_mai` DISABLE KEYS */;
INSERT INTO `khuyen_mai` VALUES (1,'SALE50K_EDIT','Đã sửa mô tả','SO_TIEN',60000.00,'2026-01-01 00:00:00','2026-12-31 23:59:59',48,250000.00,1),(2,'SUMMERTIME','','PHAN_TRAM',100.00,'2025-12-22 00:00:00','2026-12-26 23:59:59',95,0.00,1),(3,'Wintersale','','PHAN_TRAM',50.00,'2026-01-17 00:00:00','2026-12-31 23:59:59',100,0.00,1);
/*!40000 ALTER TABLE `khuyen_mai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_hen`
--

DROP TABLE IF EXISTS `lich_hen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_hen` (
  `lich_hen_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `thu_cung_id` int DEFAULT NULL,
  `dich_vu_id` int NOT NULL,
  `nhan_vien_id` int DEFAULT NULL,
  `thoi_gian_bat_dau` datetime NOT NULL,
  `thoi_gian_ket_thuc` datetime NOT NULL,
  `trang_thai` enum('CHO_XAC_NHAN','DA_XAC_NHAN','DA_HOAN_THANH','DA_HUY') DEFAULT 'CHO_XAC_NHAN',
  `ghi_chu` text,
  `ly_do_huy` text,
  `email_khach_hang` varchar(255) DEFAULT NULL,
  `sdt_khach_hang` varchar(255) DEFAULT NULL,
  `ten_khach_hang` varchar(255) DEFAULT NULL,
  `loai_lich_hen` enum('KHAN_CAP','TAI_KHAM','THUONG_LE','TU_VAN') DEFAULT NULL,
  `ghi_chu_bac_si` text,
  PRIMARY KEY (`lich_hen_id`),
  KEY `fk_lh_thucung` (`thu_cung_id`),
  KEY `fk_lh_dichvu` (`dich_vu_id`),
  KEY `fk_lh_nhanvien` (`nhan_vien_id`),
  KEY `fk_lh_user` (`user_id`),
  CONSTRAINT `fk_lh_dichvu` FOREIGN KEY (`dich_vu_id`) REFERENCES `dich_vu` (`dich_vu_id`),
  CONSTRAINT `fk_lh_nhanvien` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`),
  CONSTRAINT `fk_lh_thucung` FOREIGN KEY (`thu_cung_id`) REFERENCES `thu_cung` (`thu_cung_id`),
  CONSTRAINT `fk_lh_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_hen`
--

LOCK TABLES `lich_hen` WRITE;
/*!40000 ALTER TABLE `lich_hen` DISABLE KEYS */;
INSERT INTO `lich_hen` VALUES (77,1,1,13,1,'2026-02-01 10:00:00','2026-02-01 11:00:00','DA_HOAN_THANH','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',''),(78,28,28,13,1,'2026-02-06 08:00:00','2026-02-06 09:00:00','DA_HOAN_THANH','hi',NULL,'duong1@gmail.com','0837423232','duong1','THUONG_LE',''),(79,1,1,13,4,'2026-02-06 08:00:00','2026-02-06 09:00:00','DA_HUY','asd','Bận việc đột xuất','vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(80,1,1,13,9,'2026-02-06 08:00:00','2026-02-06 09:00:00','CHO_XAC_NHAN','ds',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(81,1,1,13,1,'2026-02-07 14:00:00','2026-02-07 15:00:00','DA_HOAN_THANH','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE','asdasd'),(82,NULL,NULL,13,1,'2026-02-07 16:00:00','2026-02-07 17:00:00','CHO_XAC_NHAN',' [Thú cưng:  - ]',NULL,'duong@gmail.com','094276472343','duong','THUONG_LE',NULL),(83,1,1,15,3,'2026-02-07 16:00:00','2026-02-07 17:00:00','DA_HOAN_THANH','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(84,1,1,13,4,'2026-02-07 16:30:00','2026-02-07 17:30:00','CHO_XAC_NHAN','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(85,1,1,13,1,'2026-02-27 13:00:00','2026-02-27 14:00:00','CHO_XAC_NHAN','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(86,1,1,13,1,'2026-02-28 08:00:00','2026-02-28 09:00:00','CHO_XAC_NHAN','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(87,1,13,13,3,'2026-03-05 08:00:00','2026-03-05 09:00:00','CHO_XAC_NHAN','Bé hơi nhát',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL),(88,NULL,NULL,13,1,'2026-03-09 12:30:00','2026-03-09 13:30:00','DA_XAC_NHAN',' [Thú cưng: miu - Mèo]',NULL,'duongvu@gmail.com','09461236213','vuduong','THUONG_LE',NULL),(89,1,1,13,1,'2026-03-09 15:00:00','2026-03-09 16:00:00','DA_HOAN_THANH','bé hơi nhát',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE','ăn thêm rau'),(90,1,1,13,3,'2026-03-09 12:30:00','2026-03-09 13:30:00','CHO_XAC_NHAN','',NULL,'vuanhduong251020042@gmail.com','0972471680','Vu Anh Duong','THUONG_LE',NULL);
/*!40000 ALTER TABLE `lich_hen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `dia_chi` text,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `auth_provider` enum('LOCAL','GOOGLE','FACEBOOK') DEFAULT 'LOCAL',
  `role` varchar(255) NOT NULL,
  `anh_dai_dien` text,
  `trang_thai` tinyint(1) DEFAULT '1',
  `gioi_tinh` varchar(10) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `so_dien_thoai` (`so_dien_thoai`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'Vu Anh Duong','vuanhduong251020042@gmail.com','$2a$10$wOq3Yit.kW5xvCnFqarRletxh5nlFdONyB.4ll/q5bIAD0ragxH3K','0972471680','Hà nội','2025-12-19 17:46:57','LOCAL','ADMIN','70bef9c6-1a67-4d11-87e1-20a25e15f707.jpg',1,'Nam','2004-10-25'),(2,'Nguyễn Văn A','user1@gmail.com','$2a$10$OpKEEDWKLOfsqrMcd/lyeOwnb410HZkAVYA8u6v/6q95FvkoCcM/.','09324532123','Hà Nội','2025-12-19 17:50:30','LOCAL','USER','08b80563-f622-48d5-8a40-9698d7a990bf.jpg',0,NULL,NULL),(3,'Trần Thị B','user2@gmail.com','123456','0902222222','TP HCM','2025-12-19 17:50:30','LOCAL','USER','57a96101-9908-405a-a6c8-58baba1e2b1d.jpg',1,NULL,NULL),(4,'Lê Văn C','user3@gmail.com','123456','0903333333','Đà Nẵng','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(5,'Phạm Thị D','user4@gmail.com','123456','0904444444','Hải Phòng','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(6,'Hoàng Văn E','user5@gmail.com','123456','0905555555','Cần Thơ','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(7,'User 6','user6@gmail.com','123456','0906666666','Huế','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(8,'User 7','user7@gmail.com','123456','0907777777','Nghệ An','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(9,'User 8','user8@gmail.com','123456','0908888881','Quảng Ninh','2025-12-19 17:50:30','LOCAL','USER',NULL,1,NULL,NULL),(10,'Admin Pett','admin@gmail.com','$2a$10$sW.KUeJ2TbXqbwgMHPrAoO1AugIj41IMgZLpwWoTK6aBB1yPwoD1e','0909999999',NULL,'2025-12-19 17:50:30','LOCAL','DOCTOR','7552e027-08a6-40dc-9c39-74c70fce99dc.jpg',1,NULL,NULL),(12,'Trần Thị Bác Sĩ','bacsii@example.com','$2a$10$wEQbMM.3R6.4dwFukfXiR.CZKnbqqgk856HWfS.gFahxwxfprgv/6','0912345678','456 Đường XYZ, Hà Nội','2025-12-19 18:00:23','LOCAL','USER','0aa426df-0234-4dc9-b2e8-280dae303e4d.jpg',1,NULL,NULL),(14,'Nguyễn Văn Test','0909998887@petshop.local','$2a$10$KpehtQE24aS78k.7zj3c6e7ZOtBdscqxkVKE0LoWrdpSHUdhhHXzS','0909998887',NULL,'2025-12-20 02:10:25','LOCAL','USER',NULL,1,NULL,NULL),(15,'Bác sĩ Minh','bsminh@gmail.com','$2a$10$Q.7eftheeTGD68spN/WOZuisU5kdISQlclFoUj3gHGYqtvQI1D0Oe','0908888888',NULL,'2025-12-20 11:44:58','LOCAL','RECEPTIONIST','48a21eb4-3e66-4749-9dce-cc33f6e31bea.jpg',1,NULL,NULL),(16,'Bác sĩ Lan','bslan@gmail.com','$2a$10$sW.KUeJ2TbXqbwgMHPrAoO1AugIj41IMgZLpwWoTK6aBB1yPwoD1e','0908888889',NULL,'2025-12-20 12:04:09','LOCAL','SPA','9e455f81-a674-4817-8c75-44b89871a3ea.jpg',1,NULL,NULL),(20,'Tên Nhân Viên Mới','nhanvien.moi@petshop.com','$2a$10$BcEVlIQ8XU7e6tRQqarWkOjiApuLl9AFFKvyFyzsiPAbJQ3weWq4e','0901234567','Hà Đông, Hà Nội','2025-12-20 12:21:55','LOCAL','DOCTOR','64f5e167-d2a8-421a-9d3c-e70d30ccf823.jpg',1,NULL,NULL),(22,'Vu Duong','vuanhduong@gmail.com','$2a$10$0UDqIkzMBoU2p3egLWpB6u3/hKY9Mmv4svnvorxp4LrHQO1hgNhxi','0972471681','HaNoi','2025-12-21 12:38:32','LOCAL','USER','08b80563-f622-48d5-8a40-9698d7a990bf.jpg',1,NULL,NULL),(25,'duong','duong@gmail.com','$2a$10$IuNLoSuF9G9EpBUWPwULpuR.wISJsct1WaUTtiijnhQuc/lUk8zLC','09842423212','HaNoi','2026-01-17 11:24:05','LOCAL','ADMIN',NULL,1,NULL,NULL),(26,'KTV Spa','spa@gmail.com','$2a$10$RJSZzp0MzVlsmdTNIgeBNukSg.841.zH9.EwuFRZJRmd.D8iX5ECy','0908888890',NULL,'2026-01-22 13:37:16','LOCAL','DOCTOR',NULL,1,NULL,NULL),(27,'hehe','hehe@gmail.com','$2a$10$4EYsGMdZD9Nq.bpkDxZLyOrm.132jxIMumEzo178OpGOpCR.TVxJy','091231232443','abc123','2026-01-27 12:23:37','LOCAL','USER',NULL,1,NULL,NULL),(28,'duong1','duong1@gmail.com','$2a$10$mPWqNJ57zG/T8jS1nkb7zuKDSrOmc/i4rf5ZGUKyd8t6zp35LLF1q','0837423232','hanoi','2026-02-05 19:22:15','LOCAL','USER',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nha_cung_cap`
--

DROP TABLE IF EXISTS `nha_cung_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nha_cung_cap` (
  `ncc_id` int NOT NULL AUTO_INCREMENT,
  `ten_ncc` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dia_chi` text,
  `da_xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ncc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_cung_cap`
--

LOCK TABLES `nha_cung_cap` WRITE;
/*!40000 ALTER TABLE `nha_cung_cap` DISABLE KEYS */;
INSERT INTO `nha_cung_cap` VALUES (2,'Pet City','02455556666','sales@petcity.vn','Đống Đa, Hà Nội',_binary '\0'),(4,'Royal Canin Vietnam','0909123456','contact@royalcanin.vn','Quận 7, TP.HCM',_binary '\0'),(5,'Royal Canin Vietnam','0909123457','contact@royalcanin.vn','Quận 7, TP.HCM',_binary '');
/*!40000 ALTER TABLE `nha_cung_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhan_vien`
--

DROP TABLE IF EXISTS `nhan_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhan_vien` (
  `nhan_vien_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `chuc_vu` varchar(100) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `chuyen_khoa` varchar(255) DEFAULT NULL,
  `kinh_nghiem` text,
  `anh_dai_dien` text,
  PRIMARY KEY (`nhan_vien_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `fk_nhanvien_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_vien`
--

LOCK TABLES `nhan_vien` WRITE;
/*!40000 ALTER TABLE `nhan_vien` DISABLE KEYS */;
INSERT INTO `nhan_vien` VALUES (1,10,'Admin Pett','Bác sĩ thú y','0909999999','admin@gmail.com','Quản lý','5 năm','7552e027-08a6-40dc-9c39-74c70fce99dc.jpg'),(2,15,'Bác sĩ Minh','Lễ tân','0908888888','bsminh@gmail.com','Nội khoa','5 năm kinh nghiệm điều trị chó mèo','48a21eb4-3e66-4749-9dce-cc33f6e31bea.jpg'),(3,16,'Bác sĩ Lan','Bác sĩ thú y','0908888889','bslan@gmail.com','Thú y','6 năm','9e455f81-a674-4817-8c75-44b89871a3ea.jpg'),(4,26,'KTV Spa','Bác sĩ thú y','0908888890','spa@gmail.com','Grooming','4 năm',NULL),(5,NULL,'Lễ tân','Nhân viên lễ tân','0908888891','letan@gmail.com','CSKH','3 năm',NULL),(9,20,'Tên Nhân Viên Mới','Bác sĩ thú y','0901234567','nhanvien.moi@petshop.com','Chuyên khoa của nhân viên (ví dụ: Nội khoa)','Kinh nghiệm làm việc (ví dụ: 3 năm)','64f5e167-d2a8-421a-9d3c-e70d30ccf823.jpg');
/*!40000 ALTER TABLE `nhan_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_nhap`
--

DROP TABLE IF EXISTS `phieu_nhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieu_nhap` (
  `phieu_nhap_id` int NOT NULL AUTO_INCREMENT,
  `ncc_id` int NOT NULL,
  `nhan_vien_id` int NOT NULL,
  `ngay_nhap` datetime DEFAULT CURRENT_TIMESTAMP,
  `tong_tien` decimal(38,2) NOT NULL,
  `ghi_chu` text,
  `da_xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`phieu_nhap_id`),
  KEY `fk_pn_ncc` (`ncc_id`),
  KEY `fk_pn_nv` (`nhan_vien_id`),
  CONSTRAINT `fk_pn_ncc` FOREIGN KEY (`ncc_id`) REFERENCES `nha_cung_cap` (`ncc_id`),
  CONSTRAINT `fk_pn_nv` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_nhap`
--

LOCK TABLES `phieu_nhap` WRITE;
/*!40000 ALTER TABLE `phieu_nhap` DISABLE KEYS */;
INSERT INTO `phieu_nhap` VALUES (1,2,1,'2025-12-21 14:22:52',1100000.00,'Nhập hàng tháng 5',_binary ''),(2,2,1,'2025-12-21 14:26:30',1100000.00,'Nhập hàng tháng 5',_binary ''),(3,2,1,'2025-12-21 14:28:48',3000000.00,'Nhập sản phẩm mới',_binary ''),(4,4,1,'2025-12-21 21:09:46',2010000.00,'',_binary ''),(5,2,1,'2026-02-07 12:18:55',200000.00,'',_binary '\0'),(6,2,1,'2026-02-07 13:51:56',120000000.00,'',_binary '\0'),(7,2,1,'2026-02-07 15:58:23',100000000.00,'',_binary '\0'),(8,2,1,'2026-03-09 12:20:55',500000.00,'',_binary '\0');
/*!40000 ALTER TABLE `phieu_nhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phong_chat`
--

DROP TABLE IF EXISTS `phong_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phong_chat` (
  `phong_chat_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nhan_vien_id` int DEFAULT NULL,
  `tieu_de` varchar(255) DEFAULT NULL,
  `trang_thai` enum('MO','DONG') DEFAULT 'MO',
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`phong_chat_id`),
  KEY `fk_chat_user` (`user_id`),
  KEY `fk_chat_nv` (`nhan_vien_id`),
  CONSTRAINT `fk_chat_nv` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`),
  CONSTRAINT `fk_chat_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phong_chat`
--

LOCK TABLES `phong_chat` WRITE;
/*!40000 ALTER TABLE `phong_chat` DISABLE KEYS */;
INSERT INTO `phong_chat` VALUES (1,3,2,'Tư vấn lịch tiêm phòng','MO','2025-12-21 12:45:35');
/*!40000 ALTER TABLE `phong_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `san_pham`
--

DROP TABLE IF EXISTS `san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `san_pham` (
  `san_pham_id` int NOT NULL AUTO_INCREMENT,
  `danh_muc_id` int DEFAULT NULL,
  `ten_san_pham` varchar(255) NOT NULL,
  `mo_ta_chi_tiet` text,
  `gia` decimal(10,2) NOT NULL,
  `gia_giam` decimal(10,2) DEFAULT NULL,
  `so_luong_ton_kho` int DEFAULT '0',
  `hinh_anh` text,
  `da_xoa` tinyint(1) DEFAULT '0',
  `trong_luong` int DEFAULT NULL,
  `chi_dinh` text,
  `don_vi_tinh` varchar(255) DEFAULT NULL,
  `han_su_dung` date DEFAULT NULL,
  `so_lo` varchar(255) DEFAULT NULL,
  `thanh_phan` text,
  PRIMARY KEY (`san_pham_id`),
  KEY `fk_sp_danhmuc` (`danh_muc_id`),
  CONSTRAINT `fk_sp_danhmuc` FOREIGN KEY (`danh_muc_id`) REFERENCES `danh_muc_san_pham` (`danh_muc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham` VALUES (23,1,'Royal Canin Puppy','Thức ăn cho chó con từ 2–10 tháng tuổi',185000.00,NULL,1034,'royal-canin-puppy.jpg',0,300,NULL,'gram','2026-12-31','RC001','Protein, vitamin, khoáng chất'),(24,1,'Pedigree Adult Beef','Thức ăn khô cho chó trưởng thành vị bò',170000.00,NULL,62,'pedigree-adult.jpg',0,400,NULL,'gram','2026-10-30','PD002','Thịt bò, ngũ cốc'),(25,2,'Whiskas Pate Cá Biển','Pate cho mèo vị cá biển',25000.00,NULL,196,'whiskas-pate.jpg',0,85,NULL,'gram','2026-08-20','WK003','Cá biển, vitamin'),(26,2,'Royal Canin Indoor','Thức ăn cho mèo nuôi trong nhà',190000.00,NULL,59,'royal-canin-indoor.jpg',0,400,NULL,'gram','2026-11-15','RC004','Protein, chất xơ'),(27,3,'NexGard Spectra','Viên nhai phòng ve, rận, giun tim cho chó',180000.00,NULL,48,'nexgard-spectra.jpg',0,20,NULL,'viên','2025-10-20','NG005','Afoxolaner'),(28,3,'Bio-Gentamicin','Thuốc nhỏ mắt, mũi, tai cho chó mèo',35000.00,NULL,118,'bio-gentamicin.jpg',0,10,NULL,'lọ','2026-12-31','BG006','Gentamicin'),(29,4,'Dây dắt chó tự động','Dây dắt chó dài 5m, chịu lực tốt',120000.00,NULL,39,'day-dat-cho.jpg',0,NULL,NULL,'cái',NULL,'PK007',NULL),(30,4,'Bát ăn inox','Bát ăn inox chống trượt cho chó mèo',45000.00,NULL,10069,'bat-an-inox.jpg',0,NULL,NULL,'cái',NULL,'PK008',NULL),(31,5,'Bóng cao su cho chó','Đồ chơi giúp chó vận động, giảm stress',40000.00,NULL,84,'bong-cao-su.jpg',0,NULL,NULL,'cái',NULL,'DC009',NULL),(32,1,'Royal Canin Medium Adult','Thức ăn cho chó trưởng thành giống vừa',220000.00,NULL,48,'rc-medium-adult.jpg',0,500,NULL,'gram','2026-11-30',NULL,NULL),(33,1,'Royal Canin Maxi Adult','Thức ăn cho chó giống lớn',245000.00,NULL,43,'rc-maxi-adult.jpg',0,500,NULL,'gram','2026-12-31',NULL,NULL),(34,1,'SmartHeart Adult Lamb','Hạt cho chó trưởng thành vị cừu',165000.00,NULL,62,'smartheart-lamb.jpg',0,400,NULL,'gram','2026-10-15',NULL,NULL),(35,1,'Pedigree Puppy Chicken','Thức ăn cho chó con vị gà',155000.00,NULL,80,'pedigree-puppy.jpg',0,400,NULL,'gram','2026-09-20',NULL,NULL),(36,1,'Ganador Adult','Hạt cho chó trưởng thành giá phổ thông',135000.00,NULL,100,'ganador-adult.jpg',0,500,NULL,'gram','2026-08-30',NULL,NULL),(37,1,'Zenith Puppy','Thức ăn cao cấp cho chó con',290000.00,NULL,40,'zenith-puppy.jpg',0,500,NULL,'gram','2026-12-10',NULL,NULL),(38,1,'ANF 6Free Salmon','Thức ăn không ngũ cốc cho chó',320000.00,NULL,35,'anf-salmon.jpg',0,400,NULL,'gram','2026-11-05',NULL,NULL),(39,1,'Nutrience Original','Thức ăn chó cao cấp Canada',350000.00,NULL,30,'nutrience-dog.jpg',0,500,NULL,'gram','2026-12-25',NULL,NULL),(40,2,'Royal Canin Kitten','Thức ăn cho mèo con dưới 12 tháng',195000.00,NULL,70,'rc-kitten.jpg',0,400,NULL,'gram','2026-11-20',NULL,NULL),(41,2,'Royal Canin Hairball Care','Giảm búi lông cho mèo',210000.00,NULL,55,'rc-hairball.jpg',0,400,NULL,'gram','2026-12-15',NULL,NULL),(42,2,'Whiskas Adult Ocean Fish','Hạt mèo vị cá biển',125000.00,NULL,120,'whiskas-ocean.jpg',0,400,NULL,'gram','2026-09-30',NULL,NULL),(43,2,'Me-O Tuna','Thức ăn mèo vị cá ngừ',115000.00,NULL,150,'meo-tuna.jpg',0,400,NULL,'gram','2026-08-25',NULL,NULL),(44,2,'Catsrang Kitten','Hạt cho mèo con cao cấp',180000.00,NULL,65,'catsrang-kitten.jpg',0,400,NULL,'gram','2026-10-10',NULL,NULL),(45,2,'ANF 6Free Chicken','Thức ăn mèo không ngũ cốc',330000.00,NULL,40,'anf-cat.jpg',0,400,NULL,'gram','2026-12-01',NULL,NULL),(46,2,'Nutrience Indoor','Thức ăn cho mèo nuôi trong nhà',360000.00,NULL,35,'nutrience-cat.jpg',0,450,NULL,'gram','2026-12-28',NULL,NULL),(47,2,'Sheba Pate Cá Ngừ','Pate cao cấp cho mèo',32000.00,NULL,200,'sheba-tuna.jpg',0,85,NULL,'gram','2026-07-30',NULL,NULL),(48,3,'Bravecto','Viên nhai trị ve rận 12 tuần',550000.00,NULL,30,'bravecto.jpg',0,NULL,NULL,'viên','2026-05-15',NULL,NULL),(49,3,'Vime-Deworm','Thuốc tẩy giun sán chó mèo',25000.00,NULL,200,'vime-deworm.jpg',0,NULL,NULL,'viên','2027-01-01',NULL,NULL),(50,3,'Caldic','Viên bổ sung canxi',85000.00,NULL,70,'caldic.jpg',0,NULL,NULL,'hộp','2026-02-28',NULL,NULL),(51,3,'Nutri-Plus Gel','Gel dinh dưỡng cho thú cưng',160000.00,NULL,60,'nutri-plus.jpg',0,NULL,NULL,'tuýp','2025-08-08',NULL,NULL),(52,3,'Povidine 10%','Dung dịch sát trùng',15000.00,NULL,150,'povidine.jpg',0,NULL,NULL,'lọ','2028-01-01',NULL,NULL),(53,3,'Alkin Spray','Xịt sát khuẩn ngoài da',65000.00,NULL,90,'alkin.jpg',0,NULL,NULL,'chai','2026-09-15',NULL,NULL),(54,3,'Bio-Cat','Vitamin tổng hợp cho mèo',120000.00,NULL,70,'bio-cat.jpg',0,NULL,NULL,'lọ','2026-10-30',NULL,NULL),(55,3,'Hepatonic','Thuốc bổ gan cho chó mèo',180000.00,NULL,50,'hepatonic.jpg',0,NULL,NULL,'chai','2026-11-20',NULL,NULL),(56,4,'Vòng cổ da chó','Vòng cổ da cao cấp',75000.00,NULL,60,'vong-co-da.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(57,4,'Dây dắt phản quang','Dây dắt an toàn ban đêm',95000.00,NULL,50,'day-dat-phan-quang.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(58,4,'Khay vệ sinh mèo','Khay vệ sinh nhựa lớn',180000.00,NULL,40,'khay-ve-sinh.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(59,4,'Bình nước treo chuồng','Bình nước tự động',65000.00,NULL,70,'binh-nuoc.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(60,4,'Chuồng nhựa thú cưng','Chuồng nhựa size M',450000.00,NULL,20,'chuong-nhua.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(61,4,'Bát ăn đôi','Bát ăn đôi inox',90000.00,NULL,80,'bat-an-doi.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(62,4,'Áo chó mùa đông','Áo giữ ấm cho chó',120000.00,NULL,35,'ao-cho.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(63,4,'Lược chải lông','Lược chải lông chó mèo',55000.00,NULL,100,'luoc-long.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(64,5,'Bóng cao su phát âm','Bóng cao su kêu chíp',45000.00,NULL,90,'bong-keu.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(65,5,'Xương gặm cao su','Xương gặm cho chó',55000.00,NULL,85,'xuong-gam.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(66,5,'Chuột đồ chơi mèo','Chuột giả cho mèo vờn',30000.00,NULL,120,'chuot-meo.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(67,5,'Cần câu mèo','Cần câu có lông vũ',40000.00,NULL,100,'can-cau-meo.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(68,5,'Bóng lăn thông minh','Bóng tự lăn cho mèo',85000.00,NULL,60,'bong-lan.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(69,5,'Thú nhồi bông','Thú bông cho chó',65000.00,NULL,70,'thu-bong.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(70,5,'Đĩa bay cao su','Đĩa bay huấn luyện chó',50000.00,NULL,80,'dia-bay.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL),(71,5,'Đồ chơi gặm thừng','Thừng gặm răng cho chó',60000.00,NULL,75,'thung-gam.jpg',0,NULL,NULL,'cái',NULL,NULL,NULL);
/*!40000 ALTER TABLE `san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so_tiem_chung`
--

DROP TABLE IF EXISTS `so_tiem_chung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `so_tiem_chung` (
  `tiem_chung_id` int NOT NULL AUTO_INCREMENT,
  `thu_cung_id` int NOT NULL,
  `ten_vac_xin` varchar(255) NOT NULL,
  `ngay_tiem` date NOT NULL,
  `ngay_tai_chung` date DEFAULT NULL,
  `nhan_vien_id` int DEFAULT NULL,
  `ghi_chu` text,
  `lich_hen_id` int DEFAULT NULL,
  PRIMARY KEY (`tiem_chung_id`),
  KEY `fk_stc_thucung` (`thu_cung_id`),
  KEY `fk_stc_nhanvien` (`nhan_vien_id`),
  KEY `fk_stc_lichhen` (`lich_hen_id`),
  CONSTRAINT `fk_stc_lichhen` FOREIGN KEY (`lich_hen_id`) REFERENCES `lich_hen` (`lich_hen_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_stc_nhanvien` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nhan_vien` (`nhan_vien_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_stc_thucung` FOREIGN KEY (`thu_cung_id`) REFERENCES `thu_cung` (`thu_cung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_tiem_chung`
--

LOCK TABLES `so_tiem_chung` WRITE;
/*!40000 ALTER TABLE `so_tiem_chung` DISABLE KEYS */;
INSERT INTO `so_tiem_chung` VALUES (9,1,'vacxin phòng dại','2026-02-01','2026-08-01',1,'',77),(10,1,'asd','2026-02-27','2027-12-27',1,'sad',81),(11,1,'phòng dại','2026-03-09','2027-06-09',1,'phòng dại',89);
/*!40000 ALTER TABLE `so_tiem_chung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_bao`
--

DROP TABLE IF EXISTS `thong_bao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thong_bao` (
  `thong_bao_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tieu_de` varchar(255) NOT NULL,
  `noi_dung` text NOT NULL,
  `loai_thong_bao` enum('DON_HANG','LICH_HEN','KHUYEN_MAI','HE_THONG') NOT NULL,
  `lien_ket` varchar(255) DEFAULT NULL,
  `da_doc` tinyint(1) DEFAULT '0',
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thong_bao_id`),
  KEY `fk_tb_user` (`user_id`),
  CONSTRAINT `fk_tb_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_bao`
--

LOCK TABLES `thong_bao` WRITE;
/*!40000 ALTER TABLE `thong_bao` DISABLE KEYS */;
INSERT INTO `thong_bao` VALUES (1,1,'Đơn hàng đã được xác nhận','Đơn hàng #123 của bạn đã được cửa hàng xác nhận.','DON_HANG','/don-hang/123',1,'2025-12-21 15:52:52');
/*!40000 ALTER TABLE `thong_bao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thu_cung`
--

DROP TABLE IF EXISTS `thu_cung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thu_cung` (
  `thu_cung_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ten_thu_cung` varchar(100) NOT NULL,
  `chung_loai` varchar(50) DEFAULT NULL,
  `giong_loai` varchar(100) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` varchar(10) DEFAULT NULL,
  `can_nang` decimal(5,2) DEFAULT NULL,
  `ghi_chu_suc_khoe` text,
  `hinh_anh` text,
  `is_active` bit(1) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `da_xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`thu_cung_id`),
  KEY `fk_thucung_user` (`user_id`),
  CONSTRAINT `fk_thucung_user` FOREIGN KEY (`user_id`) REFERENCES `nguoi_dung` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thu_cung`
--

LOCK TABLES `thu_cung` WRITE;
/*!40000 ALTER TABLE `thu_cung` DISABLE KEYS */;
INSERT INTO `thu_cung` VALUES (1,1,'Milu','Chó','Poodlee','2023-05-12','Đực',5.50,'Đã tiêm phòng dại, sức khỏe tốt','338664ae-4429-412c-a7aa-82ad694bd525.jpg',NULL,NULL,'2025-12-26 11:10:13.984905','2025-12-26 04:03:46',NULL),(2,1,'Luna','Mèo','ALN','2025-12-18','Cái',3.00,'Bình thường','9bde0fb8-a025-4a8b-ba44-c1ae55ad426c.jpg',NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(3,3,'Max','Chó','Corgi',NULL,'Đực',9.10,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(4,4,'Tom','Mèo','Ba tư',NULL,'Đực',4.00,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(5,5,'Kiki','Chó','Chihuahua',NULL,'Cái',2.30,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(6,6,'Leo','Mèo','Munchkin',NULL,'Đực',3.20,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(7,7,'Bella','Chó','Golden',NULL,'Cái',18.50,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(8,8,'Nana','Mèo','Xiêm',NULL,'Cái',3.50,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(9,9,'Rocky','Chó','Bulldog',NULL,'Đực',20.00,NULL,NULL,NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(10,10,'Mimi','Mèo','ALN',NULL,'Cái',3.00,'','18d92af8-5950-4b00-b408-f78644cdc508.jpg',NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(12,1,'Ech','Chim','Chim','2025-12-01','Đực',2.50,'tốt','b8319cc6-d5fe-483a-8b2c-5003110f9779.jpg',NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(13,1,'Mimi','Mèo','Anh lông ngắn','2023-01-01','Cái',3.60,'Đã tiêm phòng đầy đủ','e7e61003-dab4-4172-ab73-f22e69b897cb.jpg',NULL,NULL,NULL,'2025-12-26 04:03:46',NULL),(14,1,'Kem','Chó','',NULL,'Đực',NULL,'','5e271f82-baa9-4c80-8690-a65b930fe132.jpg',NULL,NULL,NULL,'2026-01-16 08:38:39',NULL),(20,12,'kiki',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-24 03:30:12',NULL),(24,12,'Miki',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-24 04:22:04',NULL),(28,28,'miamia','Chó',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-02-05 12:23:04',NULL);
/*!40000 ALTER TABLE `thu_cung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tin_nhan`
--

DROP TABLE IF EXISTS `tin_nhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tin_nhan` (
  `tin_nhan_id` int NOT NULL AUTO_INCREMENT,
  `phong_chat_id` int NOT NULL,
  `nguoi_gui_id` int NOT NULL,
  `loai_nguoi_gui` enum('KHACH','NHAN_VIEN') NOT NULL,
  `noi_dung` text NOT NULL,
  `thoi_gian` datetime DEFAULT CURRENT_TIMESTAMP,
  `da_xem` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`tin_nhan_id`),
  KEY `fk_tn_phong` (`phong_chat_id`),
  CONSTRAINT `fk_tn_phong` FOREIGN KEY (`phong_chat_id`) REFERENCES `phong_chat` (`phong_chat_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tin_nhan`
--

LOCK TABLES `tin_nhan` WRITE;
/*!40000 ALTER TABLE `tin_nhan` DISABLE KEYS */;
INSERT INTO `tin_nhan` VALUES (1,1,3,'KHACH','Bác sĩ ơi cho em hỏi mèo 2 tháng tiêm được chưa?','2025-12-21 12:45:35',0),(2,1,2,'NHAN_VIEN','Chào bạn, mèo 2 tháng bắt đầu tiêm mũi 1 được rồi nhé.','2025-12-21 12:45:35',0);
/*!40000 ALTER TABLE `tin_nhan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-09 13:18:41
