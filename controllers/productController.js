const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.status(200).json(product); 
});

const getProducts = asyncHandler(async (req, res) => {
  const searchQuery = req.query.name;

  const filter = searchQuery ? { name: { $regex: new RegExp(searchQuery, 'i') } } : {};

  const products = await Product.find(filter);

  if (!products || products.length === 0) {
    return res.status(404).json({ message: `No products found for search query: ${searchQuery}` });
  }

  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      res.status(404);
      throw new Error(`Product not found!`);
    }

    if (req.user.id !== product.userRef.toString()) {
      res.status(401); 
      throw new Error("You can only delete your own listings!");
    }
  
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted!" });
  });

  const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
  
    if (req.user.id !== product.userRef.toString()) {
      res.status(401);
      throw new Error("You can only update your own listings!");
    }
  
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json(updatedProduct);
  });

module.exports = { addProduct, getProduct, getProducts,deleteProduct,updateProduct };
