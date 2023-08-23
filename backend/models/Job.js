const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobNum: {
      type: Number,
      default: () => count,
    },
    itemDescription: {
      type: String,
      // required: true,
    },
    workRequired: {
      type: String,
      // required: true,
    },
    quoteRequired: {
      type: Boolean,
      default: false,
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
      // required: true,
    },
    lName: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: Number,
      // required: true,
    },
    addressRequired: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: false,
    },
    additionalNotesRequired: {
      type: Boolean,
      default: false,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    damagedRequired: {
      type: Boolean,
      // required: true,
    },
    damagedNotes: {
      type: String,
      required: false,
    },
    depositRequired: {
      type: Boolean,
      default: false,
    },
    depositAmount: {
      type: Number,
      required: false,
    },
    materialsRequired: {
      type: Boolean,
      default: false,
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
    //later on would be nice to add a "undergoing work" option to show that the job may be with a member of staff being worked on.
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
    },
    password: {
      type: String,
      required: false,
      //change to true when starting to use but implement all pasword stuff like in the jobCOntrollers file.
    },
    //everything in this list may need to be added to FRONTEND form and the jobCotrollers in the CONTROLLERS folder...
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
