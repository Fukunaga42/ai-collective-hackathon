This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Local MongoDB (Docker)

Use Docker to run MongoDB locally for development.

1) Start MongoDB 7 container

```bash
docker run -d \
  --name mongo \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  mongo:7
```

2) Verify it is running

```bash
docker ps
# or check logs
docker logs -f mongo
```

3) Environment configuration

Create `.env.local` in project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/hackathon
MONGODB_DB=hackathon
```

4) Install dependencies and start the app

```bash
npm install
npm run dev
```

5) Stop/cleanup (when needed)

```bash
docker stop mongo
docker start mongo
# remove container and data volume if you want a clean slate
docker rm -f mongo
docker volume rm mongo_data
```
