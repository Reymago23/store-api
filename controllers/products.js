const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
    console.log(req.query);
    const products = await Product.find(req.query)
    res.status(200).json({ nbhits: products.length, products })
}

module.exports = {
    getAllProducts, getAllProductsStatic
}