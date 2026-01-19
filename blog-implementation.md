# 📚 Kế hoạch triển khai Blog "Góc Sáng Tạo"

## 🎯 Mục tiêu
Tích hợp phần Blog vào Landing Page hiện tại với giao diện phong cách **Studio Ghibli/Whimsical**, đồng bộ với Brand DNA đã xác định. Blog sẽ phục vụ các mục đích:
- Chia sẻ bí kíp vẽ tranh cho các bé
- Giới thiệu các họa sĩ nhí nổi bật
- Đăng tin tức và hoạt động của cuộc thi

---

## 📁 Cấu trúc thư mục đề xuất

```
Landing_Page/
├── index.html              # Trang chủ (đã có)
├── blog.html               # ★ Trang danh sách bài viết (MỚI)
├── blog-post.html          # ★ Template trang chi tiết bài viết (MỚI)
├── style.css               # CSS chính (sẽ bổ sung CSS cho Blog)
├── blog.css                # ★ CSS riêng cho Blog (MỚI)
├── blog/                   # ★ Thư mục chứa ảnh và nội dung Blog (MỚI)
│   ├── thumbnails/         # Ảnh thumbnail cho bài viết
│   └── posts/              # Nội dung bài viết (nếu cần tách file)
└── ...
```

---

## 🎨 Thiết kế giao diện (Dựa trên Mockup đã duyệt)

### 1. Trang danh sách Blog (`blog.html`)

| Thành phần | Mô tả |
|------------|-------|
| **Header** | Kế thừa Navbar từ `index.html` (thêm link "Blog" vào menu) |
| **Hero nhỏ** | Banner với tiêu đề "Góc Sáng Tạo 🎨" + slogan ngắn |
| **Blog Grid** | Lưới 3 cột (desktop), 1 cột (mobile) |
| **Blog Card** | Thumbnail + Title + Mô tả ngắn + Nút "Xem thêm" |
| **Footer** | Kế thừa từ `index.html` |

### 2. Trang chi tiết bài viết (`blog-post.html`)

| Thành phần | Mô tả |
|------------|-------|
| **Breadcrumb** | Trang chủ > Góc Sáng Tạo > [Tên bài viết] |
| **Featured Image** | Ảnh đại diện bài viết (full-width) |
| **Title + Meta** | Tiêu đề H1 + Ngày đăng + Tác giả |
| **Content** | Nội dung bài viết (H2, H3, hình ảnh, danh sách) |
| **CTA** | Nút "Đăng ký tham gia" liên kết về section Register |
| **Related Posts** | 3 bài viết liên quan |

---

## ✅ Danh sách công việc

### Phase 1: Chuẩn bị cấu trúc ✅ HOÀN THÀNH
- [x] Tạo thư mục `blog/thumbnails/` → Xác nhận: Thư mục tồn tại
- [x] Thêm link "Góc Sáng Tạo" vào Navbar trong `index.html` → Xác nhận: Link `/blog.html` hoạt động

### Phase 2: Xây dựng trang Blog Grid ✅ HOÀN THÀNH
- [x] Tạo file `blog.html` với cấu trúc:
  - Navbar (copy từ index.html)
  - Hero nhỏ với tiêu đề
  - Grid các Blog Card (3 bài mẫu)
  - Footer (copy từ index.html)
  → Xác nhận: Mở file, hiển thị đúng 3 thẻ bài viết

- [x] Tạo file `blog.css` với:
  - Biến CSS từ `:root` của `style.css`
  - Styles cho `.blog-hero`, `.blog-grid`, `.blog-card`
  - Hiệu ứng hover (scale, shadow)
  - Responsive (1 cột trên mobile)
  → Xác nhận: Hover vào card thấy hiệu ứng, thu nhỏ màn hình thấy 1 cột

### Phase 3: Xây dựng trang chi tiết bài viết ✅ HOÀN THÀNH
- [x] Tạo file `blog-post-1.html` với:
  - Breadcrumb
  - Featured Image
  - Article content section
  - Related posts section
  → Xác nhận: Nội dung hiển thị đúng cấu trúc Heading H1 > H2 > H3

### Phase 4: Tối ưu SEO & GEO ✅ HOÀN THÀNH
- [x] Thêm meta tags cho `blog.html` và `blog-post-1.html`:
  - `<title>` với từ khóa chính
  - `<meta name="description">` cho featured snippet
  - Schema.org `Article` markup (JSON-LD)
  → Xác nhận: Test bằng Google Rich Results Test

### Phase 5: Verification
- [x] Kiểm tra responsive trên mobile (Chrome DevTools)
- [x] Chạy Lighthouse để đảm bảo Performance > 90
- [x] Kiểm tra tất cả link hoạt động

---

## 🎨 Bảng màu & Font (từ DNA.md)

| Thuộc tính | Giá trị | Mục đích |
|------------|---------|----------|
| Primary | `#228B22` | Tiêu đề bài viết |
| Secondary | `#1E4E79` | Nội dung text |
| Accent | `#E67E22` | Nút "Xem thêm", tag |
| Background | `#FFFBE6` | Nền Blog Grid |
| Font Tiêu đề | `Baloo 2` | Tiêu đề H1, H2 |
| Font Nội dung | `Nunito` | Body text |

---

## 📝 Nội dung mẫu cho 3 bài viết đầu tiên

### Bài 1: "Bí kíp vẽ tranh phong cảnh mùa xuân"
- Thumbnail: Hình minh họa vẽ tay phong cảnh
- Mô tả: Hướng dẫn các bé cách phối màu cho bầu trời và cây cối mùa xuân

### Bài 2: "Gặp gỡ họa sĩ nhí An An"
- Thumbnail: Ảnh bé An An và tác phẩm
- Mô tả: Câu chuyện về niềm đam mê vẽ tranh của bé An An (7 tuổi)

### Bài 3: "Ngày hội sáng tạo sắc màu"
- Thumbnail: Hình ảnh hoạt động cuộc thi năm trước
- Mô tả: Nhìn lại những khoảnh khắc đáng nhớ của cuộc thi năm 2025

---

## ⏰ Thời gian ước tính

| Giai đoạn | Thời gian |
|-----------|-----------|
| Phase 1 | 10 phút |
| Phase 2 | 30 phút |
| Phase 3 | 25 phút |
| Phase 4 | 15 phút |
| Phase 5 | 10 phút |
| **Tổng** | **~90 phút** |

---

## 📋 Ghi chú
- Tất cả hình ảnh thumbnail sẽ được tạo bằng công cụ AI hoặc sử dụng ảnh watercolor stock
- Nội dung bài viết mẫu sẽ được viết để đảm bảo chuẩn SEO/GEO
- Có thể mở rộng thêm tính năng "Danh mục" (Categories) trong tương lai
