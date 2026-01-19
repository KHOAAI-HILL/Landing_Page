#!/usr/bin/env python3
"""
Script chuyển đổi ảnh JPG sang WebP để tối ưu tốc độ tải trang
"""
import os
from pathlib import Path
from PIL import Image

def convert_jpg_to_webp(input_path, output_path=None, quality=85):
    """
    Chuyển đổi ảnh JPG sang WebP
    
    Args:
        input_path: Đường dẫn file JPG
        output_path: Đường dẫn file WebP (nếu None, sẽ tự động tạo)
        quality: Chất lượng ảnh (0-100), mặc định 85
    """
    try:
        # Mở ảnh JPG
        img = Image.open(input_path)
        
        # Tạo đường dẫn output nếu chưa có
        if output_path is None:
            output_path = str(input_path).replace('.jpg', '.webp').replace('.JPG', '.webp')
        
        # Chuyển đổi và lưu
        img.save(output_path, 'webp', quality=quality, method=6)
        
        # Lấy kích thước file
        original_size = os.path.getsize(input_path)
        webp_size = os.path.getsize(output_path)
        saved_percent = ((original_size - webp_size) / original_size) * 100
        
        print(f"✓ {Path(input_path).name} → {Path(output_path).name}")
        print(f"  Giảm: {saved_percent:.1f}% ({original_size:,} → {webp_size:,} bytes)")
        
        return True
    except Exception as e:
        print(f"✗ Lỗi khi chuyển đổi {input_path}: {e}")
        return False

def main():
    """Chuyển đổi tất cả ảnh JPG trong thư mục hiện tại"""
    # Lấy thư mục gốc của project
    project_root = Path(__file__).parent.parent
    
    print("=" * 60)
    print("CHUYỂN ĐỔI ẢNH JPG → WEBP")
    print("=" * 60)
    print(f"Thư mục: {project_root}")
    print()
    
    # Tìm tất cả file JPG
    jpg_files = list(project_root.glob('*.jpg')) + list(project_root.glob('**/*.jpg'))
    jpg_files = [f for f in jpg_files if f.is_file()]
    
    if not jpg_files:
        print("Không tìm thấy file JPG nào!")
        return
    
    print(f"Tìm thấy {len(jpg_files)} file JPG")
    print()
    
    # Chuyển đổi từng file
    success_count = 0
    total_original_size = 0
    total_webp_size = 0
    
    for jpg_file in jpg_files:
        if convert_jpg_to_webp(jpg_file):
            success_count += 1
            total_original_size += os.path.getsize(jpg_file)
            webp_file = str(jpg_file).replace('.jpg', '.webp')
            total_webp_size += os.path.getsize(webp_file)
        print()
    
    # Tổng kết
    print("=" * 60)
    print(f"Hoàn thành: {success_count}/{len(jpg_files)} file")
    if total_original_size > 0:
        total_saved = ((total_original_size - total_webp_size) / total_original_size) * 100
        print(f"Tổng dung lượng giảm: {total_saved:.1f}%")
        print(f"  JPG:  {total_original_size / 1024 / 1024:.2f} MB")
        print(f"  WebP: {total_webp_size / 1024 / 1024:.2f} MB")
        print(f"  Tiết kiệm: {(total_original_size - total_webp_size) / 1024 / 1024:.2f} MB")
    print("=" * 60)

if __name__ == "__main__":
    main()
