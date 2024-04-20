const express = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')

// Category
const addCategory = async (req, res) => {
    const { name } = req.body

    try {
        // Check if category already exists
        let category = await Category.findOne({ name })

        if(category) {
            return res.status(400).json({message: 'Category already exists'})
        }

        // Create new category
        category = new Category({ name })
        await category.save()

        res.status(201).json({ message: 'Category added successfully'})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Server Error'})
    }
}

// Get all categories
const categoryList = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error'})
    }
}

// Edit category
const category = async (req, res) => {
    const categoryId = req.params.id

    try {
        const category = await Category.findOne({ _id: categoryId })
        if(!category) {
            return res.status(404).json({ message: 'Category not found'})
        }

        res.status(200).json(category)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

const editCategory = async (req, res) => {
    const categoryId = req.params.id
    const { name } = req.body

    try {
        let category = await Category.findById({ _id: categoryId })
        if(!category) {
            return res.status(404).json({ message: 'Category not found'})
        }

        category.name = name
        await category.save()
        res.status(200).json({ message: 'Category updated successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    
    try {
        const category = await Category.findByIdAndDelete({ _id: categoryId})
        if(!category) {
            return res.status(404).json({ message: 'Category not found'})
        }

        // Delete all products belonging to the category
        await Product.deleteMany({ category: categoryId })
        res.status(200).json({message: 'Category and associated product deleted'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
}

module.exports = { addCategory, categoryList, category, editCategory, deleteCategory }
