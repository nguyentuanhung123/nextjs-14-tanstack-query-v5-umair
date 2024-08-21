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

## Tóm tắt:
- Fetch API: Tốt cho các dự án nhỏ hoặc các trường hợp không cần các tính năng phức tạp, chỉ cần thực hiện các yêu cầu HTTP cơ bản.
- Axios: Thích hợp cho các dự án vừa và lớn, nơi bạn cần một thư viện mạnh mẽ, dễ sử dụng và hỗ trợ nhiều tính năng bổ sung như hủy yêu cầu, intercepter, và quản lý lỗi.
- TanStack Query: Tuyệt vời cho các ứng dụng React cần quản lý phức tạp về trạng thái phía máy chủ, tự động làm mới dữ liệu, quản lý cache và tối ưu hóa hiệu suất.

## Có phải data được trả về sẽ được lưu trong cache ?

- Đúng vậy, nếu bạn sử dụng TanStack Query (trước đây là React Query), dữ liệu được trả về từ các yêu cầu sẽ được tự động lưu trữ trong cache.

## Chi tiết về cơ chế cache của TanStack Query:

- Tự động cache: Khi bạn thực hiện một yêu cầu dữ liệu bằng cách sử dụng useQuery hoặc queryClient.fetchQuery, dữ liệu trả về sẽ tự động được lưu trong cache.
- Thời gian lưu trữ (Stale Time): Dữ liệu trong cache được đánh dấu là "tươi" trong một khoảng thời gian cụ thể (thường gọi là staleTime). Trong khoảng thời gian này, dữ liệu sẽ được sử dụng từ cache mà không cần thực hiện lại yêu cầu HTTP. Sau khi hết staleTime, dữ liệu sẽ được đánh dấu là "cũ" và sẽ được làm mới khi có yêu cầu tiếp theo.
- Thời gian giữ (gcTime): Sau khi dữ liệu đã trở nên "cũ", nó vẫn sẽ được giữ trong cache một khoảng thời gian gọi là gcTime. Nếu không có yêu cầu nào khác trong khoảng thời gian này, dữ liệu sẽ bị xóa khỏi cache.
- Tự động làm mới (Refetch): TanStack Query có thể tự động làm mới dữ liệu khi các điều kiện thay đổi (ví dụ: người dùng quay lại trang, hoặc khi trang được tập trung lại sau khi đã chuyển sang một tab khác).

## So sánh với Fetch và Axios:
- Fetch API và Axios không có cơ chế cache tích hợp sẵn. Nếu bạn sử dụng Fetch hoặc Axios và muốn lưu dữ liệu vào cache, bạn phải tự mình quản lý cache hoặc sử dụng một thư viện khác để thực hiện việc này.

## Tóm lại:
- Với TanStack Query, dữ liệu sẽ tự động được lưu trong cache và quản lý theo các quy tắc về thời gian tươi và thời gian giữ.
- Với Fetch API hoặc Axios, bạn phải tự quản lý cache nếu muốn lưu trữ dữ liệu để sử dụng lại mà không cần thực hiện yêu cầu HTTP mới.

## Trong TanStack Query, các tham số staleTime và gcTime đều được xác định bằng đơn vị milliseconds (ms). Khi bạn đề cập đến 300000 ms, điều này tương đương với 5 phút.

## Giải thích chi tiết:

- staleTime: Đây là khoảng thời gian trong đó dữ liệu được xem là "tươi". Nếu bạn đặt staleTime: 300000, dữ liệu sẽ được xem là tươi trong 5 phút sau khi nó được lấy về từ máy chủ. Trong khoảng thời gian này, nếu có một yêu cầu khác được thực hiện cho cùng một dữ liệu, TanStack Query sẽ sử dụng dữ liệu từ cache mà không cần phải thực hiện yêu cầu HTTP mới.
- gcTime: Đây là khoảng thời gian dữ liệu được giữ trong cache sau khi nó đã trở nên "cũ". Nếu bạn đặt cacheTime: 300000, dữ liệu sẽ được giữ trong cache thêm 5 phút sau khi nó trở nên cũ. Nếu không có yêu cầu nào khác cho dữ liệu đó trong khoảng thời gian này, dữ liệu sẽ bị xóa khỏi cache để tiết kiệm bộ nhớ.

## Ví dụ:

```tsx
const { data, error, isLoading } = useQuery('todos', fetchTodos, {
  staleTime: 300000,  // 5 phút
  gcTime: 300000   // 5 phút
});
```

- Trong ví dụ trên, dữ liệu sẽ được coi là tươi trong 5 phút sau khi tải về. Nếu có yêu cầu khác trong khoảng thời gian này, nó sẽ sử dụng dữ liệu từ cache.
- Sau khi hết 5 phút, nếu không có yêu cầu nào khác, dữ liệu sẽ bị xóa khỏi cache sau 5 phút nữa.

## Tóm lại:
- 300000 ms tương đương với 5 phút.
- Nếu bạn đặt staleTime hoặc cacheTime thành 300000 ms, bạn đang yêu cầu TanStack Query giữ dữ liệu tươi hoặc giữ trong cache trong 5 phút.

## Nếu có một request sau khi dữ liệu bị cũ thì nó có được chuyển đổi thành tươi không ?
- Đúng vậy! Khi dữ liệu trong TanStack Query đã trở nên "cũ" (stale) và có một request mới được thực hiện để lấy dữ liệu đó, thì TanStack Query sẽ gửi một yêu cầu HTTP mới để làm mới dữ liệu. Khi dữ liệu mới được trả về từ yêu cầu đó, nó sẽ được lưu trữ lại trong cache và được đánh dấu là "tươi" (fresh) trong khoảng thời gian staleTime đã được cấu hình.

## Quy trình chi tiết:
1. Dữ liệu cũ (Stale Data): Sau khi thời gian staleTime hết hạn, dữ liệu trong cache được coi là "cũ" (stale).
2. Request mới: Khi có một request mới yêu cầu dữ liệu đã bị đánh dấu là cũ, TanStack Query sẽ thực hiện một yêu cầu HTTP mới tới máy chủ để lấy dữ liệu cập nhật.
3. Làm mới dữ liệu (Refetch): Sau khi yêu cầu HTTP mới hoàn tất, dữ liệu mới sẽ được lưu trữ lại trong cache và được đánh dấu là tươi. staleTime sẽ được đặt lại, và dữ liệu mới này sẽ được sử dụng cho các request tiếp theo trong khoảng thời gian staleTime.

- Ví dụ:
```tsx
const { data, error, isLoading } = useQuery('todos', fetchTodos, {
  staleTime: 300000, // 5 phút
  cacheTime: 600000  // 10 phút
});
```

- Sau 5 phút (khi staleTime hết hạn): Dữ liệu trong cache được coi là cũ.
- Khi có request mới: TanStack Query sẽ gửi một yêu cầu HTTP mới để lấy dữ liệu cập nhật từ máy chủ.
- Dữ liệu cập nhật: Dữ liệu mới nhận được sẽ được đánh dấu là tươi và lưu trong cache, bắt đầu lại chu kỳ staleTime từ đầu.

## Tóm lại:
- Khi dữ liệu trong cache trở nên cũ và có một request mới, TanStack Query sẽ tự động làm mới dữ liệu bằng cách gửi yêu cầu mới và cập nhật cache với dữ liệu mới nhận được, sau đó đánh dấu dữ liệu này là tươi.