const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    count: c.count,
  }));
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id).lean();
  await req.user.addToCart(course);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.courseId").execPopulate();

  // console.log(user);
  const courses = mapCartItems(user.cart);

  // console.log(courses);

  res.render("card", {
    title: "card",
    isCard: true,
    courses,
    price: computePrice(courses),
  });
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.delete(req.params.id);
  res.status(200).json(card);
});

module.exports = router;
