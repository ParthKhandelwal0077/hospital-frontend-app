# Healthcare Management System - Frontend

A comprehensive healthcare management system frontend built with Next.js and TypeScript, designed to work with a Django backend.

## 🚀 Features

- **Authentication System**: JWT-based authentication with login/register functionality
- **Patient Management**: Complete CRUD operations for patient records
- **Doctor Management**: Comprehensive doctor profiles with specializations
- **Patient-Doctor Mapping**: Efficient assignment and management of patient-doctor relationships
- **Dashboard**: Overview of system statistics and recent activities
- **Responsive Design**: Modern, mobile-friendly interface

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Performant forms with easy validation
- **Axios**: Promise-based HTTP client
- **Lucide React**: Beautiful & consistent icons
- **React Hot Toast**: Elegant toast notifications

### Backend Integration
- **Django 4.2.7**: Robust web framework
- **Django REST Framework 3.14.0**: API development
- **JWT Authentication**: Secure token-based authentication
- **SQLite/PostgreSQL**: Reliable data storage

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Django backend at `http://127.0.0.1:8000`

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
healthcare-frontend/
├── app/                      # Next.js app directory
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Dashboard page
│   ├── patients/            # Patient management
│   ├── doctors/             # Doctor management
│   ├── mappings/            # Patient-doctor mappings
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── auth/                # Authentication components
│   ├── doctors/             # Doctor-related components
│   ├── layout/              # Layout components
│   ├── mappings/            # Mapping components
│   ├── patients/            # Patient-related components
│   └── ui/                  # UI components
├── lib/                     # Utility libraries
│   ├── api.ts               # API client configuration
│   ├── auth.ts              # Authentication utilities
│   └── types.ts             # TypeScript type definitions
└── public/                  # Static assets
```

## 🔑 API Integration

The frontend integrates with the following backend endpoints:

### Authentication APIs
- `POST /api/auth/api_register/` - User registration
- `POST /api/auth/api_login/` - User login
- `GET /api/auth/api_profile/` - Get user profile
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Patient Management APIs
- `GET /api/patients/api/` - List patients
- `POST /api/patients/api/` - Create patient
- `GET /api/patients/api/<id>/` - Get patient details
- `PUT /api/patients/api/<id>/` - Update patient
- `DELETE /api/patients/api/<id>/` - Delete patient

### Doctor Management APIs
- `GET /api/doctors/api/` - List doctors
- `POST /api/doctors/api/create/` - Create doctor
- `GET /api/doctors/api/<id>/` - Get doctor details
- `PATCH /api/doctors/api/<id>/update/` - Update doctor
- `DELETE /api/doctors/api/<id>/delete/` - Delete doctor

### Patient-Doctor Mapping APIs
- `GET /api/mappings/` - List mappings
- `POST /api/mappings/` - Create mapping
- `GET /api/mappings/patient/<patient_id>/` - Get patient's doctors
- `PATCH /api/mappings/<id>/update/` - Update mapping
- `DELETE /api/mappings/<id>/` - Delete mapping

## 🎨 UI Components

The application includes a comprehensive set of reusable UI components:

- **Button**: Customizable button with variants and loading states
- **Input**: Form input with label and error handling
- **Select**: Dropdown select component
- **Card**: Container component for content sections
- **Modal**: Overlay modal for forms and details
- **AuthGuard**: Protected route wrapper

## 🔒 Authentication Flow

1. **Registration**: Users can create accounts with email verification
2. **Login**: JWT tokens are stored in localStorage
3. **Auto-refresh**: Tokens are automatically refreshed when expired
4. **Protected Routes**: AuthGuard component protects authenticated pages
5. **Logout**: Tokens are cleared and user is redirected

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚦 Getting Started

1. **Start the Django backend** (ensure it's running on port 8000)
2. **Install and start the frontend** (follows installation steps above)
3. **Create an account** or login with existing credentials
4. **Explore the features**:
   - Add patients and doctors
   - Create patient-doctor mappings
   - View dashboard statistics
   - Manage all records with full CRUD operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Issues & Support

For issues and support, please create an issue in the repository or contact the development team.

---

**Note**: Make sure your Django backend is running and accessible at `http://127.0.0.1:8000` before starting the frontend application.