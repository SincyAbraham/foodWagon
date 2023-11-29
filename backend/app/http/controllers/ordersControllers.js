const mongoose = require("mongoose");
const Product = require("../../models/Product");
const User = require("../../models/Users");
const Order = require("../../models/Order");
const orderFactory = require("../../utils/orderGenerator");
//const { orderEmitter } = require("../../../config/io");

const getAllOrders = async (req, res) => {
  let query = {};
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.orderID) {
    query.orderID = parseInt(req.query.orderID);
  }
  if (req.query.state) {
    if (req.query.state === "finish") {
      query.finished = true;
    }
    if (req.query.state === "unfinished") {
      query.finished = false;
    }
  }
  if (req.query.sort) {
    sort = req.query.sort;
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const orders = await Order.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("client")
      .exec();
    const totalResults = await Order.find(query);

    return res
      .status(200)
      .json({ successful: true, data: orders, total: totalResults.length });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't get orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderFound = await Order.findById(req.params.id)
      .populate("client")
      .exec();

    return res.status(200).json({ successful: true, data: orderFound });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, the state couldn't get order",
    });
  }
};

const getAllUserOrders = async (req, res) => {
  let sort = "-createdAt";
  let page = 1;
  let limit = 5;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  let skip = (page - 1) * limit;

  try {
    const user = await User.findById(req.params.userId);

    const ordersFound = await Order.find({ user: { $in: user._id } })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    return res.status(200).json({
      successful: true,
      data: ordersFound,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong,  couldn't get user orders",
    });
  }
};

const createOrder = async (req, res) => {
  //return res.json(req.body);
  try {
    const {
      order_id,
      first_name,
      last_name,
      email,
      address,
      country,
      state,
      zip,
      payment_type,
      user,
      total,
      status,
      description
    } = req.body;
    const newOrder = new Order({
      order_id:order_id,
      first_name:first_name,
      last_name:last_name,
      email:email,
      address:address,
      country:country,
      state:state,
      zip:zip,
      payment_type:payment_type,
      user:user,
      total:total,
      status:status,
      description:description
    });
    await newOrder.save();  

    return res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, order couldn't be created",
    });
  }
};

const actualizeOrderState = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const clientFound = await User.findById(order.client[0]);

    order.updateOrderState(req.confirmedState);

    if (req.confirmedState === "liquidado") {
      order.closeOrder();
      clientFound.setIsClient();

      const promises = order.description.map((item) =>
        Product.incrementProductSales(item.name, item.quantity)
      );

      try {
        await Promise.all(promises);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message:
            "Something went wrong, the product sold quantity could not be updated",
        });
      }
    }

    await order.save();
    await clientFound.save();
    // notify user about an order actualization
    //orderEmitter.emit("orderActualization", clientFound._id, order);

    return res
      .status(200)
      .json({ success: false, message: "order state updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, the state couldn't be upgraded",
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.orderId);

    const clientFound = await User.findById(req.userId);

    clientFound.deleteOrder(req.orderId).save();

    return res
      .status(204)
      .json({ success: true, message: "Order has been deleted" });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, message: "Order couldn't been deleted" });
  }
};

const UpdateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let orderFound = await Order.findById(req.params.id);

    if (!orderFound)
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });


    const updatedOrderStatus = await Order.findByIdAndUpdate(
      orderFound.id,
      {
        status: status || orderFound.status,
      }      
    );

    return res.status(200).json({
      success: true,
      user: updatedOrderStatus,
      message: `Order status updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  actualizeOrderState,
  deleteOrderById,
  getAllUserOrders,
  UpdateOrderStatus
};