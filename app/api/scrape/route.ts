import { IProductItem } from "@/types/product";
import { calculateStorageCapacity } from "@/utils/product";
import head from "lodash/head";
import last from "lodash/last";
import mean from "lodash/mean";
import sortBy from "lodash/sortBy";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const { spawn } = require("child_process");

export async function GET(_req: NextRequest, _res: NextApiResponse) {
  let python = spawn("python3", ["app/api/scrape/index.py"]);
  let dataToSend = "";
  let list = [];
  for await (const data of python.stdout) {
    dataToSend += data.toString();
  }
  if (!dataToSend)
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  const parsedList = JSON.parse(dataToSend);

  // the calculation for review count below is detected from the source code of the website
  list = (parsedList || []).map((item: IProductItem) => ({
    ...item,
    review: Math.round(parseInt(item.title, 36)) % 15 || 0,
  }));

  const mostExpensive = head(
    sortBy(list, (item: IProductItem) => -parseFloat(item.price))
  );

  const mostReviewed = last(sortBy(list, (item: IProductItem) => item?.review));

  const averageStorageCapacity = mean(
    list.map((item: IProductItem) => calculateStorageCapacity(item.description))
  );

  return NextResponse.json(
    { list, mostExpensive, mostReviewed, averageStorageCapacity },
    { status: 200 }
  );
}
