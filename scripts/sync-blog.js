const { Client } = require("@notionhq/client");
const fs = require('fs');
const path = require('path');

// CẤU HÌNH
const NOTION_DATABASE_ID = '2ed27420-a792-8054-a1fa-e0ffd6828003';
// Nếu chạy local, hãy đảm bảo biến môi trường NOTION_API_KEY đã được thiết lập
const API_KEY = process.env.NOTION_API_KEY;

const notion = new Client({ auth: API_KEY });

// Thư mục output
const BLOG_POSTS_DIR = path.join(__dirname, '../blog-posts');
const BLOG_HTML_PATH = path.join(__dirname, '../blog.html');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(BLOG_POSTS_DIR)) {
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
}

async function getBlogPosts() {
    console.log('🔄 Đang đồng bộ dữ liệu từ Notion...');

    try {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            filter: {
                property: 'Status',
                select: {
                    equals: 'Published',
                },
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });

        const posts = [];

        for (const page of response.results) {
            const props = page.properties;
            const title = props.Name.title[0]?.plain_text || 'Không có tiêu đề';
            const slug = props.Slug.rich_text[0]?.plain_text || page.id;

            // Lấy nội dung chi tiết (blocks) của bài viết
            const blocks = await notion.blocks.children.list({ block_id: page.id });
            const contentHtml = await renderBlocksToHtml(blocks.results);

            posts.push({
                id: page.id,
                title: title,
                category: props.Category.select?.name || 'Chưa phân loại',
                categorySlug: getCategorySlug(props.Category.select?.name),
                slug: slug,
                description: props.Description.rich_text[0]?.plain_text || '',
                thumbnail: props.Thumbnail.rich_text[0]?.plain_text || props.Thumbnail.url || '../blog/thumbnails/thumbnail-1.png',
                date: props.Date.date?.start || new Date().toISOString().split('T')[0],
                author: 'BTC',
                content: contentHtml
            });
        }

        console.log(`✅ Tìm thấy ${posts.length} bài viết đã xuất bản.`);

        // 1. Tạo file chi tiết cho từng bài viết
        generatePostFiles(posts);

        // 2. Cập nhật trang chủ blog.html (nếu có bài viết mới)
        if (posts.length > 0) {
            // Lưu ý: Logic cập nhật blog.html phức tạp hơn (parse HTML -> inject), 
            // ở phiên bản này ta sẽ log ra bài viết mới để kiểm tra trước.
            console.log('📝 Danh sách bài viết:', posts.map(p => p.title));
        }

        return posts;

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
        return [];
    }
}

// Hàm render Notion Blocks sang HTML
async function renderBlocksToHtml(blocks) {
    let html = '';
    for (const block of blocks) {
        switch (block.type) {
            case 'paragraph':
                const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
                if (text) html += `<p>${text}</p>`;
                break;
            case 'heading_1':
                html += `<h2>${block.heading_1.rich_text[0]?.plain_text || ''}</h2>`;
                break;
            case 'heading_2':
                html += `<h3>${block.heading_2.rich_text[0]?.plain_text || ''}</h3>`;
                break;
            case 'heading_3':
                html += `<h4>${block.heading_3.rich_text[0]?.plain_text || ''}</h4>`;
                break;
            case 'bulleted_list_item':
                html += `<ul><li>${block.bulleted_list_item.rich_text[0]?.plain_text || ''}</li></ul>`;
                break;
            case 'numbered_list_item':
                html += `<ol><li>${block.numbered_list_item.rich_text[0]?.plain_text || ''}</li></ol>`;
                break;
            case 'image':
                const src = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
                const caption = block.image.caption[0]?.plain_text || '';
                html += `<figure><img src="${src}" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;
                break;
            case 'quote':
                html += `<blockquote>${block.quote.rich_text[0]?.plain_text || ''}</blockquote>`;
                break;
        }
    }
    return html;
}

// Hàm tạo file HTML chi tiết
function generatePostFiles(posts) {
    const templatePath = path.join(__dirname, 'post-template.html'); // Chúng ta sẽ tạo file này
    // Hoặc dùng template string đơn giản

    posts.forEach(post => {
        const fileName = `${post.slug}.html`;
        const filePath = path.join(BLOG_POSTS_DIR, fileName);

        const fileContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- SEO Meta Tags -->
    <title>${post.title} | Góc Sáng Tạo - Cành Cọ Mùa Xuân</title>
    <meta name="description" content="${post.description}">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../blog.css">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" style="background: linear-gradient(to bottom, rgba(34, 139, 34, 0.95), rgba(34, 139, 34, 0.8));">
        <a href="../index.html" class="logo">Cành Cọ Mùa Xuân</a>
        <ul class="nav-links">
            <li><a href="../blog.html">Góc Sáng Tạo</a></li>
            <li><a href="../index.html#register" class="nav-cta">Đăng ký ngay</a></li>
        </ul>
    </nav>

    <!-- Post Detail -->
    <article class="post-detail">
        <div class="container">
            <div class="breadcrumb">
                <a href="../index.html">Trang chủ</a> / <a href="../blog.html">Góc Sáng Tạo</a> / <span>${post.title}</span>
            </div>

            <header class="post-header">
                <span class="blog-card-tag">${post.category}</span>
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    <span>📅 ${post.date}</span>
                    <span>✏️ ${post.author}</span>
                </div>
            </header>

            <div class="post-featured-image">
                <img src="${post.thumbnail}" alt="${post.title}">
            </div>

            <div class="post-content">
                ${post.content}
            </div>
            
            <div class="post-navigation">
                <a href="../blog.html" class="back-link">← Quay lại danh sách bài viết</a>
            </div>
        </div>
    </article>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>© 2026 Hội thi Cành Cọ Mùa Xuân. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
        `;

        fs.writeFileSync(filePath, fileContent);
        console.log(`✨ Đã tạo bài viết: ${fileName}`);
    });
}

// Helper: Chuyển tên category sang slug
function getCategorySlug(name) {
    if (!name) return 'other';
    const map = {
        'Hướng dẫn': 'huong-dan',
        'Họa sĩ nhí': 'hoa-si-nhi',
        'Sự kiện': 'su-kien',
        'Giải thưởng': 'giai-thuong'
    };
    return map[name] || 'other';
}

// Execute
if (require.main === module) {
    getBlogPosts();
} else {
    module.exports = { getBlogPosts };
}
