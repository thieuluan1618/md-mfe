# TheKeo - Bill Sharing App
## Product Requirements Document (PRD)

### 📋 Executive Summary
TheKeo is a fun, intuitive bill-sharing application designed for friends to easily track shared expenses, upload receipt photos, and manage payments. The app focuses on simplicity and visual appeal while providing powerful tracking capabilities.

---

## 🎯 Product Vision & Goals

### Vision Statement
"Make bill sharing with friends as easy and fun as sharing the experiences themselves."

### Primary Goals
- Eliminate awkward money conversations between friends
- Provide visual proof of expenses through photo uploads
- Simplify payment tracking and settlement
- Create an enjoyable user experience around bill management

### Success Metrics
- User retention rate > 70% after first month
- Average bills tracked per user per month > 10
- Time to create new bill < 2 minutes
- User satisfaction score > 4.5/5

---

## 👥 Target Audience

### Primary Users
- Young adults (18-35) who frequently share expenses
- Friend groups who regularly dine out, travel together, or share living expenses
- Roommates managing household bills
- Social groups organizing events and activities

### User Personas
**"Social Sarah"** - 25, frequently organizes group dinners and events
**"Practical Paul"** - 28, roommate who wants fair expense splitting
**"Busy Ben"** - 30, travels often with friends and needs quick expense tracking

---

## ⭐ Core Features & Requirements

### 1. User Management
**Must Have:**
- User registration/login (email + password)
- User profile with display name and avatar
- Friend system (add friends by email/username)
- Friend groups for recurring expense sharing

**Should Have:**
- Social login (Google, Facebook)
- User verification system
- Privacy settings for profile visibility

### 2. Bill Creation & Management
**Must Have:**
- Create bills with title, amount, date
- Photo upload for receipts (max 5MB, jpg/png)
- Select who paid the bill
- Choose participants for splitting
- Automatic equal split calculation
- Custom split amounts (manual override)
- Edit/delete bills (with permissions)
- Bill categories (Food, Transport, Entertainment, etc.)

**Should Have:**
- Multiple photo uploads per bill
- OCR text extraction from receipt photos
- Recurring bill templates
- Bill duplication feature
- Bulk bill import

### 3. Payment Tracking
**Must Have:**
- Track individual payment status per bill
- Mark payments as complete/partial/pending
- Payment amount input with validation
- Settlement notifications
- Payment history per user
- Outstanding balance calculations

**Should Have:**
- Payment method tracking (cash, Venmo, etc.)
- Payment due date reminders
- Automatic settlement suggestions
- Integration with payment apps (Venmo, PayPal)

### 4. Dashboard & Analytics
**Must Have:**
- Personal spending summary
- Outstanding balances (owed/owing)
- Recent bills list
- Friend-wise expense breakdown
- Monthly/yearly spending totals

**Should Have:**
- Spending trends and analytics
- Category-wise expense breakdown
- Export functionality (CSV, PDF)
- Spending budgets and alerts

---

## 🛠 Technical Requirements

### Frontend (React/Next.js)
```
Tech Stack:
- Framework: Next.js 14+ with App Router
- Styling: Tailwind CSS
- State Management: Zustand or React Context
- UI Components: shadcn/ui or custom components
- Icons: Lucide React
- Forms: React Hook Form + Zod validation
- Image handling: Next.js Image component
```

### Backend (Node.js/Express)
```
Tech Stack:
- Runtime: Node.js 18+
- Framework: Express.js or Fastify
- Database: PostgreSQL with Prisma ORM
- Authentication: NextAuth.js or custom JWT
- File Storage: AWS S3 or Cloudinary
- Image Processing: Sharp
- API Documentation: Swagger/OpenAPI
```

### Database Schema
```sql
-- Core Tables
Users (id, email, password_hash, display_name, avatar_url, created_at)
Friendships (id, user_id, friend_id, status, created_at)
Groups (id, name, description, created_by, created_at)
Group_Members (group_id, user_id, role, joined_at)
Bills (id, title, amount, category, image_urls[], created_by, group_id, created_at)
Bill_Participants (bill_id, user_id, amount_owed, paid_amount, is_settled)
Payments (id, bill_id, payer_id, amount, method, notes, created_at)
```

### API Endpoints
```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me

Users & Friends:
GET /api/users/profile
PUT /api/users/profile
GET /api/users/friends
POST /api/users/friends/add
DELETE /api/users/friends/:id

Bills:
GET /api/bills
POST /api/bills
GET /api/bills/:id
PUT /api/bills/:id
DELETE /api/bills/:id
POST /api/bills/:id/images

Payments:
POST /api/bills/:id/payments
PUT /api/payments/:id
GET /api/users/:id/balance

Analytics:
GET /api/analytics/spending
GET /api/analytics/friends
```

---

## 📱 Platform Requirements

### Mobile-First Design
- Responsive design for mobile (320px - 768px)
- Touch-friendly interface elements
- Optimized for one-handed use
- Fast loading on mobile networks

### Progressive Web App (PWA)
- Offline capability for viewing bills
- Push notifications for payments
- App-like experience on mobile devices
- Camera access for photo capture

### Performance Requirements
- Page load time < 3 seconds
- Image upload < 30 seconds
- Real-time updates for shared bills
- Support for 100+ bills per user

---

## 🔒 Security & Privacy

### Data Protection
- HTTPS everywhere
- Password hashing with bcrypt
- JWT token security
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Privacy Features
- User data encryption at rest
- Option to delete account and all data
- Privacy settings for bill visibility
- Secure image storage with access controls

---

## 🚀 Development Phases

### Phase 1: MVP (4-6 weeks)
- [x] UI/UX prototype completed
- [ ] User authentication system
- [ ] Basic bill creation and photo upload
- [ ] Friend management
- [ ] Simple payment tracking
- [ ] Responsive mobile design

### Phase 2: Enhanced Features (6-8 weeks)
- [ ] Advanced payment tracking
- [ ] Group management
- [ ] Bill categories and filtering
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] PWA implementation

### Phase 3: Advanced Features (8-10 weeks)
- [ ] OCR for receipt scanning
- [ ] Payment app integrations
- [ ] Advanced analytics
- [ ] Recurring bills
- [ ] Export functionality
- [ ] Admin panel

---

## 🧪 Testing Strategy

### Unit Testing
- Component testing with Jest + React Testing Library
- API endpoint testing
- Database operation testing
- Utility function testing

### Integration Testing
- End-to-end user flows with Playwright
- API integration testing
- Image upload and processing testing
- Payment calculation accuracy testing

### User Acceptance Testing
- Beta testing with 20-30 friend groups
- Usability testing sessions
- Performance testing on various devices
- Security penetration testing

---

## 📈 Launch Strategy

### Pre-Launch
- Closed beta with selected friend groups
- Performance optimization
- Security audit
- Documentation completion

### Launch
- Soft launch to personal networks
- Social media marketing
- Product Hunt submission
- App store submissions (if native apps)

### Post-Launch
- User feedback collection
- Bug fixes and improvements
- Feature requests prioritization
- Growth strategy implementation

---

## 🔧 Development Setup

### Required Tools
```bash
# Development Environment
Node.js 18+
PostgreSQL 14+
Git
VS Code or preferred IDE

# Package Managers
npm or yarn
Docker (optional for local DB)

# Deployment
Vercel or Netlify (frontend)
Railway or Render (backend)
AWS S3 (file storage)
```

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-purple: #8b5cf6
--primary-pink: #ec4899
--primary-red: #ef4444

/* Neutral Colors */
--background: #0f0f23
--surface: rgba(255, 255, 255, 0.1)
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.7)

/* Status Colors */
--success: #10b981
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6
```

### Typography
```css
/* Font Families */
--font-primary: 'Inter', sans-serif
--font-display: 'Poppins', sans-serif

/* Font Sizes */
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
```

---

## 📞 Support & Maintenance

### Documentation
- User guides and tutorials
- API documentation
- Developer setup guides
- Troubleshooting guides

### Support Channels
- In-app help center
- Email support
- FAQ section
- Community Discord/Slack

### Maintenance Schedule
- Weekly dependency updates
- Monthly performance reviews
- Quarterly feature releases
- Annual security audits

---

## 📋 Acceptance Criteria

### Definition of Done
- [ ] Feature meets all functional requirements
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] UI/UX approved by design team
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] QA testing completed
- [ ] Stakeholder approval received

### Quality Gates
- No critical bugs in production
- Page load times under target metrics
- Mobile responsiveness verified
- Accessibility standards met (WCAG 2.1 AA)
- Cross-browser compatibility confirmed

---

*This PRD serves as the single source of truth for TheKeo development. All team members should refer to this document for feature requirements, technical specifications, and project timelines.*