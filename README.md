# 📦 Warehouse Management Dashboard

A modern and responsive **Warehouse Management Dashboard** built with React to simulate a real-world warehouse management system.

The project was developed as a practical application of front-end development concepts including **React, Redux Toolkit, React Router, Context API, reusable components, form validation, localStorage persistence, data visualization, and responsive UI design.**

---

## 📸 Overview

The Warehouse Management Dashboard provides a complete interface for managing the main operations of a warehouse, including:

* 📊 Dashboard & analytics
* 📦 Products management
* 🗂️ Categories management
* 👥 Clients management
* 🧾 Orders management
* 🔔 Notifications
* ⚙️ Settings
* 🔐 Authentication
* 🌙 Theme management
* 🔎 Search, filtering & sorting
* 📈 Business data visualization

The project focuses not only on building UI components, but also on implementing the **business logic behind warehouse operations**.

---

## 🎯 Project Purpose

This project was created as a large practical project to apply and connect the concepts I learned while studying front-end development.

Instead of building isolated small applications, the goal was to build a system where different parts of the application depend on each other.

For example:

```text
Products
   ↓
Orders
   ↓
Stock Management
   ↓
Order Status
   ↓
Notifications
   ↓
Dashboard Analytics
```

This helped me practice building a complete front-end application with interconnected data and business rules.

---

# ✨ Features

## 📊 Dashboard

The dashboard provides an overview of the warehouse data and business activity.

It includes:

* Total products
* Total orders
* Total clients
* Inventory information
* Recent orders
* Top clients
* Top selling products
* Top categories
* Sales analytics

### Dashboard time filters

The dashboard supports:

* Weekly data
* Monthly data
* Yearly data

The weekly analytics use a **Saturday → Friday** week structure.

Charts are used to make the data easier to understand and analyze.

---

# 📦 Products Management

The products section allows managing warehouse products.

### Features

* Add products
* Edit products
* Delete products
* Search products
* Sort products
* Filter products
* Assign products to categories
* Manage product quantity
* Manage product prices
* Display product information

Products are connected with orders so that order operations can affect inventory quantities.

---

# 🗂️ Categories Management

Categories are used to organize warehouse products.

### Features

* Create categories
* Edit categories
* Delete categories
* Search categories
* View category details
* View products belonging to a category
* Display category information

Dynamic routing is used for category details:

```text
/categories/:categoryId
```

---

# 👥 Clients Management

The clients section allows managing customer information.

### Features

* Add clients
* Edit clients
* Delete clients
* Search clients
* Sort clients
* View client details
* View client orders
* Calculate client order statistics

Client details use dynamic routing:

```text
/clients/:clientId
```

---

# 🧾 Orders Management

Orders are one of the main parts of the application.

Each order contains information such as:

```js
{
    clientId: "",
    products: [],
    status: "pending",
    createdAt: "",
}
```

### Order features

* Create orders
* Edit orders
* Delete orders
* View order details
* Search orders
* Sort orders
* Filter orders
* Update order status
* Calculate order totals
* Calculate total quantities
* Connect orders with clients
* Connect orders with products

Order details use dynamic routing:

```text
/orders/:orderId
```

---

# 📦 Inventory & Stock Management

One of the main business problems solved by the project is keeping product quantities synchronized with order status.

The application handles different order states such as:

```text
Pending
Completed
Cancelled
```

Stock behavior depends on the transition between these states.

For example:

```text
Pending → Completed
        ↓
   Decrease Stock
```

```text
Completed → Cancelled
          ↓
    Restore Stock
```

This prevents inventory quantities from being changed incorrectly when an order status changes.

---

# 🔔 Notifications System

The dashboard contains a notification system connected to application events.

Notifications can be generated for events such as:

* Low stock
* Out of stock
* Order completion
* Order cancellation
* Other important system events

Notifications are managed using Redux and displayed through reusable notification components.

---

# 🔐 Authentication

The project includes a simple front-end authentication system.

Authentication state is managed through Redux and browser `localStorage`.

Protected routes prevent unauthenticated users from accessing dashboard pages.

Example protected areas include:

```text
/dashboard
/products
/categories
/clients
/orders
/settings
/notifications
```

This authentication system is intended for **front-end practice and demonstration purposes**.

It is not a replacement for secure server-side authentication.

---

# 🛡️ Route Protection

The project uses `react-router-dom` for navigation and route protection.

The application contains:

* Protected routes
* Dynamic routes
* Detail pages
* Error pages
* Guards for specific resources

Examples:

```text
/categories/:categoryId
/clients/:clientId
/orders/:orderId
```

Resource guards are used to prevent accessing details for data that does not exist.

---

# 🔎 Search, Filter & Sort

Reusable search and data manipulation logic was implemented using custom hooks.

The project includes functionality for:

* Searching
* Filtering
* Sorting
* Different search methods
* Newest / oldest sorting
* Filtering by IDs or names
* Empty states when no results are found

Reusable hooks help keep this logic separate from UI components.

---

# 📈 Data Visualization

The dashboard uses charts to visualize warehouse data.

Charts include:

* Sales analytics
* Top clients
* Top products
* Top categories

The charts are built using:

**Recharts**

This allows the dashboard to transform raw Redux data into useful business information.

---

# ⚙️ Settings

The settings page provides controls for dashboard preferences.

It includes areas for:

* User profile
* Appearance
* Notifications
* Local data management
* Session management

The project also supports the concept of light/dark themes through shared CSS variables and theme-related state.

---

# 💾 Local Data Persistence

Because this project does not currently use a backend API, application data is persisted using browser `localStorage`.

Data such as:

* Products
* Categories
* Orders
* Clients
* Authentication state
* User information

can be stored locally.

This allows the application to preserve data between page refreshes.

> **Note:** localStorage is browser-specific. The data is not shared between different users or devices.

---

# 🧩 State Management

The project uses **Redux Toolkit** to manage global application state.

Main state areas include:

```text
Auth
Products
Categories
Orders
Clients
Notifications
```

Redux is mainly responsible for managing shared application data and business operations.

---

# 🧠 Context API

React Context API is used for state and behavior that is closely related to specific parts of the UI.

Examples include:

* Order modal management
* General modal management
* Order form state
* Modal actions

This creates a separation between global application state and UI-specific state.

---

# 🧱 Reusable Components

The project was designed around reusable components instead of putting everything inside page components.

Examples include:

* Tables
* Search inputs
* Empty states
* Modals
* Notification components
* Dashboard cards
* Charts
* Layout components
* Form components
* UI components

This makes the application easier to maintain and extend.

---

# 🎨 Styling

The project uses **CSS Modules** for component and page styling.

Example:

```text
dashboard.module.css
orders.module.css
settings.module.css
```

CSS Modules help prevent class-name conflicts between different parts of the application.

The project also uses CSS variables for shared theme values such as:

```text
Background colors
Text colors
Borders
Cards
Shadows
Theme colors
```

---

# 📱 Responsive Design

The dashboard was designed to work across different screen sizes.

The UI adapts components such as:

* Sidebar
* Navbar
* Tables
* Dashboard cards
* Charts
* Forms
* Modals

for smaller screens.

---

# 🧰 Technologies Used

## Core

* React
* JavaScript
* HTML
* CSS

## State Management

* Redux Toolkit
* React Context API

## Routing

* React Router DOM

## UI Libraries

* Mantine
* Bootstrap
* MUI

## Data Visualization

* Recharts

## Icons

* Font Awesome

## Data Persistence

* Browser localStorage

---

# 📁 Project Structure

The project follows a modular structure:

```text
src/
│
├── components/
│   ├── charts/
│   ├── empty/
│   ├── forms/
│   ├── inputs/
│   ├── layout/
│   ├── modals/
│   ├── notifications/
│   ├── table/
│   └── ui/
│
├── hooks/
│
├── pages/
│   ├── dashboard/
│   ├── products/
│   ├── categories/
│   ├── clients/
│   ├── orders/
│   ├── settings/
│   └── notifications/
│
├── providers/
│
├── redux/
│   ├── app/
│   └── features/
│       └── slices/
│
├── routes/
│
├── styles/
│
└── utils/
    ├── guards/
    ├── validation/
    └── ...
```

---

# 🧩 Problems Solved During Development

This project was not only about building pages. A major part of the development process was solving real application problems.

## 1. Inventory synchronization

The application needed to make sure that product quantities changed correctly when order statuses changed.

For example:

```text
Pending → Completed
```

should decrease inventory.

While:

```text
Completed → Cancelled
```

should restore inventory.

---

## 2. Order and product relationships

Orders depend on products and clients.

The application needed to correctly connect:

```text
Order
 ├── Client
 └── Products
      ├── Quantity
      └── Price
```

This relationship is used throughout order creation, editing, details, and analytics.

---

## 3. Dynamic routes

The project uses dynamic URLs for details pages.

Examples:

```text
/orders/:orderId
/clients/:clientId
/categories/:categoryId
```

The application also handles invalid IDs through guards and error pages.

---

## 4. Data persistence

Because there is no backend, the project needed a way to preserve data after refreshing the browser.

This problem was solved using:

```text
localStorage
```

combined with Redux state.

---

## 5. Reusable search and sorting

Instead of writing search and sorting logic repeatedly for every table, reusable hooks were created.

This makes the same logic usable in multiple pages.

---

## 6. Dashboard analytics

Raw warehouse data needed to be transformed into useful information.

The dashboard calculates things such as:

* Sales
* Top clients
* Top products
* Top categories
* Recent orders
* Time-based statistics

This required combining data from multiple Redux slices.

---

## 7. Notifications

The project needed to notify the user when important events occurred.

A Redux-based notification system was created to handle these events.

---

## 8. Route protection

The dashboard contains pages that should only be accessible after authentication.

Protected routes and guards were implemented to handle this behavior.

---

# 💡 What I Learned From This Project

Building this project helped me understand how different React concepts work together inside a larger application.

The main concepts practiced were:

* Component architecture
* React state management
* Redux Toolkit
* Context API
* React Router
* Dynamic routes
* Protected routes
* Custom hooks
* Form validation
* CRUD operations
* Data relationships
* Business logic
* localStorage persistence
* Reusable components
* CSS Modules
* Responsive design
* Data visualization
* Conditional rendering
* Performance considerations
* Error handling

The biggest learning experience was not building individual components, but understanding how **different parts of the application communicate with each other**.

---

# 🚀 Future Improvements

The current project is intentionally front-end focused.

Possible future improvements include:

* Backend API
* Database integration
* Real authentication
* User roles and permissions
* Server-side validation
* Real-time notifications
* Multi-user support
* Cloud data storage
* Pagination
* Automated testing
* Better error handling
* API loading and error states

A future backend could replace the current localStorage architecture with a real database and API.

---

# ⚠️ Current Limitations

This project is a **front-end training project**, so it has some limitations.

### No backend

All data is currently stored locally in the browser.

### Authentication is not production-ready

The authentication system is intended for demonstration and learning.

### Data is browser-specific

Data stored in localStorage is not synchronized between devices or users.

### No real database

There is currently no external database or API.

---

# 🎯 Project Goal

The main goal of this project was to move from building small isolated React components to building a **complete front-end application with interconnected business logic**.

The project demonstrates how React can be used to build a realistic management system rather than only static interfaces.

---

# 👨‍💻 Developer

**Omar Badwy**

Junior Front-End Developer

### Technologies

```text
HTML
CSS
JavaScript
Bootstrap
MUI
React
Redux Toolkit
React Router
Context API
Mantine
Recharts
```

---

## ⭐ Final Note

This project represents a practical step in my journey as a front-end developer.

It was built to practice real application architecture, state management, business logic, reusable components, routing, data visualization, and user interaction.

The project is continuously improving as I learn more about front-end architecture and software development.

