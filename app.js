const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const adminrouter = require('./routes/adminRoutes');
const routes = require('./routes/router'); // Import the router
const { Product, Order } = require('./models');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use('/', adminrouter);
app.use('/', routes); 

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:5000');
})

