const { Router } = require("express");
const Order = require("../models/order");
const auth = require("../middleware/auth")
const router = Router();

router.get("/",auth, async (req, res) => {
  try {
    let orders = await Order.find({
      "user.userId": req.user._id,
    }).populate({
      path:"user.userId",
      options: { lean: true}
    });

    const ordersFormat = orders.map((order) => {
      return {
        ...order._doc,
        price: order.courses.reduce((total, c) => {
          return (total += c.count * c.course.price);
        }, 0),
      };
    });

    // console.log(ordersFormat);

    res.render("order", {
      isOrder: true,
      title: "Orders",
      orders: ordersFormat,
    });
  } catch (e) {
    console.log(e);
  }
});
router.post("/",auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();
    const courses = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      courses,
    });

    await order.save();
    await req.user.clearCart();
  } catch (e) {
    console.log(e);
  }

  res.redirect("/order");
});

module.exports = router;
