const express = require('express')
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Product
const addToCart = async (req, res) => {
    const { id, name, price, unit, quantity, expiry_date, image_url } = req.body;
  
    try {
      // Check if Product already exists
      let cart = await Cart.findOne({ _id: id });
  
      if (cart) {
        return res.status(200).json({ message: "Product already exist in cart" });
      }
      cart = new Cart({ name, price, unit, quantity, expiry_date, image_url })
      await cart.save()
      res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Server error'})
    }
}

// Get all categories
const cartItems = async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error'})
    }
}

const editQuantity = async (req, res) => {
    const productId = req.params.id
    const { quantity, name } = req.body

    try {
        // Find the product by productId
        const product = await Product.findOne({ name: name});

        // Check if the updated quantity exceeds the available quantity for the product
        if (quantity > product.quantity) {
            return res.status(200).json({ message: 'Quantity exceeds available stock' });
        }
        let cart = await Cart.findOneAndUpdate({ _id: productId }, {quantity: quantity})
        res.status(200).json({ message: 'Product quantity updated successfully'})
      
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

const removeFromCart = async (req, res) => {
    const productId = req.params.id
    
    try {
        const cart = await Cart.findByIdAndDelete({ _id: productId})
        if(!cart) {
            return res.status(404).json({ message: 'Product not found'})
        }

        res.status(200).json({message: 'Product removed from cart succesfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

const checkoutItems = async (req, res) => {
    try {
        const cartItems = await Cart.find()
        let total_price = 0
        let total_items = 0

        for (const item of cartItems) {
            total_price += item.price * item.quantity
            total_items += 1
        }
        res.status(200).json({ total_items: total_items, total_price: total_price})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

module.exports = { addToCart, cartItems, editQuantity, removeFromCart, checkoutItems}