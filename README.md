# Holistic Agro Client

A modern e-commerce web application for agricultural products built with React, Vite, and Tailwind CSS. This is the frontend client for the Holistic Agro platform, providing a seamless shopping experience for agricultural products and solutions.

## 🌱 About

Holistic Agro Client is a comprehensive agricultural e-commerce platform that connects farmers and agricultural enthusiasts with high-quality products and solutions. The platform features product browsing, user authentication, order management, and administrative tools.

## ✨ Features

- **Product Catalog**: Browse and search through a wide range of agricultural products
- **User Authentication**: Secure login/signup with Firebase integration
- **Shopping Cart**: Add products to cart and manage orders
- **Category Filtering**: Filter products by categories for easy navigation
- **Admin Dashboard**: Comprehensive admin panel for product and order management
- **Employee Management**: Job postings and employee management system
- **Problem & Solutions**: Community-driven problem-solving platform
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Real-time Updates**: Dynamic content updates with React Query

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Styling**: Tailwind CSS 3.4.17 + DaisyUI 4.12.23
- **State Management**: React Query (TanStack Query) 5.64.2
- **Routing**: React Router DOM 7.1.1
- **Authentication**: Firebase 11.1.0
- **HTTP Client**: Axios 1.7.9
- **Form Handling**: React Hook Form 7.54.2
- **Rich Text Editor**: Jodit React 5.2.5
- **Icons**: React Icons 5.4.0
- **Notifications**: SweetAlert2 11.15.10
- **Carousel**: Swiper 11.2.1
- **Loading Spinners**: React Spinners 0.15.0

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AllProducts.jsx
│   ├── Banner.jsx
│   ├── Collection.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ...
├── pages/               # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProductDetailsPage.jsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.jsx
│   ├── useProducts.jsx
│   ├── useOrders.jsx
│   └── ...
├── layouts/            # Layout components
│   ├── MainLayout.jsx
│   └── DashboardLayout.jsx
├── routes/             # Routing configuration
│   ├── routes.jsx
│   └── private/
├── providers/          # Context providers
│   └── AuthProviders.jsx
├── firebase-config/    # Firebase configuration
└── config.js          # App configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/holistic-agro-client.git
   cd holistic-agro-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with DaisyUI for styling. Configuration can be found in:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Vite Configuration
Build and development settings are configured in `vite.config.js`.

### ESLint
Code linting rules are defined in `eslint.config.js`.

## 📱 Key Features Details

### User Features
- **Product Browsing**: View all products with filtering and search capabilities
- **Product Details**: Detailed product information with images and descriptions
- **Shopping Cart**: Add/remove products and manage quantities
- **User Orders**: Track order history and status
- **Authentication**: Secure login/signup with Firebase

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **Category Management**: Create and manage product categories
- **Employee Management**: Manage staff and job applications
- **Coupon System**: Create and manage discount coupons

### Additional Features
- **Problem & Solutions**: Community platform for agricultural problem-solving
- **Career Section**: Job postings and applications
- **Company Information**: About us and company details
- **Policies**: Return and refund policy pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Project Type**: MERN Stack E-commerce Application
- **Client**: Holistic Agro

## 📞 Support

For support and questions, please contact:
- Email: support@holisticagro.com
- Website: [Holistic Agro](https://holisticagro.com)

## 🙏 Acknowledgments

- React community for the amazing ecosystem
- Tailwind CSS for the utility-first CSS framework
- Firebase for authentication and hosting services
- All contributors and testers

---

**Made with ❤️ for sustainable agriculture**
