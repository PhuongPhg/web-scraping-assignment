"use client";
import { CardWrapper } from "@/components/CardWrapper";
import { CommonButton } from "@/components/CommonButton";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/Skeleton";
import { IProductItem } from "@/types/product";
import { getDisplayFloatNumber } from "@/utils/product";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function Home() {
  const fetchLaptopList = useCallback(async () => {
    const res = await fetch("/api/scrape");
    if (!res.ok) throw new Error("Something went wrong");
    return res.json();
  }, []);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["laptopList"],
    queryFn: fetchLaptopList,
    initialData: { list: [], averageStorageCapacity: 0 },
    retry: false,
  });

  const getSkeletonIndex = useCallback(
    (num: number) => Array.from(Array(num).keys()),
    []
  );

  const downloadAsPdf = useCallback(async () => {
    if (isFetching || isError) return;
    const { generateAnalysisPdf } = await import("@/utils/export-products");
    generateAnalysisPdf(data);
  }, [data, isError, isFetching]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
      <div className="z-10 max-w-5xl w-full items-center justify-end font-mono text-sm flex">
        <CommonButton onClick={downloadAsPdf} className="">
          Download PDF
        </CommonButton>
      </div>
      {isError ? (
        <div className="h-[50vh] flex items-center justify-center">
          Something went wrong
        </div>
      ) : (
        <div className="w-full">
          <div className="my-8">
            {isFetching ? (
              <Skeleton customClassName="m-auto w-48" />
            ) : (
              <h1 className="text-4xl font-bold text-center mb-8">Special</h1>
            )}

            <div className="grid grid-cols-3 gap-3">
              {isFetching ? (
                getSkeletonIndex(3).map((item) => (
                  <Skeleton
                    key={item}
                    customClassName="h-[300px] !rounded-lg"
                  />
                ))
              ) : (
                <>
                  <CardWrapper>
                    <h1 className="text-xl">
                      <strong>The most expensive laptop</strong>
                    </h1>
                    <ProductCard product={data.mostExpensive} />
                  </CardWrapper>
                  <CardWrapper>
                    <h1 className="text-xl">
                      <strong>The most reviewed laptop</strong>
                    </h1>
                    <ProductCard product={data.mostReviewed} />
                  </CardWrapper>
                  <CardWrapper>
                    <div className="flex items-center justify-center flex-col h-full text-center">
                      <h1 className="text-xl">
                        <strong>
                          The average storage capacity of all laptop
                        </strong>
                      </h1>
                      <div className="text-4xl font-bold h-full m-auto text-center flex items-center justify-center text-blue-600/90">
                        {getDisplayFloatNumber(data.averageStorageCapacity)} GB
                      </div>
                    </div>
                  </CardWrapper>
                </>
              )}
            </div>
          </div>
          <div className="my-8">
            {isFetching ? (
              <Skeleton customClassName="w-48 mx-auto my-8" />
            ) : (
              <h1 className="text-4xl font-bold text-center mb-8">
                All laptops
              </h1>
            )}
            {isFetching ? (
              <div className="grid grid-cols-4 gap-4">
                {getSkeletonIndex(8).map((item) => (
                  <Skeleton
                    key={item}
                    customClassName="h-[300px] !rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {data.list.map((item: IProductItem) => (
                  <CardWrapper key={item.id}>
                    <ProductCard product={item} />
                  </CardWrapper>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
