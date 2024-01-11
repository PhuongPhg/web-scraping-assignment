"use client";
import { CardWrapper } from "@/components/CardWrapper";
import { ProductCard } from "@/components/ProductCard";
import { IProductItem } from "@/types/laptop";
import { getDisplayFloatNumber } from "@/utils/product";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback } from "react";

export default function Home() {
  const fetchLaptopList = useCallback(
    async () => await fetch("/api/scrape").then((res) => res.json()),
    []
  );

  const { data, isFetching, isError } = useQuery({
    queryKey: ["laptopList"],
    queryFn: fetchLaptopList,
    initialData: { list: [], averageStorageCapacity: 0 },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-blue-50/75">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The data is scraped from &nbsp;
          <code className="font-mono font-bold">
            <Link href="https://webscraper.io/test-sites/e-commerce/more/computers/laptops">
              Web Scraper Test Sites
            </Link>
          </code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          By Phoebe
        </div>
      </div>
      <div className="my-8">
        <h1 className="text-4xl font-bold text-center mb-8">Special</h1>
        <div className="grid grid-cols-3 gap-3">
          {!!data.mostExpensive && (
            <CardWrapper>
              <h1 className="text-xl">
                <strong>The most expensive laptop</strong>
              </h1>
              <ProductCard product={data.mostExpensive} />
            </CardWrapper>
          )}
          {!!data.mostReviewed && (
            <CardWrapper>
              <h1 className="text-xl">
                <strong>The most reviewes laptop</strong>
              </h1>
              <ProductCard product={data.mostReviewed} />
            </CardWrapper>
          )}
          <CardWrapper>
            <div className="flex items-center justify-center flex-col h-full text-center">
              <h1 className="text-xl">
                <strong>The average storage capacity of all laptop</strong>
              </h1>
              <div className="text-4xl font-bold h-full m-auto text-center flex items-center justify-center text-blue-600/90">
                {getDisplayFloatNumber(data.averageStorageCapacity)} GB
              </div>
            </div>
          </CardWrapper>
        </div>
      </div>
      <div className="my-8">
        <h1 className="text-4xl font-bold text-center mb-8">All laptops</h1>
        <div className="grid grid-cols-4 gap-4">
          {data.list.map((item: IProductItem) => (
            <CardWrapper key={item.id}>
              <ProductCard product={item} />
            </CardWrapper>
          ))}
        </div>
      </div>
    </main>
  );
}
