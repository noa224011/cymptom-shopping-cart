import { IProduct } from "../../inerfaces/IProduct";
import { data } from "./data";
import { productFormatBuilder } from "../helpers/formatBuilder";

export function getProductByName(req, res) {
  const productName = req.params.productName;
  const finalProduct: IProduct = data.find(
    (product) => product.name === productName
  );
  if (!finalProduct) {
    throw { status: 404, message: "Product name not found" };
  } else {
    const formatProduct: IProduct = productFormatBuilder(finalProduct);
    res.status(200).json({
      product: formatProduct,
    });
  }
}

export function getProductById(req, res) {
  const productId = +req.params.productId;
  const finalProduct: IProduct = data.find(
    (product) => product.sku === productId
  );
  if (!finalProduct) {
    throw { status: 404, message: "Product id not found" };
  } else {
    const formatProduct: IProduct = productFormatBuilder(finalProduct);
    res.status(200).json({
      product: formatProduct,
    });
  }
}
