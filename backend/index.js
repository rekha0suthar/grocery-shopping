const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors")
const { register, login } = require('./routes/auth')
const { addCategory, categoryList, category, editCategory, deleteCategory} = require('./routes/category')
const { addProduct, productList, getCategoriesWithProducts, product, editProduct, deleteProduct, search} = require('./routes/product')
const { addToCart, cartItems, editQuantity, removeFromCart, checkoutItems } = require('./routes/cart')
const { addToOrders, orderList } = require('./routes/order')
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/grocery-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(error))

// Routes
app.post('/register', register)
app.post('/login', login)

app.post('/category', addCategory)
app.get('/category_list', categoryList)
app.get('/category/:id', category)
app.put('/category/:id', editCategory)
app.delete('/category/:id', deleteCategory)

app.post('/product', addProduct)
app.get('/product_list', getCategoriesWithProducts)
app.get('/product/:id', product)
app.put('/product/:id', editProduct)
app.delete('/product/:id', deleteProduct)
app.get('/search', search)

app.post('/cart', addToCart)
app.get('/cart_items', cartItems)
app.put('/cart/:id', editQuantity)
app.delete('/cart/:id', removeFromCart)

app.get('/checkout_items', checkoutItems)
app.post('/orders', addToOrders)
app.get('/order_list', orderList)


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))