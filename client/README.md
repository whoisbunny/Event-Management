# Event Management System Frontend

A modern, responsive web application built with React, TypeScript, Redux Toolkit, and Shadcn UI components powered by Tailwind CSS.

## Features

- 🔐 User Authentication (Login/Signup)
- 📅 Event Management (Create, Read, Update, Delete)
- 🎨 Modern UI with Shadcn UI Components
- 🌓 Dark/Light Theme Support
- 📱 Fully Responsive Design
- 🔄 Real-time Form Validation
- 🚀 Redux State Management
- ⚡ Vite for Fast Development

## Tech Stack

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Form Validation**: Zod
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## Requirements

- Node.js 16.x or higher
- npm or yarn package manager

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variable to your `.env` file:


```env
VITE_API_URL="http://localhost:4000/api/"
```

### Notes:
- `VITE_API_URL` is the base URL for the backend API and make sure to add `/api/` on end of your backend API


## Project Structure

```
src/
├── components/      # Reusable UI components
├── configs/         # API configuration
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API service functions
├── store/          # Redux store and reducers
└── utils/          # Utility functions and types
```

## Features in Detail

### Authentication
- Login and Signup functionality
- Protected routes
- Auto logout on token expiry

### Event Management
- List events with pagination
- Create new events
- Edit existing events
- Delete events
- Search and filter events

### UI Components
- Responsive navigation
- Modal dialogs
- Data tables
- Form components
- Loading states
- Toast notifications

## API Services

### Authentication Service (`auth.service.ts`)
- Login: `POST /auth/login`
- Signup: `POST /auth/signup`
- Logout: `GET /auth/logout`
- Get user profile: `GET /auth/profile`

### Event Service (`event.service.ts`)
- Get events: `GET /event/?{query}`
- Create event: `POST /event`
- Update event: `PUT /event/:id`
- Delete event: `DELETE /event/:id`

## State Management

### Auth Reducer (`authReducer.ts`)
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  isLoggedin: boolean;
}
```

### Event Reducer (`eventReducer.ts`)
```typescript
interface EventState {
  events: IEventList | null;
  loading: boolean;
  error: string | null;
  editEventModal: boolean;
  editItem: IEvent | null;
  openEventModal: boolean;
}
```

## Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop
- Tablet
- Mobile devices

This is achieved through:
- Tailwind CSS breakpoints
- Flexible grid layouts
- Mobile-first approach
- Responsive navigation

## Theme Support

- Built-in dark/light mode using Shadcn UI theming
- System preference detection
- Persistent theme selection
- Custom theme configuration in `components.json`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
