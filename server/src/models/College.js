const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    durationYears: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    totalSeats: { type: Number, required: true },
  },
  { _id: false },
);

const placementSchema = new mongoose.Schema(
  {
    averagePackageLpa: { type: Number, default: 0 },
    highestPackageLpa: { type: Number, default: 0 },
    placementRate: { type: Number, default: 0 },
    topRecruiters: [{ type: String, trim: true }],
  },
  { _id: false },
);

const cutoffProfileSchema = new mongoose.Schema(
  {
    closingRank: { type: Number, required: true },
    exam: { type: String, required: true, trim: true, uppercase: true },
  },
  { _id: false },
);

const collegeSchema = new mongoose.Schema(
  {
    acceptedExams: [{ type: String, trim: true, uppercase: true }],
    courses: [courseSchema],
    cutoffProfiles: [cutoffProfileSchema],
    fees: {
      annualTuitionInr: { type: Number, required: true },
      hostelInr: { type: Number, default: 0 },
    },
    location: {
      city: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
    },
    name: { type: String, required: true, trim: true },
    nirfRank: { type: Number, default: 0 },
    overview: { type: String, required: true, trim: true },
    placements: placementSchema,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewsSummary: {
      campusLife: { type: Number, default: 0 },
      faculty: { type: Number, default: 0 },
      infrastructure: { type: Number, default: 0 },
    },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  },
  { timestamps: true },
);

collegeSchema.index(
  { name: 'text', overview: 'text', 'location.city': 'text', 'location.state': 'text' },
);
collegeSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.models.College || mongoose.model('College', collegeSchema);
