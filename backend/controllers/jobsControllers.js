const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Job = require("../models/Job");

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().lean();
  // use this line below if/when passord is added to make sure the password isn't sent back in the get request....
  // const jobs = await Jobs.find().select("-password").lean()
  if (!jobs?.length) {
    return res.status(400).json({ message: "No jobs found!" });
  }
  res.json(jobs);
});

const createNewJob = asyncHandler(async (req, res) => {
  //EXAMPLE OF DATA NEEDED IN BODY OF POST REQUEST
  //   {
  //     "itemDescription": "",
  //     "workRequired": "",
  //     "quoteRequired": "",
  //     "quoteDetails": "",
  //     "price": "",
  //     "fName": "",
  //     "lName": "",
  //     "phoneNumber": 0,
  //     "addressRequired": "",
  //     "address": "",
  //     "additionalNotesRequired" : "",
  //     "additionalNotes": "",
  //     "damagedRequired": "",
  //     "damagedNotes": "",
  //     "depositRequired": "",
  //     "depositAmount": "",
  //     "materialsRequired": "",
  //     "materialsSupplier": "",
  //     "materialsNotes": "",
  //     "timescale": 0
  // }

  const {
    itemDescription,
    workRequired,
    quoteRequired,
    quoteDetails,
    price,
    fName,
    lName,
    phoneNumber,
    addressRequired,
    address,
    additionalNotesRequired,
    additionalNotes,
    damagedRequired,
    damagedNotes,
    depositRequired,
    depositAmount,
    materialsRequired,
    materialsSupplier,
    materialsNotes,
    timescale,
  } = req.body;
  //could put in an if (!itemDecription || workReuired || pri.....)... ect to check that all feilds required are filled in however the form in the frontend has "required" in the inputs so might not be needed....

  const duplicate = await Job.findOne({
    lName,
    itemDescription,
    workRequired,
  })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({
      message: "This job is currently booked in and being worked on.",
    });
  }
  //FOR HASHING PASSWORD.... watch MERN API controllers & routers chapter: createNewUser controller

  const jobs = await Job.find().lean();

  let jobNum = "";

  if (!jobs?.length) {
    jobNum = 450;
  }

  jobNum = jobs.length + 450;

  const jobObject = {
    id: jobNum,
    itemDescription,
    workRequired,
    quoteRequired,
    quoteDetails,
    price,
    fName,
    lName,
    phoneNumber,
    addressRequired,
    address,
    additionalNotesRequired,
    additionalNotes,
    damagedRequired,
    damagedNotes,
    depositRequired,
    depositAmount,
    materialsRequired,
    materialsSupplier,
    materialsNotes,
    timescale,
    completed: "false",
  };

  const job = await Job.create(jobObject);

  if (job) {
    res
      .status(201)
      .json({ message: `New job, ${jobNum}: ${itemDescription}, created.` });
  } else {
    res.status(400).json({ message: "Invalid job data recieved" });
  }
});

const updateJob = asyncHandler(async (req, res) => {
  //When item is updated in the frontend, the form may have to diplay the current values in the inputs so that the form is updated with the same info for the inputs that haven't changed.
  const {
    _id,
    id,
    itemDescription,
    workRequired,
    quoteRequired,
    quoteDetails,
    price,
    fName,
    lName,
    phoneNumber,
    addressRequired,
    address,
    additionalNotesRequired,
    additionalNotes,
    damagedRequired,
    damagedNotes,
    depositRequired,
    depositAmount,
    materialsRequired,
    materialsSupplier,
    materialsNotes,
    timescale,
    completed,
  } = req.body;

  if (
    !itemDescription ||
    !workRequired ||
    !price ||
    !fName ||
    !lName ||
    !phoneNumber
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const job = await Job.findById(_id).exec();

  if (!job) {
    return res.status(400).json({ message: "job not found" });
  }

  if (completed) {
    job.completed = completed;
  }

  job.itemDescription = itemDescription;
  job.workRequired = workRequired;
  job.quoteRequired = quoteRequired;
  job.quoteDetails = quoteDetails;
  job.price = price;
  job.fName = fName;
  job.lName = lName;
  job.phoneNumber = phoneNumber;
  job.addressRequired = addressRequired;
  job.address = address;
  job.additionalNotesRequired = additionalNotesRequired;
  job.additionalNotes = additionalNotes;
  job.damagedRequired = damagedRequired;
  job.damagedNotes = damagedNotes;
  job.depositRequired = depositRequired;
  job.depositAmount = depositAmount;
  job.materialsRequired = materialsRequired;
  job.materialsSupplier = materialsSupplier;
  job.materialsNotes = materialsNotes;
  job.timescale = timescale;

  const updatedJob = await job.save();

  res.json({
    message: `Job ${updatedJob.id} has been updated.`,
  });
});

const deleteJob = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "User id required" });
  }

  const job = await Job.findById(_id).exec();

  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }

  const result = await job.deleteOne();

  const reply = `${result.lName}'s job ${result.itemDescription} has been deleted`;
  //a good idea to create a new model to store completed items. The result variable above should provide all the info to be sent to the new "completedSchema"

  res.json(reply);
});

module.exports = {
  getAllJobs,
  createNewJob,
  updateJob,
  deleteJob,
};
