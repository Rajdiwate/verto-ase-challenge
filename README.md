# Simple Shopping Cart

A full-stack shopping cart application built with React, TypeScript, Node.js, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- PostgreSQL database (local or remote)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd simple-shopping-cart  # or your repository name
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The client will be available at `http://localhost:5173`

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Get a PostgreSQL database URL from [Neon DB](https://neon.tech/) or run a local PostgreSQL instance using Docker:
     ```bash
     docker run --name shopping-cart-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
     ```
   - Update the database URL in the `.env` file (Note: The `.env` file is committed to the repository with dummy values for demonstration purposes)

4. Run database migrations:
   ```bash
   npm run db:migrate
   ```

5. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. The server will be available at `http://localhost:3000`

### Connecting Client to Server

1. In the client directory, open `src/config/api.ts` and update the `API_BASE_URL` to match your server's URL (default: `http://localhost:3000`)

2. Restart the client development server if it's already running

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## Environment Variables

The following environment variables are used in the server's `.env` file:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=240000
```

## Live Demo

Check out the live demo of the application:
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Demo-green)](https://your-deployment-url.vercel.app)
