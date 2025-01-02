# **Project Documentation**

## **Technologies Used**

- **React** (v19) – A JavaScript library for building user interfaces
- **Next.js** (v15) – The React Framework for the Web with SSR support
- **Tailwind CSS** – Utility-first CSS framework
- **Shadcn/UI** – Component library
- **Sentry** – Application monitoring and error tracking
- **Kinde** – Authentication and authorization service

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

Shadcn is used for reusable UI components. Below are the components implemented in the project:

### **3.1 Components Used**

1. **Dark Mode Toggle**:

   - Created in `components/theme-provider.tsx`.
   - Integrated with `ThemeProvider` in the root layout (`app/layout.tsx`).
   - Dark mode toggle added in `components/ModeToggle.jsx` and used in `components/Header.tsx`.

2. **Button**:

   - Created in `components/ui/button.tsx`.
   - Used in `components/Header.tsx`, `app/note-found.tsx`.

3. **Dropdown Menu**:

   - Created in the same directory as Button.
   - Used in `components/ModeToggle.tsx`.

### **3.2 Adding Components**

Install a Shadcn component using the following command:

```bash
npx shadcn@latest add component
```

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
