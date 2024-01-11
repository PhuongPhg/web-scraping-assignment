"use client";
import { CardWrapper } from "@/components/CardWrapper";
import { CommonButton } from "@/components/CommonButton";
import { ProductCard } from "@/components/ProductCard";
import { ProductTable } from "@/components/ProductTable";
import { IProductItem, IProductResponse } from "@/types/product";
import { generateProductDom, getDisplayFloatNumber } from "@/utils/product";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import Link from "next/link";
import { useCallback, useRef } from "react";

export default function Home() {
  const listContentRef = useRef<HTMLDivElement>(null);
  const fetchLaptopList = useCallback(
    async () => await fetch("/api/scrape").then((res) => res.json()),
    []
  );

  const { data, isFetching, isError } = useQuery({
    queryKey: ["laptopList"],
    queryFn: fetchLaptopList,
    initialData: { list: [], averageStorageCapacity: 0 },
  });

  const downloadAsPdf = useCallback(async () => {
    if (!listContentRef || !listContentRef.current) return;
    const content = listContentRef.current;

    const doc = new jsPDF("p", "pt", "a4", true);
    // console.log("generateProductDom(data)", generateProductDom(data));
    // doc.html(generateProductDom(data), {
    //   callback: async function (doc) {
    //     await doc.save("sample.pdf");
    //   },
    // });

    doc.table(
      10,
      10,
      data.list,
      ["Name", "Price", "Description", "Reviews Count"],
      {}
    );
    await doc.save(`abc.pdf`);
  }, [data]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
      {/* <ProductTable data={data as IProductResponse} /> */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The data is scraped from &nbsp;
          <code className="font-mono font-bold">
            <Link href="https://webscraper.io/test-sites/e-commerce/more/computers/laptops">
              Web Scraper Test Sites
            </Link>
          </code>
        </p>
        <CommonButton onClick={downloadAsPdf}>Download PDF</CommonButton>
      </div>
      <div ref={listContentRef}>
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
      </div>
    </main>
  );
}
