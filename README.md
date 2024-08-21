This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Tải các package
- npm i @tanstack/react-query
- npm i -D @tanstack/eslint-plugin-query
- npm i @tanstack/react-query-devtools

## Cấu hình
- B1: Tạo folder providers trong folder src
- B2: Tạo file TanstackProvider.tsx bên trong folder providers đã tạo ở trên
- B3: Viết mã

```tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default TanstackProvider
```

- B4: Vào file layout.tsx

- Ban đầu

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- Sau khi sửa

```tsx
import TanstackProvider from "@/providers/TanstackProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
```

## TanStack Query (React Query)

- Thư viện chuyên dụng: TanStack Query là một thư viện mạnh mẽ dành cho quản lý trạng thái phía máy chủ trong các ứng dụng React. Nó không chỉ là một công cụ để thực hiện các yêu cầu HTTP, mà còn quản lý dữ liệu được yêu cầu.
- Quản lý cache: TanStack Query quản lý cache tự động, giúp bạn dễ dàng quản lý dữ liệu được yêu cầu từ máy chủ và giữ cho nó được đồng bộ với giao diện người dùng.
- Tự động làm mới dữ liệu: TanStack Query có thể tự động làm mới dữ liệu dựa trên khoảng thời gian nhất định hoặc khi người dùng thực hiện một hành động cụ thể.
- Quản lý trạng thái tải và lỗi: TanStack Query cung cấp các công cụ để quản lý trạng thái tải (loading), thành công (success), và lỗi (error) của dữ liệu mà không cần phải viết nhiều mã.
- Tính năng làm việc offline: TanStack Query có thể hỗ trợ làm việc offline, với tính năng giữ dữ liệu trong bộ nhớ cache và đồng bộ lại khi có kết nối.
- Hỗ trợ phân trang, vô hạn: TanStack Query tích hợp sẵn các tính năng phân trang (pagination) và tải vô hạn (infinite scrolling), giúp việc quản lý các tập dữ liệu lớn trở nên dễ dàng hơn.
- Phụ thuộc vào React: TanStack Query được thiết kế để sử dụng trong React, vì vậy nếu bạn không sử dụng React thì thư viện này không phù hợp.
