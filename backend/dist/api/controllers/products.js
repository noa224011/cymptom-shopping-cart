"use strict";
const data_1 = require("./data");
const formatBuilder_1 = require("../helpers/formatBuilder");
module.exports = {
    getProductByName: (req, res) => {
        const productName = req.params.productName;
        const finalProduct = data_1.data.find((product) => product.name === productName);
        if (!finalProduct) {
            throw { status: 404, message: "Product name not found" };
        }
        else {
            const formatProduct = (0, formatBuilder_1.productFormatBuilder)(finalProduct);
            res.status(200).json({
                product: formatProduct,
            });
        }
    },
    getProductById: (req, res) => {
        const productId = +req.params.productId;
        const finalProduct = data_1.data.find((product) => product.sku === productId);
        if (!finalProduct) {
            throw { status: 404, message: "Product id not found" };
        }
        else {
            const formatProduct = (0, formatBuilder_1.productFormatBuilder)(finalProduct);
            res.status(200).json({
                product: formatProduct,
            });
        }
    },
};
