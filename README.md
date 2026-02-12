# Flamora Atelier

This is a Next.js e-commerce website for the fictional candle brand, Flamora. It was bootstrapped with Firebase Studio.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Building for Production

To create a production-ready build, run:

```bash
npm run build
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

This project can be deployed to Vercel without any environment variables.

## Future Enhancements

The current application uses mock data located in `src/data/mock-data.ts`. To transition to a production-ready application, you can replace this mock data service with a real database or a headless CMS.

Some popular options include:
- **Database + ORM**: PostgreSQL with Prisma
- **Backend-as-a-Service**: Supabase or Firebase
- **Headless CMS**: Sanity, Contentful, or Strapi
