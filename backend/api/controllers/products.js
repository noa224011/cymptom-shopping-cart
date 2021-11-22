// const data = require("../../assets/products.json");
const data = require("../../assets/bla.json");

module.exports = {
  getProduct: (req, res) => {
    const productName = req.params.productName;

    const finalProductArray = data.filter(
      (product) => product.name === productName
    );

    if (finalProductArray.length === 0) {
      res.status(404).json({
        message: "NOT FOUND",
      });
    } else {
      const finalProduct = finalProductArray[0];

      const formatProduct = {
        name: finalProduct.name,
        image: finalProduct.image,
        price: finalProduct.price,
      };

      res.status(200).json({
        product: formatProduct,
      });
    }
  },
};
