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
    const job = new Job({
      fName: "TestFirstName",
    });

    await job.save();

    const createdJob = await Job.findOne({ fName: "TestFirstName" });

    expect(createdJob).toBeDefined();
    expect(createdJob.fName).toEqual("TestFirstName");
  });
});
