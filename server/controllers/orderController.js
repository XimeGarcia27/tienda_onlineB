import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            totalPrice,
        });

        const createdOrder = await order.save();

        // Deduct stock per size
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                const sizeObj = product.sizes.find((s) => s.size === item.size);
                if (sizeObj) {
                    sizeObj.stock = Math.max(0, sizeObj.stock - item.qty);
                    await product.save();
                }
            }
        }

        res.status(201).json(createdOrder);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            const oldStatus = order.status;
            const newStatus = req.body.status || order.status;

            order.status = newStatus;
            const updatedOrder = await order.save();

            // Restore stock per size if cancelled
            if (newStatus === 'Cancelado' && oldStatus !== 'Cancelado') {
                for (const item of order.orderItems) {
                    const product = await Product.findById(item.product);
                    if (product) {
                        const sizeObj = product.sizes.find((s) => s.size === item.size);
                        if (sizeObj) {
                            sizeObj.stock += item.qty;
                            await product.save();
                        }
                    }
                }
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel order by user
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Check if order belongs to user
            if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'No tienes permiso para cancelar este pedido' });
            }

            // Check if status is Pendiente
            if (order.status !== 'Pendiente') {
                return res.status(400).json({ message: 'Solo se pueden cancelar pedidos en estado Pendiente' });
            }

            order.status = 'Cancelado';
            const updatedOrder = await order.save();

            // Restore stock per size
            for (const item of order.orderItems) {
                const product = await Product.findById(item.product);
                if (product) {
                    const sizeObj = product.sizes.find((s) => s.size === item.size);
                    if (sizeObj) {
                        sizeObj.stock += item.qty;
                        await product.save();
                    }
                }
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderStatus, cancelOrder };
