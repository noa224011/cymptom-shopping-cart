const data = require("../../assets/products.json");

module.exports = {
  getProductByName: (req, res) => {
    const productName = req.params.productName;

    const finalProductArray = data.filter(
      (product) => product.name === productName
    );

    if (finalProductArray.length === 0) {
      throw { status: 404, message: "Product name not found" };
    } else {
      const finalProduct = finalProductArray[0];

      const formatProduct = {
        name: finalProduct.name,
        image: finalProduct.image,
        price: finalProduct.price,
        sku: finalProduct.sku,
      };

      res.status(200).json({
        product: formatProduct,
      });
    }
  },
  getProductById: (req, res) => {
    const productId = +req.params.productId;

    const finalProductArray = data.filter(
      (product) => product.sku === productId
    );

    if (finalProductArray.length === 0) {
      throw { status: 404, message: "Product id not found" };
    } else {
      const finalProduct = finalProductArray[0];

      const formatProduct = {
        name: finalProduct.name,
        image: finalProduct.image,
        price: finalProduct.price,
        sku: finalProduct.sku,
      };

      res.status(200).json({
        product: formatProduct,
      });
    }
  },
};
