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
      fName: "TestFirstName2",
      timescale: 3,
      jobNum: count,
    });

    const createdJob = await job.save();

    await createdJob;

    expect(createdJob).toBeDefined();
    expect(createdJob.fName).toEqual("TestFirstName2");
  });
}, 10000);
