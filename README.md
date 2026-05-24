<div align="center">

# Trần Anh Đức — Digital Portfolio

**Portfolio kỹ thuật số tổng kết hành trình 7 bài học Năng lực số, AI và liêm chính học thuật**

[![Live Demo](https://img.shields.io/badge/Live_Demo-anhduc.kieranlucas--work.workers.dev-0A66C2?style=for-the-badge&logo=cloudflare&logoColor=white)](https://anhduc.kieranlucas-work.workers.dev/)

[![Astro](https://img.shields.io/badge/Built_with-Astro_6-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Language](https://img.shields.io/badge/Language-Vietnamese-DA251D?style=flat-square)](#)
[![Status](https://img.shields.io/badge/Status-Production-22C55E?style=flat-square)](https://anhduc.kieranlucas-work.workers.dev/)

</div>

---

> **🌐 Sản phẩm cuối:** **<https://anhduc.kieranlucas-work.workers.dev/>**
>
> Bản triển khai production trên Cloudflare Workers — đây là phiên bản chính thức của portfolio.

---

## 📖 Giới thiệu

Portfolio kỹ thuật số một trang (one-page) tổng hợp **7 artifact** thực hành về Năng lực số, ứng dụng AI và liêm chính học thuật của sinh viên **Trần Anh Đức** — Khoa học máy tính, UET (Đại học Công nghệ — ĐHQGHN).

Giao diện được thiết kế theo phong cách *blue liquid glass*, kết hợp ngôn ngữ thiết kế docs-style và coding vibe, tối ưu cho trải nghiệm cuộn mượt, đọc lướt và truy cập tài liệu PDF gốc.

### Thông tin sinh viên

| | |
| --- | --- |
| **Họ và tên** | Trần Anh Đức |
| **MSSV** | `25021739` |
| **Lớp** | UET.A11 |
| **Ngành** | Khoa học máy tính |
| **Trường** | Đại học Công nghệ — ĐHQGHN |

---

## ✨ Điểm nổi bật

- **One-page portfolio** với điều hướng cố định, anchor scroll mượt, transition tinh tế
- **7 artifact** kèm PDF gốc, bảng đối chiếu rubric và phần reflection cá nhân
- **Hero section** sống động với hiệu ứng aurora, liquid glass và hero title sweep
- **Responsive** trên mọi kích thước màn hình, typography Lexend self-hosted
- **Performance-first**: Astro static output, asset tối ưu, tải nhanh trên Cloudflare edge

---

## 🛠 Tech Stack

| Tầng | Công nghệ |
| --- | --- |
| **Framework** | [Astro](https://astro.build/) `^6.3.7` |
| **Ngôn ngữ** | HTML5 · CSS3 · JavaScript (ES Modules) |
| **Typography** | [Lexend](https://fonts.google.com/specimen/Lexend) (self-hosted, 8 weights) |
| **Hosting** | [Cloudflare Workers](https://workers.cloudflare.com/) |
| **CI/CD** | GitHub Actions (`.github/workflows/`) |
| **Quản lý gói** | npm |

---

## 🚀 Bắt đầu

### Yêu cầu

- **Node.js** `>= 18`
- **npm** `>= 9`

### Cài đặt

```bash
# Clone repository
git clone https://github.com/kieran-lucas/tran-anh-duc-digital-portfolio.git
cd tran-anh-duc-digital-portfolio

# Cài đặt phụ thuộc
npm install
```

### Chạy môi trường phát triển

```bash
npm run dev
```

Server dev khởi động tại **`http://localhost:4321`** với hot module reload.

### Build production

```bash
npm run build      # Output ra thư mục dist/
npm run preview    # Preview bản build tĩnh trên local
```

---

## 📁 Cấu trúc dự án

```
tran-anh-duc-digital-portfolio/
├── src/
│   └── pages/
│       └── index.astro          # Trang portfolio chính (one-page)
├── public/
│   ├── assets/                  # Avatar, ảnh tối ưu (WebP/PNG)
│   ├── fonts/                   # Lexend font self-hosted
│   ├── pdfs/                    # PDF gốc của 7 bài (bai1.pdf → bai7.pdf)
│   ├── portfolio-runtime.js     # Runtime tương tác chính
│   ├── premium-interactions.*   # Hiệu ứng hover & motion premium
│   └── reflection-*.css         # Hiệu ứng aurora cho reflection section
├── .github/
│   └── workflows/               # GitHub Actions cho các patch UI
├── astro.config.mjs             # Cấu hình Astro
└── package.json
```

---

## 📚 Nội dung — 7 Artifact

| Bài | Chủ đề | Trọng tâm | PDF |
| :---: | --- | --- | :---: |
| **01** | File System | Quản lý tệp & thư mục trên Windows | [`bai1.pdf`](public/pdfs/bai1.pdf) |
| **02** | Academic Search | Tìm kiếm & đánh giá thông tin học thuật về AI trong an ninh mạng | [`bai2.pdf`](public/pdfs/bai2.pdf) |
| **03** | Prompt Engineering | Viết prompt hiệu quả cho mô hình ngôn ngữ lớn | [`bai3.pdf`](public/pdfs/bai3.pdf) |
| **04** | Collaboration | Công cụ hợp tác trực tuyến cho dự án nhóm | [`bai4.pdf`](public/pdfs/bai4.pdf) |
| **05** | Creative AI | Sử dụng AI tạo sinh trong sáng tạo nội dung số | [`bai5.pdf`](public/pdfs/bai5.pdf) |
| **06** | Responsible AI | Sử dụng AI có trách nhiệm trong học tập & nghiên cứu | [`bai6.pdf`](public/pdfs/bai6.pdf) |
| **07** | AI Literature Review | Tổng quan tài liệu với Elicit / Consensus | [`bai7.pdf`](public/pdfs/bai7.pdf) |

> Mỗi artifact đi kèm phần *summary*, *insight*, danh sách công cụ và link mở PDF gốc trên giao diện portfolio.

---

## 🌍 Triển khai

Production hiện tại được phục vụ qua **Cloudflare Workers** tại:

> **🔗 <https://anhduc.kieranlucas-work.workers.dev/>**

Dự án xuất static output nên tương thích với mọi nền tảng hosting tĩnh. Một số cấu hình tham khảo:

<details>
<summary><b>Vercel</b></summary>

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`

</details>

<details>
<summary><b>Netlify</b></summary>

- Build command: `npm run build`
- Publish directory: `dist`

</details>

<details>
<summary><b>GitHub Pages / Cloudflare Pages</b></summary>

- Build command: `npm run build`
- Output: `dist/`

</details>

---

## 👤 Tác giả

**Trần Anh Đức**

- Sinh viên Khoa học máy tính — UET, ĐHQGHN
- Lớp UET.A11 · MSSV `25021739`

---

## 📄 Bản quyền

Nội dung học thuật và bài làm © **Trần Anh Đức**. Mã nguồn portfolio được công khai phục vụ mục đích học tập và trình bày năng lực cá nhân.

<div align="center">

---

*Made with ❤️ using [Astro](https://astro.build/) · Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)*

</div>
