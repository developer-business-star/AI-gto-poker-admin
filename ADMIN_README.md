# GTO Poker AI Assistant - Admin Portal

A comprehensive admin dashboard for managing the GTO Poker AI Assistant platform with beautiful UI and full functionality.

## 🚀 Features

### Authentication System
- **Secure Login**: Beautiful admin login page with form validation
- **Session Management**: Token-based authentication with localStorage
- **Protected Routes**: Middleware protection for all admin routes
- **Auto-redirect**: Automatic redirection based on authentication status

### Admin Dashboard
- **Overview Dashboard**: Real-time statistics and key metrics
- **User Management**: Complete user administration interface
- **AI Performance Monitoring**: Track AI model accuracy and performance
- **Revenue Analytics**: Financial metrics and conversion tracking
- **Activity Feed**: Real-time user activity monitoring
- **Responsive Design**: Mobile-first responsive design

### UI Components
- **Modern Design**: Glass-morphism design with gradient backgrounds
- **Interactive Elements**: Smooth animations and hover effects
- **Reusable Components**: Modular Button and Card components
- **Icon Integration**: Lucide React icons throughout
- **Dark Theme**: Professional dark theme with purple/pink accents

## 🛠️ Technical Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS 4.0 with custom gradients
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript support
- **Authentication**: Custom token-based system
- **Middleware**: Next.js middleware for route protection

## 📁 Project Structure

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout wrapper
│   ├── login/
│   │   └── page.tsx        # Admin login page
│   └── dashboard/
│       └── page.tsx        # Main admin dashboard
├── components/
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       └── Card.tsx        # Reusable card component
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Landing page
middleware.ts               # Route protection middleware
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

### Demo Credentials

**Admin Login**:
- Username: `admin`
- Password: `admin123`

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Background**: Slate to Purple gradient (`from-slate-900 via-purple-900 to-slate-900`)
- **Glass Effect**: `bg-white/10 backdrop-blur-lg` with `border-white/20`
- **Text**: White primary, slate-300 secondary

### Interactive Elements
- **Hover Effects**: Scale transforms and color transitions
- **Loading States**: Spinner animations for async operations
- **Form Validation**: Real-time error display
- **Responsive**: Mobile-first design with breakpoints

## 📊 Dashboard Sections

### Overview Tab
- **User Statistics**: Total users, active users, conversion rates
- **Revenue Metrics**: Monthly revenue, growth percentages
- **AI Performance**: Accuracy rates, response times, satisfaction scores
- **Recent Activity**: Live feed of user actions

### User Management
- **User Table**: Complete user listing with search and filters
- **Plan Management**: Track user subscription plans
- **Usage Analytics**: Monitor user engagement levels
- **Action Buttons**: Quick user management actions

### AI Performance
- **Model Metrics**: Accuracy, response time, uptime statistics
- **Training Data**: Model version and training information
- **Performance Charts**: Visual representation of AI metrics
- **Retrain Options**: Manual model retraining controls

## 🔐 Security Features

- **Route Protection**: Middleware-based authentication
- **Token Management**: Secure token storage and validation
- **Session Handling**: Automatic logout on token expiration
- **Input Validation**: Form validation and sanitization

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for production:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
ADMIN_SECRET_KEY=your-secret-key
```

## 🔧 Customization

### Adding New Dashboard Tabs
1. Add new tab to sidebar navigation in `dashboard/page.tsx`
2. Create corresponding content section
3. Update state management for tab switching

### Styling Customization
- Modify color schemes in Tailwind classes
- Update gradients in component styles
- Customize glass effects and backdrop blur

### Adding New Components
- Create components in `app/components/ui/`
- Follow existing patterns for consistency
- Export from index files for easy imports

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar with overlay
- **Tablet**: Optimized grid layouts
- **Desktop**: Full sidebar with expanded content
- **Breakpoints**: sm, md, lg, xl responsive utilities

## 🎯 Future Enhancements

- **Real API Integration**: Replace mock data with real APIs
- **Advanced Analytics**: Charts and graphs for data visualization
- **User Roles**: Multiple admin permission levels
- **Notifications**: Real-time notification system
- **Export Features**: Data export capabilities
- **Audit Logs**: Complete action logging system

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Built with ❤️ for the GTO Poker AI Assistant Platform**