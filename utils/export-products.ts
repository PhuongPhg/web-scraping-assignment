import { IProductItem, IProductResponse } from "@/types/product";
import jsPDF from "jspdf";
import autoTable, { Table, UserOptions } from "jspdf-autotable";
import { flattenProductAttribute, getDisplayFloatNumber } from "./product";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: Table;
    autoTable: (options: UserOptions) => void;
  }
}

export const generateAnalysisPdf = (data: IProductResponse) => {
  const doc = new jsPDF();
  let finalY = doc.lastAutoTable.finalY || 10;
  const head = [["Name", "Price", "Storage", "Description", "Review Count"]];
  doc.text("The most expensive laptop:", 14, finalY + 15);

  autoTable(doc, {
    startY: finalY + 20,
    head,
    body: [flattenProductAttribute(data.mostExpensive) as string[]],
  });
  finalY = doc.lastAutoTable.finalY || 10;
  doc.text("The most reviewed laptop:", 14, finalY + 15);

  autoTable(doc, {
    startY: finalY + 20,
    head,
    body: [flattenProductAttribute(data.mostReviewed) as string[]],
  });
  finalY = doc.lastAutoTable.finalY || 10;
  doc.text(
    `The average storage capacity of all laptop: ${getDisplayFloatNumber(
      data.averageStorageCapacity
    )}GB`,
    14,
    finalY + 15
  );
  doc.text("All laptops", 14, finalY + 30);
  autoTable(doc, {
    startY: finalY + 35,
    head,
    body: data.list.map(
      (item: IProductItem) => flattenProductAttribute(item) as string[]
    ),
  });
  doc.save("analysis.pdf");
};
