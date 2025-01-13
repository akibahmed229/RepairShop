# **Project Documentation**

## **Technologies Used**

- **React** (v19) – A JavaScript library for building user interfaces
- **Next.js** (v15) – The React Framework for the Web with SSR support
- **Tailwind CSS** – Utility-first CSS framework
- **Shadcn/UI** – Component library
- **Sentry** – Application monitoring and error tracking
- **Kinde** – Authentication and authorization service
- **Neon** - Ship faster with Postgres
- **Drizzle** - ORM for your database
- **Zod** -TypeScript-first schema validation with static type inference
- **React-Hook-Form** - Simple form validation with React Hook Form

---

## **1. Next.js Features Used in the Project**

Next.js provides server-side rendering (SSR) and other features that enhance React's capabilities.

### **1.1 Routing**

Next.js supports file-based routing in the `app/` directory. Below are some of the routing features used in this project:

#### **1.1.1 Pages, Layouts, and Templates**

- **Page**: A file inside the `app/` directory that represents UI for a specific route. Export a default React component to define a page.
- **Layout**: A shared UI between multiple pages. Layouts preserve state, remain interactive, and do not re-render on navigation. Export a React component from a `layout.tsx` file that accepts a `children` prop.
- **Template**: Similar to layouts but re-renders every time a new page is loaded.

#### **1.1.2 Route Groups**

- **Route Groups** allow logical grouping of routes without affecting the URL path structure.
- This is achieved by wrapping directories in parentheses (`()`).

Example directory structure:

```
app
├── (rs)
│   ├── customers/
│   ├── home/
│   ├── tickets/
│   ├── layout.tsx
│   ├── template.tsx
│   ├── error.tsx
```

In this example, `(rs)` is a **Route Group**, which organizes routes without affecting their URLs.

#### **1.1.3 Dynamic Routes**

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or [prerendered](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params) at build time.

- A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[folderName]`. For example, `[id]` or `[slug]`.
- Dynamic Segments are passed as the `params` prop to [`layout`](https://nextjs.org/docs/app/api-reference/file-conventions/layout), [`page`](https://nextjs.org/docs/app/api-reference/file-conventions/page), [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) functions.

### **1.2 File Conventions**

#### **1.2.1 Page.js**

The `page` file allows you to define UI that is **unique** to a route. You can create a page by default exporting a component from the file:

```ts
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>My Page</h1>
}
```

[Props](https://nextjs.org/docs/app/api-reference/file-conventions/page#props)

- [`params` (optional)](https://nextjs.org/docs/app/api-reference/file-conventions/page#params-optional):
  A promise that resolves to an object containing the [dynamic route parameters](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) from the root segment down to that page.
  1.  **Example Route**: `app/shop/[category]/[item]/page.js`
  2.  **URL**: `/shop/1/2`
- [`searchParams` (optional)](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional):
  A promise that resolves to an object containing the [search parameters](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL#parameters) of the current URL. For example: 1. **Example URL**: `/shop?a=1&b=2` 2. **Created At:** `app/\(rs\)/customers/form/page.tsx` & `app/\(rs\)/ctickets/form/page.tsx`

### **1.2.2 Layout.js**

#### **Definition**

- A **root layout** is the top-most layout located in the root `app` directory.
- It is primarily used to define the `<html>` and `<body>` tags, as well as globally shared UI components.

#### **Key References**

- **[Layout Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/layout#reference)**
- **[Props Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/layout#props)**

#### **Props Overview**

1. **[`children` (required)](https://nextjs.org/docs/app/api-reference/file-conventions/layout#children-required)**

   - Layout components must accept and use a `children` prop.
   - During rendering, `children` will include the route segments wrapped by the layout.
   - It primarily includes child components such as:
     - A child [Layout](https://nextjs.org/docs/app/api-reference/file-conventions/page) (if it exists).
     - A [Page](https://nextjs.org/docs/app/api-reference/file-conventions/page).
     - Other special files like:
       - [Loading](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).
       - [Error](https://nextjs.org/docs/app/building-your-application/routing/error-handling).

2. **[`params` (optional)](https://nextjs.org/docs/app/api-reference/file-conventions/layout#params-optional)**

   - A promise that resolves to an object containing the [dynamic route parameters](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes).
   - These parameters are accessible from the root segment down to the specific layout.

   **Example Usage**:

   ```tsx
   export default async function Layout({
     params,
   }: {
     params: Promise<{ team: string }>;
   }) {
     const team = (await params).team;
   }
   ```

#### **Notable Limitations**

- Layout components **do not** receive the `searchParams` prop.
- Layouts cannot access the `pathname` property.

### **1.3 Optimization**

Next.js includes several built-in optimizations that enhance speed and [Core Web Vitals](https://web.dev/vitals/). Below are key techniques implemented in this project:

---

#### **1.3.1 Metadata Optimization**

Managing metadata effectively is essential for improving SEO and the overall user experience in your application. Next.js supports both static and dynamic metadata:

---

##### **Static Metadata**

Static metadata can be defined by exporting a [`Metadata` object](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object) from a `layout.js` or static `page.js` file.

- **Example**:

  ```tsx
  import type { Metadata } from "next";

  export const metadata: Metadata = {
    title: "...",
    description: "...",
  };

  export default function Page() {}
  ```

---

##### **Dynamic Metadata**

Dynamic metadata can be generated using the `generateMetadata` function. This allows metadata to be fetched or calculated dynamically based on application context.

- **Example**:

  ```tsx
  export async function generateMetadata({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) {
    const { customerId } = await searchParams;

    if (!customerId) {
      return { title: "New Customer" };
    }
    return { title: `Edit Customer #${customerId}` };
  }
  ```

- **Usage**:
  - Used in: `app/(rs)/customers/form/page.tsx` & `app/(rs)/tickets/form/page.tsx`

---

## **2. Tailwind CSS**

Tailwind is customized in the `tailwind.config.ts` file. Below are some themes and configurations used:

- **Custom Themes**:
  - **Background Image**:
    - Theme name: `home-img`, accessed with `bg-home-img`.
    - Used in: `app/page.tsx`.
  - **Animations**:
    - **Keyframes**: Custom keyframes for `appear` and `slide`.
    - **Themes**: `animate-appear`, `animate-slide`.
      - Used in: `components/Header.tsx`, `app/(rs)/template.tsx`.

---

## **3. Shadcn/UI**

Shadcn is used for building reusable UI components in the project. Below are the details of the components implemented and their usage:

### **3.1 Components Used**

#### **3.1.1 Dark Mode Toggle**

- **Location**:
  - Created in `components/theme-provider.tsx`.
  - Integrated with the `ThemeProvider` in the root layout (`app/layout.tsx`).
  - The toggle itself is added in `components/ModeToggle.tsx` and used in `components/Header.tsx`.

#### **3.1.2 Button**

- **Location**:  
   Created in `components/ui/button.tsx`.
- **Usage**:  
   Used in:
  - `components/Header.tsx`
  - `app/note-found.tsx`

#### **3.1.3 Dropdown Menu**

- **Location**:  
   Created in the same directory as `Button`.
- **Usage**:  
   Used in `components/ModeToggle.tsx`.

#### **3.1.4 Form**

- **Location**:
  - Created in `component/ui/form.tsx`.
  - The **label** component is created in `component/ui/label.tsx`.
- **Purpose**:  
   The `<Form />` component is a wrapper around the `react-hook-form` library, designed to simplify the management of form components.
- **Anatomy**:
  ```tsx
  <Form>
    <FormField
      control={...}
      name="..."
      render={() => (
        <FormItem>
          <FormLabel />
          <FormControl>
            { /* Your form field */ }
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  </Form>
  ```
- **References**:  
   Examples of integrating the `<Form />` component with other UI components:
  - [Checkbox](https://ui.shadcn.com/docs/components/checkbox#form)
  - [Input](https://ui.shadcn.com/docs/components/input#form)
  - [Select](https://ui.shadcn.com/docs/components/select#form)
  - [Textarea](https://ui.shadcn.com/docs/components/textarea#form)

### **3.2 Adding Components**

To install a Shadcn component, use the following command:

```bash
npx shadcn@latest add component
```

### **3.3 Custom Input Components**

#### **3.3.1 Location**

Custom input components are created in the `components/inputs` directory:

```
components/inputs
├── CheckBoxWithLabel.tsx
├── InputWithLabel.tsx
├── SelectWithLabel.tsx
└── TextAreaWithLabel.tsx
```

#### **3.3.2 Usage**

These components are used in:

- `app/(rs)/customers/form/CustomerForm.tsx`
- `app/(rs)/tickets/form/TicketForm.tsx`

### **3.4 Input, Select, Textarea, Checkbox**

- **Location**:  
   Core input components are created in the `component/ui/` directory.

---

## **4. Sentry**

Sentry provides application monitoring and error tracking.

### **4.1 Integration**

The following command was used for integrating Sentry with this project:

```bash
npx @sentry/wizard@latest -i nextjs --saas --org general-xng --project javascript-nextjs
```

### **4.2 Benefits**

- Automatic setup and configuration for monitoring errors and performance issues.
- Traces slow transactions to poorly performing API calls or database queries.

---

## **5. Kinde**

Kinde is used for authentication and authorization. Below are the steps and configurations implemented in the project:

### **5.1 Setting Up Kinde**

1. Install the Kinde authentication package:

   ```bash
   npm i @kinde-oss/kinde-auth-nextjs
   ```

2. Configure environment variables in `.env.local`:
   ```bash
   KINDE_CLIENT_ID=your_id
   KINDE_CLIENT_SECRET=your_secret
   KINDE_ISSUER_URL=https://repaircompter.kinde.com
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000/login
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/home
   ```
   Update the **login redirection URL** on the Kinde website accordingly.

### **5.2 Authorization Permissions**

Three permissions were created in the Kinde website for later use:

- **Admin**
- **Manager**
- **User**

### **5.3 API Route for Authentication**

Create the `app/api/auth/[kindeAuth]/route.js` file to handle authentication. Add the following code:

```javascript
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();
```

### **5.4 Login Page**

Create a login page at `app/login/page.tsx` for user sign-in.

### **5.5 Logout Feature**

Logout functionality was added to `components/Header.tsx`.

### **5.6 Middleware for Route Protection**

To protect routes, create a `middleware.ts` file at the root of the project. This middleware ensures that only authenticated users can access certain pages.

### **5.7 Kinde Management API JS**

#### **5.7.1 Installation**

Install the required dependencies using the following command:

```bash
npm i @kinde-oss/kinde-auth-nextjs @kinde/management-api-js
```

---

#### **5.7.2 Machine-to-Machine (M2M) Application Setup**

1. Go to the Kinde website and create a **Machine to Machine (M2M)** application.
2. Set up the following environment variables in your project:

   ```env
   KINDE_DOMAIN=https://your_kinde_site_name.kinde.com
   KINDE_MANAGEMENT_CLIENT_ID=your_id
   KINDE_MANAGEMENT_CLIENT_SECRET=your_secret
   ```

---

#### **5.7.3 Usage**

##### **Client-Side Helper**

To access the authorized user’s Kinde Auth data from a client component, use the `useKindeBrowser` helper.

- **Documentation**: Refer to the [Kinde Client Helper](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/#kinde-auth-data---client).
- **Example Usage**:
  - Used in: `app/(rs)/customers/form/CustomerForm.tsx`

---

##### **Server-Side Helper**

To access the authorized user’s Kinde Auth data from a server component, use the `getKindeServerSession` helper.

- **Documentation**: Refer to the [Kinde Server Helper](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/#kinde-auth-data---client).
- **Example Usage**:
  - Used in: `app/(rs)/tickets/form/page.tsx`
  - Also utilizes the `@kinde/management-api-js` library for additional functionality.

---

## **6. Drizzle and Neon**

### **6.1 Setup Environment Variables**

- Update `.env.local` with your PostgreSQL connection string provided by Neon:

```env
# Example connection string
DATABASE_URL=postgresql://username:password@hostname:5432/database?sslmode=require
```

### **6.2 Install Dependencies**

Run the following commands to install Drizzle ORM and Neon-related packages:

```bash
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx
```

### **6.3 Create Database Directory**

Set up the `db` directory in the project root to organize database-related files:

```
db
├── index.ts        # Contains database connection logic.
├── migrate.ts      # Handles database migrations.
└── schema.ts       # Defines database tables and relationships.
```

### **6.4 Configure Drizzle**

1. **Create `drizzle.config.ts` in the root directory**:

   ```ts
   import { defineConfig } from "drizzle-kit";

   export default defineConfig({
     schema: "./db/schema.ts",
     out: "./db/migrations",
     dialect: "postgresql",
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

2. **File Descriptions**:

   - `index.ts`: Establishes and exports the database connection using Drizzle and Neon.
   - `schema.ts`: Defines the database schema with two tables:
     - **Customers**: Represents customer information.
     - **Tickets**: Represents tickets. Each ticket has a one-to-many relationship with customers.
   - `migrate.ts`: Handles the migration logic for creating or updating database tables.

### **6.5 Update `package.json`**

Add the following scripts to streamline the database generation and migration process:

```json
"scripts": {
  "db:generate": "drizzle-kit generate",
  "db:migrate": "tsx ./db/migrate.ts"
}
```

### **6.6 Generate and Migrate**

Run the following commands to generate and apply migrations:

```bash
npm run db:generate  # Generates migration files.
npm run db:migrate   # Applies migrations to the database.
```

#### **6.7 Creating Queries**

```
lib/queries
├── getCustomer.ts       # fetch single customer based on id
└── getTicket.ts         # fetch single tickets based on id
```

---

### **7. React-Hook-Form, Drizzle-Zod**

#### **7.1 Dependencies Installation**

Install the required dependencies using the following command:

```bash
npm i zod drizzle-zod react-hook-form @hookform/resolvers
```

#### **7.2 Schema Creation**

Create the customer and tickets types for type validation under the `lib/zod-schemas` directory:

```
lib/zod-schemas
├── customer.ts
└── ticket.ts
```

#### **7.3 Usage of `lib/zod-schemas`**

- The schemas are used in:
  - `app/(rs)/customers/form/CustomerForm.tsx` component, which is called by `page.tsx`.
  - `app/(rs)/tickets/form/CustomerForm.tsx` component, which is also called by `page.tsx`.

#### **7.4 React-Hook-Form Overview**

- [React-Hook-Form Documentation](https://react-hook-form.com/get-started)
- **Key Features**:
  - Simplifies form validation in React.
  - Avoids the need for multiple state variables for inputs, `onSubmit`, `onClick`, etc.

**Basic Usage Example**:

```tsx
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // Watch input value by passing the name of it

  return (
    /* "handleSubmit" validates inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Register input into the hook by invoking "register" */}
      <input defaultValue="test" {...register("example")} />

      {/* Include validation with required or other HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* Display errors if field validation fails */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
```
