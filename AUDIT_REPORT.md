# BÁO CÁO KIỂM TRA & TỐI ƯU WEBSITE (AUDIT REPORT)
**Dự án:** Landing Page - Hội thi vẽ tranh "Cành Cọ Mùa Xuân"
**Ngày thực hiện:** 19/01/2026
**Người thực hiện:** Antigravity (Orchestrator Agent)

---

## 1. TỔNG QUAN TÌNH TRẠNG (BEFORE)

### 🔴 SEO & Social Sharing (Nghiêm trọng)
- **Meta Description**: ❌ Thiếu. Google sẽ không hiển thị mô tả hấp dẫn trên kết quả tìm kiếm.
- **Open Graph (Facebook/Zalo)**: ❌ Thiếu. Khi chia sẻ link, sẽ không hiện thumbnail, tiêu đề hay mô tả chuẩn.
- **Favicon**: ❌ Thiếu. Tab trình duyệt hiển thị icon mặc định (trông thiếu chuyên nghiệp).
- **Thẻ Alt hình ảnh**: ⚠️ Có nhưng trùng lặp (`Hoạt động hội thi`). Google coi đây là spam từ khóa hoặc không hữu ích.

### 🟡 Hiệu năng (Cần cải thiện)
- **Định dạng ảnh**: ⚠️ Đang dùng JPG/PNG. Chưa tối ưu sang WebP (định dạng thế hệ mới, nhẹ hơn 30-50%).
- **Lazy Loading**: ✅ Đã có `loading="lazy"` cho ảnh thư viện. Tốt.

### 🟡 Trải nghiệm người dùng (UX) & Code
- **Form đăng ký**: ⚠️ Submit qua Google Form bằng `hidden iframe`. Cách này thô sơ, phản hồi chậm (hardcode 1.5s) và phụ thuộc vào Google.
- **Nút điều hướng**: ⚠️ Thiếu nút "Back to Top" cho trang dài.
- **Accessibility**: ⚠️ Menu mobile thiếu `aria-label` cho các thiết bị hỗ trợ người khiếm thị.

---

## 2. KẾ HOẠCH TRIỂN KHAI (GÓI TIÊU CHUẨN)

Tôi sẽ thực hiện ngay các thay đổi sau để đưa website đạt chuẩn cơ bản:

### A. Tối ưu SEO & Meta Tags
1.  Thêm thẻ `<meta name="description">` chuẩn SEO (150-160 ký tự).
2.  Thêm bộ thẻ Open Graph (`og:title`, `og:image`, `og:description`...) để chia sẻ đẹp trên MXH.
3.  Thêm thẻ Canonical URL để tránh lỗi trùng lặp nội dung.

### B. Cải thiện Accessibility & Semantics
1.  Cập nhật `alt` text cho từng ảnh trong thư viện (Mô tả cụ thể hơn).
2.  Thêm `aria-label` cho nút menu mobile.
3.  Thêm `rel="noopener noreferrer"` cho các link trỏ ra ngoài (Facebook) để bảo mật & hiệu năng.

### C. Giao diện (Minor Tweaks)
1.  Thêm Placeholder cho Favicon (dùng Emoji tạm thời hoặc link logo nếu có).

---

## 3. KHUYẾN NGHỊ NÂNG CAO (GIAI ĐOẠN 2)
*Các hạng mục này cần nhiều thời gian hơn hoặc thay đổi cấu trúc, bạn nên cân nhắc sau:*

1.  **Chuyển đổi ảnh sang WebP**: Dùng tool để convert toàn bộ ảnh 1.jpg -> 10.jpg sang .webp.
2.  **Nâng cấp Form**: Chuyển sang dùng **Netlify Forms** (nếu host trên Netlify) hoặc một dịch vụ form backend thực thụ để đảm bảo dữ liệu không bị mất.
3.  **Tích hợp Google Analytics**: Để đo lường lượt truy cập.

---

**Trạng thái:** ⏳ Đang triển khai mục (2)...
