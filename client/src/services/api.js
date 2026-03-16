import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import initialOrdersData from '../data/orders.json';

// In-memory store for orders to allow adding new ones during the session
let ordersStore = [...initialOrdersData];

export const getCategories = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return categoriesData;
};

export const getProducts = async (category = null, sort = null) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let products = [...productsData];
  
  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (sort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
};

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = productsData.find(p => p.id === parseInt(id));
  if (!product) throw new Error('Product not found');
  return product;
};

export const getOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return ordersStore;
};

export const getOrderById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const orderId = String(id).toUpperCase();
  const order = ordersStore.find(o => o.id === orderId || o.id === `#${orderId}`);
  if (!order) throw new Error('Order not found');
  return order;
};

export const placeOrder = async (orderData) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate longer delay for checkout
  
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

  ordersStore.unshift(newOrder);
  return { message: 'Order placed successfully', orderId: newOrderId };
};
