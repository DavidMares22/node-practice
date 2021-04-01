const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (course) {
  const clonedItems = [...this.cart.items];
  const idx = clonedItems.findIndex(
    (c) => c.courseId.toString() === course._id.toString()
  );

  if (idx >= 0) {
    clonedItems[idx].count = clonedItems[idx].count + 1;
  } else {
    clonedItems.push({
      courseId: course._id,
      count: 1,
    });
  }

  const newCart = { items: clonedItems };

  this.cart = newCart;
  return this.save()
};

module.exports = model("User", userSchema);
