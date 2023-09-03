const Job = require("../models/Job");
require("dotenv").config();
const mongoose = require("mongoose");

describe("Job model", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URI);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it("should create a new job", async () => {
    const jobs = await Job.find().lean();
    const count = jobs.length + 450;
    const job = new Job({
      id: count,
      itemDescription: "TestItemDescription",
      workRequired: "TestWorkRequired",
      quoteRequired: true,
      quoteDetails: "TestQuoteDetails",
      price: "",
      fName: "TestFirstName",
      lName: "TestLastName",
      phoneNumber: 10,
      address: "TestAddress",
      addirionalNotes: "TestAdditionalNotes",
      damagedNotes: "TestDamagedNotes",
      depositAmount: 10,
      materialsSupplier: "TestMaterialsSupplier",
      materialsNotes: "TestMaterialsNotes",
      timescale: 3,
    });

    const createdJob = await job.save();

    await createdJob;

    expect(createdJob).toBeDefined();
    expect(createdJob.fName).toEqual("TestFirstName");
  });

  it("Reads a job", async () => {
    const jobs = await Job.find().lean();
    const count = jobs.length + 449;
    const job = await Job.findOne({ id: count });

    expect(job).toBeDefined();
    expect(job.fName).toEqual("TestFirstName");
  });

  it("Updates a job", async () => {
    const jobs = await Job.find().lean();
    const count = jobs.length + 449;
    const job = await Job.findOne({ id: count });

    job.fName = "UpdatedFirstName";
    job.addressRequired = true;

    const updatedJob = await job.save();

    expect(updatedJob).toBeDefined();
    expect(updatedJob.fName).toEqual("UpdatedFirstName");
    expect(updatedJob.addressRequired).toEqual(true);
  });
  it("Deletes a job", async () => {
    const jobs = await Job.find().lean();
    const count = jobs.length + 449;
    const job = await Job.findOne({ id: count });

    await job.deleteOne();

    const deletedJob = await Job.findOne({ jobNum: count });

    expect(deletedJob).toBeNull();
  });
});
