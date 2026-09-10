Prerequisites:

- [Vercel CLI](https://vercel.com/docs/cli) installed globally

Auth (нээлттэй):

- `POST /auth/sign-up` — `{ email, password, phoneNumber?, address? }` → `{ token, user }`
- `POST /auth/sign-in` — `{ email, password }` → `{ token, user }`
- `POST /auth/reset-password-request` — `{ email }`
- `GET  /auth/verify-reset-password-request?token=...`
- `POST /auth/reset-password` — `{ token, password }`

Food category:

- `GET    /food-category` — нээлттэй
- `POST   /food-category` — ADMIN, `{ categoryName }`
- `DELETE /food-category/:foodCategoryId` — ADMIN

Food:

- `GET    /food` — бүх хоол (нээлттэй)
- `GET    /food/:categoryId` — категориор шүүсэн (нээлттэй)
- `POST   /food` — ADMIN, `{ foodName, price, ingredients?, image?, category }`
- `PATCH  /food/:foodId` — ADMIN
- `DELETE /food/:foodId` — ADMIN

Food order:

- `POST  /food-order` — нэвтэрсэн, `{ foodOrderItems: [{ food, quantity }] }` (нийт үнийг сервер бодно)
- `GET   /food-order` — ADMIN, бүх захиалга
- `GET   /food-order/:userId` — нэвтэрсэн (өөрийн эсвэл ADMIN)
- `PATCH /food-order/:foodOrderId` — ADMIN, `{ status: "PENDING" | "CANCELED" | "DELIVERED" }`

Хамгаалагдсан хүсэлтэд `Authorization: Bearer <token>` header илгээнэ. Эхний
ADMIN хэрэглэгчийг DB дээр `role: "ADMIN"` болгож гараар тохируулна.

To develop locally:

```
npm install
vc dev
```

```
open http://localhost:3000
```

To build locally:

```
npm install
vc build
```

To deploy:

```
npm install
vc deploy
```
