import { IProductItem, IProductResponse } from "@/types/product";

const START_STORAGE_STRING = "GB";
const GB_STORAGE_UNIT = "GB";
const TB_STORAGE_UNIT = "TB";
const TB_TO_GB_CONVERSION = 1024;

export const findStorageFromDescription = (description: string) => {
  const firstIndex =
    description.indexOf(START_STORAGE_STRING) + START_STORAGE_STRING.length;
  const lastGBIndex =
    description.lastIndexOf(GB_STORAGE_UNIT) + GB_STORAGE_UNIT.length;
  const lastTBIndex =
    description.lastIndexOf(TB_STORAGE_UNIT) + TB_STORAGE_UNIT.length;
  const lastIndex = Math.max(lastGBIndex, lastTBIndex);

  return (
    description
      .substring(firstIndex, lastIndex)
      .replace(".", ",")
      .split(",")[1] || ""
  );
};

export const calculateStorageCapacity = (description: string) => {
  const input = findStorageFromDescription(description);
  // Regular expression to extract numeric values followed by "GB" or "TB"
  const regex = /(\d+)\s*(GB|TB)/g;

  let totalCapacity = 0;

  let match;
  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2].toUpperCase();

    // Convert TB to GB (1 TB = 1024 GB)
    const capacityInGB =
      unit === TB_STORAGE_UNIT ? value * TB_TO_GB_CONVERSION : value;

    totalCapacity += capacityInGB;
  }

  return totalCapacity;
};

export const getDisplayFloatNumber = (number: number) =>
  Math.round(number * 100) / 100;

export const generateProductDom = (data: IProductResponse) => {
  let content = "";
  content += `<div>
  <label>The most expensive laptop:</label>
  <table>${generateProductTableHeaderDom()}${generateProductTableDom([
    data.mostExpensive,
  ] as IProductItem[])}</table>
  </div>`;
  return `<head><style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style></head>
  <body><div style="width:600px">${content}</div></body>`;
};

const generateProductTableDom = (products: IProductItem[]) => {
  let content = "";
  products.forEach((product) => {
    content += `<tr><td>${product.title}</td><td>${product.price}</td><td>${product.description}</td><td>${product.review}</td></tr>`;
  });
  return content;
};

const generateProductTableHeaderDom = () => {
  return `<tr><th>Name</th><th>Price</th><th>Description</th><th>Review Count</th></tr>`;
};
