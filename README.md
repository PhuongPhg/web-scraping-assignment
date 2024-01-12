This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# [Live demo](https://web-scraping-assignment-f9d06870fb99.herokuapp.com/)

## Info

- Project: E-commerce Data Analysis Application
- The scraped website: [Web Scraper Test Sites](https://webscraper.io/test-sites/e-commerce/more/computers/laptops)

## Features, Technical Information:

- Data Scraping:

  - using `Python` with `BeautifulSoup` to scrape the data with the information like name, price, description. -> [app/api/scrape/index.py](app/api/scrape/index.py)

- Data Analysis:

  - I send the scraped data to `JavaScript` (using `NextJs`, a framework base on `React`), find the calculation formula for number of reviews on the source of the website, find the storage capacity from the product's description and return the needed information.
  - To return the data, I use `NextJs`'s feature which is [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) which serves as an API and they will handle everything on the server-side so the data is return faster and not create any client bundle size. -> [app/api/scrape/route.ts](app/api/scrape/route.ts)

- PDF Generation:

  - I use `jsPDF` with the help of `jspdf-autotable` to render the PDF file quickly, based on the data above with all the informations that shows on the screen.

- User Interface:
  - I use `NextJs` to create the UI and `tailwind` to style the application due to it friendly, faster and can reduce the duplicated style.

## Getting Started

First, run the development server:
Note: Please make sure you have the node version >= 18.17.x and Python environment on your local

```bash
npm i
npm run prestart
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
