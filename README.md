# LapZone (LaptopZone) — Hệ Thống Thương Mại Điện Tử Laptop & Phụ Kiện

> **Học phần:** FER202 (Front-End Web Development with React)  
> **Nhóm thực hiện:** Group 3 (`LapZone-GR3`)

---

## Mục Lục
1. [Ý Tưởng Ứng Dụng](#1-ý-tưởng-ứng-dụng)
2. [Hướng Dẫn Cài Đặt & Chạy Dự Án](#2-hướng-dẫn-cài-đặt--chạy-dự-án)
3. [Ánh Xạ Chuẩn Đầu Ra (LO1 – LO8)](#3-ánh-xạ-chuẩn-đầu-ra-lo1--lo8)
4. [Bảng Đóng Góp Thành Viên](#4-bảng-đóng-góp-thành-viên)
5. [Danh Sách Tài Liệu & Công Cụ AI Đã Dùng](#5-danh-sách-tài-liệu--công-cụ-ai-đã-dùng)

---

## 1. Ý Tưởng Ứng Dụng

### 1.1. Bối cảnh & Mục tiêu
**LapZone (LaptopZone)** là ứng dụng web Single Page Application (SPA) mô phỏng hệ thống thương mại điện tử chuyên kinh doanh **Laptop** (Gaming, Văn phòng, Đồ họa, Mỏng nhẹ) và **Phụ kiện công nghệ**. Ứng dụng được thiết kế nhằm mang lại trải nghiệm tìm kiếm, so sánh thông số kỹ thuật và đặt mua laptop trực quan, nhanh chóng cho khách hàng, đồng thời cung cấp trang quản trị (Admin Portal) đầy đủ công cụ quản lý kho hàng, danh mục, đơn hàng và đánh giá.

### 1.2. Các phân hệ chức năng chính

#### Phân hệ Khách hàng (Customer Portal)
- **Trang chủ (`Home`):** Hiển thị Hero Banner, thống kê nổi bật, danh mục sản phẩm trực quan, danh sách *Sản phẩm nổi bật (Featured)*, *Khuyến mãi hấp dẫn (Hot Deals)* và cam kết dịch vụ.
- **Khám phá & Lọc sản phẩm (`Products`):**
  - Tìm kiếm theo từ khóa tên sản phẩm/thương hiệu.
  - Bộ lọc đa tiêu chí: Danh mục (`Category`), Thương hiệu (`Brand`), Khoảng giá (`Price Range`).
  - Sắp xếp linh hoạt: Giá tăng/giảm dần, tên A–Z, đánh giá cao nhất và phân trang tự động.
- **Chi tiết sản phẩm & Đánh giá (`ProductDetail`):**
  - Xem bộ sưu tập hình ảnh sản phẩm, giá bán, giá gốc, phần trăm giảm giá và tình trạng tồn kho.
  - Xem bảng thông số kỹ thuật chi tiết (`CPU`, `RAM`, `Storage`, `GPU`, `Display`, `Battery`, `Weight`, `OS`).
  - Chọn số lượng, thêm vào giỏ hàng hoặc mua ngay.
  - Gửi nhận xét và chấm điểm từ 1–5 sao (`StarRating`) cho sản phẩm.
- **Giỏ hàng (`Cart`) & Thanh toán (`Checkout`):**
  - Tự động lưu trữ giỏ hàng vào `localStorage` thông qua `CartContext`.
  - Tăng/giảm số lượng theo giới hạn tồn kho thực tế, xóa từng món hoặc xóa toàn bộ giỏ hàng.
  - Tự động điền thông tin người nhận từ hồ sơ, kiểm tra dữ liệu giao hàng (họ tên, số điện thoại 10 số, địa chỉ), hỗ trợ phương thức thanh toán **COD** hoặc **Chuyển khoản ngân hàng**, tự động trừ tồn kho sau khi đặt hàng thành công.
- **Tài khoản & Đơn hàng cá nhân (`Login`, `Register`, `Profile`, `Orders`):**
  - Đăng ký tài khoản mới, đăng nhập phân quyền (`user` / `admin`).
  - Cập nhật thông tin cá nhân (họ tên, số điện thoại, địa chỉ) và đổi mật khẩu.
  - Theo dõi lịch sử đơn hàng theo từng trạng thái (`Pending`, `Processing`, `Delivered`, `Cancelled`) và cho phép hủy đơn hàng khi đang ở trạng thái chờ xử lý (`Pending`).

#### Phân hệ Quản trị viên (Admin Portal)
- **Dashboard thống kê (`Dashboard`):** Tổng hợp tổng doanh thu (từ các đơn đã giao), tổng số đơn hàng, tổng sản phẩm, tổng người dùng, danh sách đơn hàng mới nhất và cảnh báo sản phẩm sắp hết hàng (`stock <= 5`).
- **Quản lý sản phẩm (`AdminProducts`):** Thêm mới, chỉnh sửa, xóa sản phẩm; nhập thông số kỹ thuật chi tiết; tải ảnh lên (Base64/URL); tìm kiếm và lọc sản phẩm theo danh mục.
- **Quản lý danh mục (`AdminCategories`):** Thêm, sửa, xóa danh mục sản phẩm; tự động sinh đường dẫn tĩnh (`slug`) chuẩn SEO từ tên danh mục.
- **Quản lý đơn hàng (`AdminOrders`):** Lọc đơn hàng theo trạng thái, xem chi tiết mặt hàng trong đơn và cập nhật trạng thái đơn hàng theo quy trình (`Pending` ➔ `Processing` ➔ `Delivered` / `Cancelled`).
- **Quản lý đánh giá (`AdminReviews`):** Xem toàn bộ đánh giá của khách hàng, lọc theo số sao, ẩn/hiện (`hidden`) hoặc xóa các đánh giá không phù hợp.

### 1.3. Cấu trúc thư mục dự án (Folder Structure)

```text
lapzone-gr3/
├── api/
│   └── db.json                    # Mock database for JSON Server (REST API)
├── public/
│   └── index.html                 # Root HTML template
├── src/
│   ├── components/                # Reusable UI & Guard components
│   │   ├── Header.jsx             # Top navigation bar, cart badge & user menu
│   │   ├── Footer.jsx             # Site footer with links & contact info
│   │   ├── ProductCard.jsx        # Product item card with quick add-to-cart
│   │   ├── ProtectedRoute.jsx     # Route guards (ProtectedRoute & AdminRoute)
│   │   └── StarRating.jsx         # Interactive/read-only 5-star rating component
│   ├── context/                   # Global state management (React Context API)
│   │   ├── AuthContext.js         # Authentication state & localStorage persistence
│   │   └── CartContext.js         # Shopping cart state & localStorage persistence
│   ├── pages/                     # Application page views
│   │   ├── admin/                 # Admin Portal pages
│   │   │   ├── AdminLayout.jsx    # Admin sidebar layout & nested route Outlet
│   │   │   ├── Dashboard.jsx      # Revenue analytics, stats cards & recent orders
│   │   │   ├── AdminProducts.jsx  # Products CRUD, specs editor & image upload
│   │   │   ├── AdminCategories.jsx# Categories CRUD & auto-slug generator
│   │   │   ├── AdminOrders.jsx    # Order management & status workflow
│   │   │   └── AdminReviews.jsx   # Customer review moderation (hide/show/delete)
│   │   ├── Home.jsx               # Landing page (Hero, Brands, Categories, Flash Sale)
│   │   ├── Products.jsx           # Product catalog (Search, Multi-filter, Sort, Pagination)
│   │   ├── ProductDetail.jsx      # Product specs, image gallery & customer reviews
│   │   ├── Cart.jsx               # Shopping cart management
│   │   ├── Checkout.jsx           # Delivery validation & COD order placement
│   │   ├── Login.jsx              # User/Admin login page
│   │   ├── Register.jsx           # User registration page
│   │   ├── Profile.jsx            # User profile & password update
│   │   └── Orders.jsx             # Customer order history & order cancellation
│   ├── services/                  # API service layer
│   │   └── api.js                 # Fetch wrapper & CRUD endpoints for JSON Server
│   ├── App.css                    # Custom global styles & responsive utilities
│   ├── App.js                     # Main router configuration & Context providers
│   ├── index.css                  # Base stylesheet
│   └── index.js                   # Application entry point
├── package.json                   # Dependencies and npm scripts
└── README.md                      # Project documentation
```

---

## 2. Hướng Dẫn Cài Đặt & Chạy Dự Án

### 2.1. Yêu cầu hệ thống
- **Node.js:** Phiên bản `>= 16.x` (khuyến nghị `18.x` hoặc `20.x`)
- **Trình quản lý gói:** `npm` hoặc `yarn`

### 2.2. Các bước cài đặt và khởi chạy

**Bước 1: Di chuyển vào thư mục dự án và cài đặt thư viện**
```bash
npm install
```

**Bước 2: Khởi chạy ứng dụng**

- **Cách 1 — Chạy đồng thời cả JSON Server API và React App (Khuyên dùng):**
  ```bash
  npm run dev
  ```
- **Cách 2 — Chạy riêng từng tiến trình trên 2 cửa sổ Terminal:**
  - *Terminal 1 (Khởi chạy Mock API với `json-server` tại cổng `5000`):*
    ```bash
    npm run server
    ```
  - *Terminal 2 (Khởi chạy giao diện React tại cổng `3000`):*
    ```bash
    npm start
    ```

**Bước 3: Truy cập ứng dụng**
- **Giao diện Web (Client):** [http://localhost:3000](http://localhost:3000)
- **RESTful API (JSON Server):** [http://localhost:5000](http://localhost:5000) (`http://localhost:5000/products`, `/categories`, `/users`, `/orders`, `/reviews`)

### 2.3. Tài khoản Demo có sẵn

| Vai trò | Email | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@laptop.com` | `admin123` | Toàn quyền truy cập `/admin/*` và các chức năng mua sắm |
| **Khách hàng 1 (User)** | `an@gmail.com` | `123456` | Mua sắm, quản lý giỏ hàng, đặt hàng, đánh giá, xem đơn hàng |
| **Khách hàng 2 (User)** | `binh@gmail.com` | `123456` | Mua sắm, quản lý giỏ hàng, đặt hàng, đánh giá, xem đơn hàng |

---

## 3. Ánh Xạ Chuẩn Đầu Ra (LO1 – LO8)

Bảng dưới đây ánh xạ các chuẩn đầu ra học phần **FER202 (LO1 – LO8)** với các tính năng và file mã nguồn cụ thể trong dự án **LapZone**:

| Mã LO | Nội dung chuẩn đầu ra (Learning Outcomes) | Tính năng & Minh chứng áp dụng trong dự án LapZone | File mã nguồn tiêu biểu |
| :---: | :--- | :--- | :--- |
| **LO1** | Vận dụng cú pháp và tính năng **JavaScript ES6+** (Arrow Functions, Destructuring, Spread/Rest, Template Literals, Array methods `map`, `filter`, `reduce`, `sort`, Modules, Async/Await) | - Lọc sản phẩm đa điều kiện, sắp xếp, phân trang bằng `filter()`, `sort()`, `slice()`.<br>- Tính tổng tiền và tổng số lượng giỏ hàng bằng `reduce()`.<br>- Tự động tạo `slug` tiếng Việt không dấu và định dạng tiền tệ `Intl.NumberFormat`. | `src/pages/Products.jsx`<br>`src/context/CartContext.js`<br>`src/pages/admin/AdminCategories.jsx` |
| **LO2** | Thiết kế giao diện web đáp ứng (**Responsive UI**) kết hợp **Bootstrap 5**, **Bootstrap Icons** và **Custom CSS3** | - Sử dụng hệ thống lưới Bootstrap Grid (`container`, `row`, `col-lg-*`, `col-md-*`), Navbar, Card, Modal, Badge, Table.<br>- Tùy biến bảng màu, hiệu ứng hover card, skeleton/spinner loading và giao diện Admin Sidebar. | `src/App.css`<br>`src/index.css`<br>`src/components/Header.jsx`<br>`src/components/Footer.jsx` |
| **LO3** | Xây dựng kiến trúc dựa trên **Component (Component-Based Architecture)**, truyền dữ liệu qua `props` và tái sử dụng giao diện | - Tách biệt các UI Component tái sử dụng ở nhiều trang: thẻ sản phẩm (`ProductCard`), hiển thị/chọn sao đánh giá (`StarRating`), thanh điều hướng (`Header`), chân trang (`Footer`).<br>- Tổ chức bố cục lồng nhau với `MainLayout` và `AdminLayout`. | `src/components/ProductCard.jsx`<br>`src/components/StarRating.jsx`<br>`src/pages/admin/AdminLayout.jsx` |
| **LO4** | Quản lý trạng thái cục bộ (**Component State**) và vòng đời (**Lifecycle**) với **React Hooks** (`useState`, `useEffect`) | - Quản lý trạng thái bộ lọc, từ khóa tìm kiếm, phân trang, tab đang mở, modal thêm/sửa sản phẩm.<br>- Sử dụng `useEffect` để tải dữ liệu từ API khi khởi tạo trang hoặc khi tham số URL thay đổi. | `src/pages/Home.jsx`<br>`src/pages/Products.jsx`<br>`src/pages/ProductDetail.jsx`<br>`src/pages/admin/Dashboard.jsx` |
| **LO5** | Quản lý trạng thái toàn cục (**Global State Management**) với **React Context API** (`createContext`, `useContext`) và đồng bộ `localStorage` | - `AuthContext`: Quản lý trạng thái đăng nhập, thông tin người dùng hiện tại, đăng xuất và cập nhật hồ sơ xuyên suốt ứng dụng.<br>- `CartContext`: Quản lý danh sách giỏ hàng toàn cục, tự động lưu/khôi phục từ `localStorage`. | `src/context/AuthContext.js`<br>`src/context/CartContext.js` |
| **LO6** | Định tuyến phía Client (**Client-Side Routing**) và bảo vệ đường dẫn (**Protected / Role-based Routes**) với **React Router DOM v7** | - Cấu hình định tuyến `<BrowserRouter>`, `<Routes>`, `<Route>`, Nested Routes (`/admin/*`) và Dynamic Route (`/products/:id`).<br>- Sử dụng `useNavigate`, `useParams`, `useSearchParams`, `useLocation` và bảo vệ route bằng `ProtectedRoute`, `AdminRoute`. | `src/App.js`<br>`src/components/ProtectedRoute.jsx` |
| **LO7** | Xử lý biểu mẫu (**Controlled Forms**) và kiểm tra hợp lệ dữ liệu (**Client-Side Validation**) kèm thông báo trực quan | - Kiểm tra dữ liệu đăng nhập, đăng ký, cập nhật hồ sơ, đổi mật khẩu, thông tin giao hàng (`Checkout`) và form CRUD sản phẩm/danh mục.<br>- Hiển thị lỗi chi tiết từng trường và thông báo toast qua `react-toastify`. | `src/pages/Login.jsx`<br>`src/pages/Register.jsx`<br>`src/pages/Profile.jsx`<br>`src/pages/Checkout.jsx`<br>`src/pages/admin/AdminProducts.jsx` |
| **LO8** | Tích hợp **RESTful API** (`json-server`), xử lý bất đồng bộ (`fetch` / Promises), làm việc nhóm với **Git/GitHub** theo mô hình Agile/Sprint | - Xây dựng tầng dịch vụ `api.js` thực hiện đầy đủ các thao tác CRUD (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) tới `api/db.json`.<br>- Phối hợp nhóm qua nhánh Git theo từng Sprint/Feature và hợp nhất vào nhánh `dev` / `main`. | `src/services/api.js`<br>`api/db.json`<br>`package.json` |

---

## 4. Bảng Đóng Góp Thành Viên

Dự án được thực hiện bởi **Nhóm 3 (LapZone-GR3)** gồm 4 thành viên chia theo 2 Sprint:

### 4.1. Tổng quan phân công & Tỷ lệ đóng góp

| STT | Mã SV (Roll Number) | Họ và Tên | Vai trò | Các hạng mục phụ trách chính | Tỷ lệ đóng góp |
| :-: | :---: | :--- | :---: | :--- | :---: |
| 1 | **CE191106** | **Trần Bùi Trung Trực** | Team Leader | - Khởi tạo dự án, cấu hình `json-server` (`api/db.json`) và tầng giao tiếp API (`src/services/api.js`).<br>- Xây dựng luồng xác thực (`AuthContext.js`, `Login.jsx`, `Register.jsx`, `ProtectedRoute.jsx`).<br>- Xây dựng trang hồ sơ cá nhân & đổi mật khẩu (`Profile.jsx`).<br>- Xây dựng trang chi tiết sản phẩm & đánh giá (`ProductDetail.jsx`) và quản lý đánh giá phía Admin (`AdminReviews.jsx`). | **25%** |
| 2 | **CE180996** | **Dương Hoàng Chuẩn** | Member | - Xây dựng các component giao diện dùng chung (`Header.jsx`, `Footer.jsx`, `ProductCard.jsx`, `StarRating.jsx`).<br>- Xây dựng trang chủ (`Home.jsx`) với các phân khu Featured, Hot Deals, Categories.<br>- Xây dựng trang danh mục sản phẩm (`Products.jsx`) với bộ lọc đa tiêu chí, tìm kiếm, sắp xếp và phân trang.<br>- Thiết kế hệ thống CSS toàn cục và hiệu ứng giao diện (`App.css`, `index.css`). | **25%** |
| 3 | **CE190014** | **Trần Quốc Huy** | Member | - Xây dựng `CartContext.js` (quản lý giỏ hàng & đồng bộ `localStorage`) và trang giỏ hàng (`Cart.jsx`).<br>- Xây dựng trang thanh toán, kiểm tra thông tin giao hàng & xử lý đặt hàng COD/Banking (`Checkout.jsx`).<br>- Xây dựng trang lịch sử đơn hàng & hủy đơn của khách hàng (`Orders.jsx`).<br>- Xây dựng trang quản lý & cập nhật trạng thái đơn hàng cho Admin (`AdminOrders.jsx`). | **25%** |
| 4 | **CE200879** | **Trần Trầm Hữu Phú** | Member | - Xây dựng khung bố cục trang quản trị (`AdminLayout.jsx`), Sidebar điều hướng và tích hợp định tuyến toàn ứng dụng (`App.js`).<br>- Xây dựng trang thống kê tổng quan Admin (`Dashboard.jsx`).<br>- Xây dựng trang quản lý danh mục sản phẩm kèm tự động tạo slug (`AdminCategories.jsx`).<br>- Xây dựng trang quản lý sản phẩm CRUD đầy đủ thông số kỹ thuật & hình ảnh (`AdminProducts.jsx`). | **25%** |

---

## 5. Danh Sách Tài Liệu & Công Cụ AI Đã Dùng

### 5.1. Tài liệu tham khảo (References)
1. **React Official Documentation:** [https://react.dev/](https://react.dev/) — Tài liệu chính thức về React Hooks (`useState`, `useEffect`, `useContext`), Components và State Management.
2. **React Router DOM Documentation:** [https://reactrouter.com/](https://reactrouter.com/) — Hướng dẫn cấu hình Client-side Routing, Nested Routes, Protected Routes và URL Search Params.
3. **Bootstrap 5 & Bootstrap Icons Documentation:** [https://getbootstrap.com/](https://getbootstrap.com/) & [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/) — Hệ thống Grid, Components và bộ biểu tượng giao diện.
4. **JSON Server Documentation:** [https://github.com/typicode/json-server](https://github.com/typicode/json-server) — Xây dựng RESTful Mock API phục vụ lưu trữ và truy vấn dữ liệu JSON.
5. **React Toastify Documentation:** [https://fkhadra.github.io/react-toastify/](https://fkhadra.github.io/react-toastify/) — Thư viện hiển thị thông báo Toast phản hồi thao tác người dùng.
6. **Học liệu môn FER202 (FPT University):** Slide bài giảng, hướng dẫn thực hành Lab.

### 5.2. Công cụ AI đã sử dụng (AI Tools Disclosure)

| Công cụ AI | Mục đích & Phạm vi sử dụng trong dự án | Kiểm soát của thành viên nhóm |
| :--- | :--- | :--- |
| **ChatGPT / Claude / Gemini (Antigravity)** | - Hỗ trợ khởi tạo dữ liệu mẫu (`api/db.json`) gồm danh sách laptop, thông số kỹ thuật và đánh giá.<br>- Gợi ý cấu trúc CSS, bảng màu giao diện và tối ưu hiển thị Responsive trên thiết bị di động.<br>- Hỗ trợ rà soát lỗi (debug) biểu thức chính quy (Regex) kiểm tra số điện thoại, email và logic xử lý bất đồng bộ.<br>- Hỗ trợ chuẩn hóa bố cục tài liệu `README.md`. | Toàn bộ mã nguồn, luồng nghiệp vụ, tích hợp API và kiểm thử chức năng đều được các thành viên trong nhóm trực tiếp đọc hiểu, chỉnh sửa, kiểm tra chéo (code review) qua các nhánh Sprint và xác nhận hoạt động chính xác trước khi merge. |
