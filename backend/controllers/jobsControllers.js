const asyncHandler = require("express-async-handler");
const Job = require("../models/Job");

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().lean();
  if (!jobs?.length) {
    return res.status(400).json({ message: "No jobs found!" });
  }
  res.json(jobs);
});

const createNewJob = asyncHandler(async (req, res) => {
  let {
    id,
    dueDate,
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
    quoted,
  } = req.body;

  const jobs = await Job.find().lean();
  const count = jobs.length + 450;

  const jobObject = {
    id: id ? id : count,
    dueDate: dueDate && dueDate,
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
    completed: completed && completed,
    quoted: quoted && quoted,
  };

  const job = await Job.create(jobObject);

  if (job) {
    res
      .status(201)
      .json({ message: `New job, ${count}: ${itemDescription}, created.` });
  } else {
    res.status(400).json({ message: "Invalid job data recieved" });
  }
});

const updateJob = asyncHandler(async (req, res) => {
  const {
    _id,
    workRequired,
    quoteDetails,
    price,
    materialsOrdered,
    timescale,
    dueDate,
    completed,
    quoted,
    collected,
  } = req.body;

  const job = await Job.findById(_id).exec();

  if (!job) {
    return res.status(400).json({ message: "job not found" });
  }
  job.collected = collected;
  (job.quoted = quoted), (job.completed = completed);
  job.workRequired = workRequired;
  job.quoteDetails = quoteDetails;
  job.price = price;
  job.materialsOrdered = materialsOrdered;
  job.timescale = timescale;
  job.dueDate = dueDate;

  const updatedJob = await job.save();

  res.json({
    message: `Job ${updatedJob.jobNum} has been updated.`,
  });
});

const deleteJob = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    await Job.deleteMany({});
    return;
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
