# Hướng dẫn lấy Entry IDs từ Google Form

## Bước 1: Mở Google Form ở chế độ xem trước
1. Vào Google Form của bạn (chế độ chỉnh sửa)
2. Click nút **"Xem trước"** (Preview) ở góc trên bên phải
3. Form sẽ mở trong tab mới

## Bước 2: Mở Developer Tools
1. Nhấn **F12** hoặc **Ctrl + Shift + I** (Windows)
2. Chọn tab **"Network"** (Mạng)

## Bước 3: Submit form thử
1. Điền thông tin vào form (bất kỳ)
2. Click **"Gửi"** (Submit)
3. Trong tab Network, tìm request có tên **"formResponse"**

## Bước 4: Xem Entry IDs
1. Click vào request **"formResponse"**
2. Chọn tab **"Payload"** hoặc **"Form Data"**
3. Bạn sẽ thấy các entry như:
   ```
   entry.1464633397: Tên bé
   entry.122853608_year: 2020
   entry.122853608_month: 5
   entry.122853608_day: 15
   entry.61252524: Tên phụ huynh
   entry.361457323: 0909123456
   ```

## Bước 5: So sánh với code hiện tại
Các Entry IDs trong code hiện tại:
- `entry.1464633397` → Họ và tên bé
- `entry.122853608_year/month/day` → Năm sinh
- `entry.61252524` → Họ tên phụ huynh
- `entry.361457323` → Số điện thoại

**Nếu Entry IDs không khớp → Cần cập nhật lại trong file `index.html`**

## Lưu ý quan trọng
- Mỗi lần bạn **xóa và tạo lại trường** trong Google Form, Entry ID sẽ **thay đổi**
- Nếu bạn **chỉnh sửa câu hỏi** (không xóa trường), Entry ID **không đổi**
