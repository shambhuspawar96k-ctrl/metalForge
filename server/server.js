const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// Mock Data Loaders
const getData = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// API Routes
app.get('/api/categories', (req, res) => {
    try {
        const categories = getData('categories.json');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

app.get('/api/products', (req, res) => {
    try {
        let products = getData('products.json');
        const { category, sort } = req.query;

        if (category) {
            products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (sort === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

app.get('/api/products/:id', (req, res) => {
    try {
        const products = getData('products.json');
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

app.get('/api/orders', (req, res) => {
    try {
        const orders = getData('orders.json');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

app.get('/api/orders/:id', (req, res) => {
    try {
        const orders = getData('orders.json');
        const orderId = req.params.id.toUpperCase();
        const order = orders.find(o => o.id === orderId || o.id === `#${orderId}`);

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order' });
    }
});

app.post('/api/orders', (req, res) => {
    try {
        const orderData = req.body;
        const orders = getData('orders.json');
        
        const newOrderId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
        const newOrder = {
            id: newOrderId,
            status: 'Order Placed',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            customer: orderData.shipping?.fullName || 'Guest',
            items: orderData.items || [],
            total: orderData.total || 0,
            updates: [
                { date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), message: 'Order Confirmed.' }
            ]
        };

        orders.unshift(newOrder); // Add to beginning
        const filePath = path.join(__dirname, 'data', 'orders.json');
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrderId });
    } catch (error) {
        console.error('Order Error:', error);
        res.status(500).json({ message: 'Error processing order' });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (exposed to network)`);
});
