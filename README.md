# Notification Panel Demo

This project is a demonstration of a notification panel built with Next.js, Prisma, and PostgreSQL.

## Features

- Display notifications with different types
- Create new notifications
- Mark notifications as read
- Filter notifications by type
- Responsive design

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

## Setup

1. Clone the repository:
git clone https://github.com/your-username/notification-panel.git
cd notification-panel
Copy
2. Install dependencies:
npm install
Copy
3. Set up the database:
- Create a PostgreSQL database named `notification_panel`
- Update the `.env` file in the project root with your database credentials:
  ```
  DATABASE_URL="postgresql://username:password@localhost:5432/notification_panel?schema=public"
  ```

4. Generate Prisma client and apply migrations:
npx prisma generate
npx prisma migrate dev --name init
Copy
## Seeding the Database

To populate the database with initial data:

1. Ensure your `prisma/seed.ts` file is set up correctly.

2. Run the seed script:
npm run db:seed
Copy
If you encounter any issues, try:
npx dotenv -e .env -- tsx prisma/seed.ts
Copy
## Running the Application

1. Start the development server:
npm run dev
Copy
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

If you encounter database-related issues:

1. Verify your database connection:
npx prisma db pull
Copy
2. Reset the database (this will delete all data):
npx prisma migrate reset
Copy
3. If you make changes to the Prisma schema, apply them with:
npx prisma db push
Copy
## Project Structure

- `/app`: Next.js app router files
- `/api`: API routes
- `layout.tsx`: Root layout component
- `page.tsx`: Home page component
- `/components`: React components
- `NotificationPanel.tsx`: Main notification panel component
- `NotificationItem.tsx`: Individual notification component
- `CreateNotificationForm.tsx`: Form for creating new notifications
- `/prisma`: Prisma schema and migrations
- `schema.prisma`: Database schema
- `seed.ts`: Database seeding script
- `/public`: Static files
- `/styles`: CSS files
- `globals.css`: Global styles and Tailwind directives

## Technologies Used

- Next.js 13+
- React 18
- Prisma
- PostgreSQL
- TypeScript
- Tailwind CSS
- Radix UI for accessible components
- React Hook Form for form handling
- Zod for schema validation

## API Routes

- `GET /api/notifications`: Fetch all notifications
- `POST /api/notifications`: Create a new notification
- `PUT /api/notifications`: Mark a notification as read

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)