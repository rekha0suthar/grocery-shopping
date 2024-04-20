const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");

// Product
const addProduct = async (req, res) => {
  const { name, price, unit, quantity, expiry_date, image_url, category } =
    req.body;

  try {
    // Check if Product already exists
    let product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create new Product
    product = new Product({
      name,
      price,
      unit,
      quantity,
      expiry_date,
      image_url,
      category,
    });
    await product.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all products by categories
const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoriesWithProducts = [];

    for (const category of categories) {
      const products = await Product.find({ category: category._id });
      categoriesWithProducts.push({ category, products });
    }

    res.status(200).json(categoriesWithProducts);
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get product
const product = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, unit, quantity, expiry_date, image_url, category } =
    req.body;

  try {
    let product = await Product.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.unit = unit;
    product.quantity = quantity;
    product.expiry_date = expiry_date;
    product.image_url = image_url;
    product.category = category;

    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const search = async (req, res) => {
  const { query } = req.query;

  // Perform search based on the query parameter
  // For example, search for products with names containing the query string
  try {
    // Search for products with names containing the query string
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    
    // Search for categories with names containing the query string
    const categories = await Category.find({ name: { $regex: query, $options: 'i' } });

    // Group the products by their categories
    const categoriesWithProducts = {};

    for (const product of products) {
      const category = await Category.findById(product.category);
      if (!categoriesWithProducts[category.name]) {
        categoriesWithProducts[category.name] = [];
      }
      categoriesWithProducts[category.name].push(product);
    }

    // Add products from categories matching the search query directly
    for (const category of categories) {
      if (!categoriesWithProducts[category.name]) {
        categoriesWithProducts[category.name] = [];
      }
      const productsInCategory = await Product.find({ category: category._id });
      categoriesWithProducts[category.name].push(...productsInCategory);
    }

    // Convert the object to an array of objects
    const searchResults = Object.keys(categoriesWithProducts).map(category => ({
      category: { name: category },
      products: categoriesWithProducts[category]
    }));

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addProduct,
  getCategoriesWithProducts,
  product,
  editProduct,
  deleteProduct,
  search,
};
