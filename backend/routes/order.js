const express = require('express')
const Cart = require('../models/Cart');
const Orders = require('../models/Order');
const Product = require('../models/Product');

const addToOrders = async(req, res) => {
    try {
        let cart = await Cart.find()
        
        for (const item of cart) {
            const orders = new Orders({ name: item.name, price: item.price, unit: item.unit, quantity: item.quantity, expiry_date: item.expiry_date, image_url: item.image_url})
            await orders.save()
            // updating product's quantity
            let product = await Product.findOne({ name: item.name })
            product.quantity -= item.quantity
            await product.save()
        }

        // empty cart
        await Cart.deleteMany()
        res.status(201).json({ message: "Product added to orders successfully" });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Server error'})
    }
}

const orderList = async (req, res) => {
    try {
        const orders = await Orders.find()
        res.status(201).json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
}

module.exports = { addToOrders, orderList}