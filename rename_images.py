
import os
import re

folder_path = r'c:\Users\PC\OneDrive\Desktop\canh_co_mua_xuan\Landing_Page\anh-1'

# Get all files, sort them to ensure 000 comes before 001
files = sorted([f for f in os.listdir(folder_path) if f.endswith('.jpg')])

for i, filename in enumerate(files):
    # New name: 1.jpg, 2.jpg, ...
    new_name = f"{i+1}.jpg"
    src = os.path.join(folder_path, filename)
    dst = os.path.join(folder_path, new_name)
    
    # Rename
    os.rename(src, dst)
    print(f"Renamed {filename} -> {new_name}")
