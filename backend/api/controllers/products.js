// const data = require("../../assets/products.json");
const data = require("../../assets/bla.json");

module.exports = {
  getProduct: (req, res) => {
    const productName = req.params.productName;

    const finalProductArray = data.filter(
      (product) => product.name === productName
    );

    if (finalProductArray.length === 0) {
      throw { status: 404, message: "NOT FOUND" };
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
