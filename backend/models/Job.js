const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: () => count,
      required: true,
      unique: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    workRequired: {
      type: String,
      required: false,
    },
    quoteRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    quoteDetails: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    addressRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    additionalNotesRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    damagedRequired: {
      type: Boolean,
      required: false,
    },
    damagedNotes: {
      type: String,
      required: false,
    },
    depositRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: false,
    },
    materialsRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    materialsSupplier: {
      type: String,
      required: false,
    },
    materialsNotes: {
      type: String,
      required: false,
    },
    materialsOrdered: {
      type: Boolean,
      default: false,
    },
    timescale: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      default: function () {
        const date = new Date();
        return date.setDate(date.getDate() + 7 * this.timescale);
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    quoted: {
      type: Boolean,
      default: false,
    },
    collected: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.pre("save", function (next) {
  if (!this.price) {
    this.price = 0;
  }

  next();
});

module.exports = mongoose.model("Job", jobSchema);
