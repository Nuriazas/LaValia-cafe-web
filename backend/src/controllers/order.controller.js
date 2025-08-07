const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const user_id = req.user.id;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'No se proporcionaron items para el pedido' });
    }

    const order = await orderService.createOrder({ user_id, total });

    for (const item of items) {
      await orderService.addOrderItem({
        order_id: order.insertId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
    }

    res.status(201).json({ message: 'Pedido creado', orderId: order.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos del usuario', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    await orderService.updateOrderStatus(orderId, status);
    res.status(200).json({ message: 'Estado del pedido actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus
};
