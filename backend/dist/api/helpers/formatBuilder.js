"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFormatBuilder = void 0;
function productFormatBuilder(finalProduct) {
    return {
        name: finalProduct.name,
        image: finalProduct.image,
        price: finalProduct.price,
        sku: finalProduct.sku,
    };
}
exports.productFormatBuilder = productFormatBuilder;
