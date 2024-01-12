import { IProductItem } from "@/types/product";

const START_STORAGE_STRING = "GB";
const GB_STORAGE_UNIT = "GB";
const TB_STORAGE_UNIT = "TB";
const TB_TO_GB_CONVERSION = 1024;

// to cut the string that contain the storage capacity infomation
// which is between the RAM unit and the storage unit
// e.g. "8GB RAM, 256GB SSD + 1TB" => "256GB SSD + 1TB"
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

// display number with 2 decimals
export const getDisplayFloatNumber = (number: number) =>
  Math.round(number * 100) / 100;

export const flattenProductAttribute = (product: IProductItem) => [
  product.title,
  "$" + product.price,
  findStorageFromDescription(product.description),
  product.description,
  product.review,
];
