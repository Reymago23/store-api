const Product = require('../models/product')
// const { search } = require('../routes/products')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ name: 'accent chair' })
    res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
    // console.log("req.query: " + req.query);
    const { featured, company, name, sort, fields } = req.query
    let queryObject = {}
    if (featured) {
        queryObject.featured = (featured === 'true')
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    const products = await result.skip(skip).limit(limit)
    res.status(200).json({ nbhits: products.length, products })
}

module.exports = {
    getAllProducts, getAllProductsStatic
}