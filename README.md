# FoodRecipeBlog

## Giới thiệu

- Blog chia sẻ công thức nấu ăn với tính năng đăng ký/đăng nhập, đăng bài công thức (recipe), phân loại (category), bình luận (comment), đánh dấu yêu thích (favorite) và xem chi tiết.
- Kiến trúc tách riêng Backend (Node.js/Express + MongoDB) và Frontend (React + Vite), giao tiếp qua API REST.

## Kiến trúc & Thư mục

- Backend: [backend/](backend/) — API Express, xác thực JWT, kết nối MongoDB, CORS cấu hình cho frontend.
- Frontend: [FoodRecipeBlog/](FoodRecipeBlog/) — React + Vite, gọi API tại `http://localhost:5000/api`.
- Cổng mặc định:
  - Backend: 5000
  - Frontend (Vite dev): 5173

## Yêu cầu môi trường

- Node.js ≥ 18 (khuyến nghị 18 LTS hoặc 20 LTS).
- npm (đi kèm Node.js).
- Tài khoản/Cluster MongoDB (MongoDB Atlas hoặc instance cục bộ).

## Biến môi trường Backend

Backend nạp biến môi trường từ file `.env` theo `NODE_ENV` tại [backend/config/](backend/config):

- `backend/config/.env.development` (đã có sẵn) ví dụ:

```
NODE_ENV=development
PORT=5000
HOST=localhost
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET=<chuoi_bi_mat>
```

Bạn có thể tạo thêm `backend/config/.env.production` cho chạy production (giá trị tương tự nhưng phù hợp môi trường triển khai).

## Cài đặt & chạy Backend

1. Mở terminal tại thư mục [backend/](backend/)
2. Cài dependencies:

```bash
npm install
```

3. Chạy chế độ phát triển (hot reload qua `nodemon`):

```bash
npm run dev:hot
```

4. API sẽ chạy tại `http://localhost:5000/api`

Chạy kiểm thử và build:

```bash
# Kiểm thử (Vitest)
npm test

# Kiểm tra kiểu TypeScript
npm run type-check

# Build sản phẩm
npm run build

# Chạy production (yêu cầu tạo .env.production nếu cần)
npm run start
```

Lưu ý Windows: script `clean-install` dùng `rm` (Unix). Nếu cần dọn `node_modules` trên Windows, hãy xóa thủ công thư mục `node_modules` và file `package-lock.json`, sau đó chạy `npm install`.

## Cài đặt & chạy Frontend

1. Mở terminal tại thư mục [FoodRecipeBlog/](FoodRecipeBlog/)
2. Cài dependencies:

```bash
npm install
```

3. Chạy chế độ phát triển:

```bash
npm run dev
```

4. Mở trình duyệt tại `http://localhost:5173`

Build và xem trước:

```bash
# Build production
npm run build

# Xem trước bản build
npm run preview
```

## Tích hợp Frontend ↔ Backend

- Frontend dùng `API_URL = "http://localhost:5000/api"` (xem [FoodRecipeBlog/src/services/authService.js](FoodRecipeBlog/src/services/authService.js)).
- Đảm bảo Backend chạy trước để Frontend gọi API thành công.
- CORS đã cấu hình cho `http://localhost:5173` trong backend (xem [backend/src/server.ts](backend/src/server.ts)).

## Khắc phục sự cố

- Không thể kết nối MongoDB: kiểm tra `MONGO_URI` đúng định dạng và mạng cho phép truy cập.
- Lỗi CORS: đảm bảo chạy frontend tại `http://localhost:5173` hoặc cập nhật `allowedOrigin` trong backend nếu thay đổi cổng.
- Token/JWT lỗi: kiểm tra `JWT_SECRET` giữa các môi trường nhất quán.
- Port đã dùng: đổi `PORT` trong `.env` hoặc dừng tiến trình chiếm port.

## Gợi ý quy trình phát triển

- Mở 2 terminal:
  - Terminal 1 (backend): `npm run dev:hot` tại thư mục backend.
  - Terminal 2 (frontend): `npm run dev` tại thư mục FoodRecipeBlog.
- Sửa code và kiểm thử từng phần; commit thường xuyên.

## Giấy phép

- Mục đích học tập và tham khảo. Vui lòng không chia sẻ thông tin nhạy cảm trong `.env` công khai.
