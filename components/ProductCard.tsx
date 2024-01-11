import { IProductItem } from "@/types/product";

export const ProductCard = ({ product }: { product: IProductItem }) => {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-blue-600/90">
        {product.title} -{" "}
        <span className="text-red-600/75">${product.price}</span>
      </h3>

      <p className="m-0 mb-3 text-sm opacity-50">{product.description}</p>
      <p className="mb-3 text-red-600/75">Reviews: &nbsp;{product.review}</p>
    </div>
  );
};
