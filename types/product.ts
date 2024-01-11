export interface IProductItem {
  id: number;
  description: string;
  price: string;
  title: string;
  review?: number;
}

export interface IProductResponse {
  list: IProductItem[];
  mostExpensive: IProductItem;
  mostReviewed: IProductItem;
  averageStorageCapacity: number;
}
