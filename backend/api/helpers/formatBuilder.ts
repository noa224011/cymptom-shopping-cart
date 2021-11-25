import { IProduct } from "../../inerfaces/IProduct";

export function productFormatBuilder(finalProduct: IProduct) {
  return {
    name: finalProduct.name,
    image: finalProduct.image,
    price: finalProduct.price,
    sku: finalProduct.sku,
  };
}
