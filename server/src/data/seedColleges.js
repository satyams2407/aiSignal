const seedColleges = [
  {
    name: 'Indian Institute of Technology Delhi',
    slug: 'iit-delhi',
    location: { city: 'New Delhi', state: 'Delhi', country: 'India' },
    fees: { annualTuitionInr: 225000, hostelInr: 92000 },
    rating: 4.8,
    nirfRank: 2,
    acceptedExams: ['JEE_ADVANCED'],
    overview:
      'Premier engineering institute with strong research programs, high selectivity, and top-tier recruiter presence.',
    courses: [
      { name: 'B.Tech Computer Science and Engineering', durationYears: 4, totalSeats: 120 },
      { name: 'B.Tech Electrical Engineering', durationYears: 4, totalSeats: 110 },
    ],
    placements: {
      placementRate: 92,
      averagePackageLpa: 24.3,
      highestPackageLpa: 60,
      topRecruiters: ['Google', 'Microsoft', 'Atlassian', 'Texas Instruments'],
    },
    reviewsSummary: {
      campusLife: 4.7,
      faculty: 4.8,
      infrastructure: 4.5,
    },
    cutoffProfiles: [{ exam: 'JEE_ADVANCED', closingRank: 1200 }],
  },
  {
    name: 'National Institute of Technology Trichy',
    slug: 'nit-trichy',
    location: { city: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'India' },
    fees: { annualTuitionInr: 185000, hostelInr: 78000 },
    rating: 4.6,
    nirfRank: 9,
    acceptedExams: ['JEE_MAIN'],
    overview:
      'Consistently ranked NIT known for strong placements, balanced academics, and national student diversity.',
    courses: [
      { name: 'B.Tech Computer Science and Engineering', durationYears: 4, totalSeats: 115 },
      { name: 'B.Tech Mechanical Engineering', durationYears: 4, totalSeats: 118 },
    ],
    placements: {
      placementRate: 88,
      averagePackageLpa: 16.4,
      highestPackageLpa: 42,
      topRecruiters: ['Amazon', 'PayPal', 'Caterpillar', 'Oracle'],
    },
    reviewsSummary: {
      campusLife: 4.4,
      faculty: 4.5,
      infrastructure: 4.3,
    },
    cutoffProfiles: [{ exam: 'JEE_MAIN', closingRank: 9200 }],
  },
  {
    name: 'Birla Institute of Technology and Science Pilani',
    slug: 'bits-pilani',
    location: { city: 'Pilani', state: 'Rajasthan', country: 'India' },
    fees: { annualTuitionInr: 245000, hostelInr: 98000 },
    rating: 4.7,
    nirfRank: 20,
    acceptedExams: ['BITSAT'],
    overview:
      'Private engineering institution with flexible academics, zero attendance in many courses, and strong alumni outcomes.',
    courses: [
      { name: 'B.E. Computer Science', durationYears: 4, totalSeats: 150 },
      { name: 'B.E. Electronics and Instrumentation', durationYears: 4, totalSeats: 100 },
    ],
    placements: {
      placementRate: 89,
      averagePackageLpa: 18.1,
      highestPackageLpa: 45,
      topRecruiters: ['Uber', 'Adobe', 'Qualcomm', 'Walmart'],
    },
    reviewsSummary: {
      campusLife: 4.6,
      faculty: 4.4,
      infrastructure: 4.5,
    },
    cutoffProfiles: [{ exam: 'BITSAT', closingRank: 275 }],
  },
  {
    name: 'Delhi Technological University',
    slug: 'dtu',
    location: { city: 'New Delhi', state: 'Delhi', country: 'India' },
    fees: { annualTuitionInr: 190000, hostelInr: 65000 },
    rating: 4.5,
    nirfRank: 27,
    acceptedExams: ['JEE_MAIN'],
    overview:
      'Large engineering university with strong coding culture, active societies, and excellent metro-city access.',
    courses: [
      { name: 'B.Tech Software Engineering', durationYears: 4, totalSeats: 75 },
      { name: 'B.Tech Mechanical Engineering', durationYears: 4, totalSeats: 130 },
    ],
    placements: {
      placementRate: 84,
      averagePackageLpa: 15.2,
      highestPackageLpa: 52,
      topRecruiters: ['Google', 'Zomato', 'Samsung', 'Deloitte'],
    },
    reviewsSummary: {
      campusLife: 4.5,
      faculty: 4.1,
      infrastructure: 4.0,
    },
    cutoffProfiles: [{ exam: 'JEE_MAIN', closingRank: 14800 }],
  },
  {
    name: 'Vellore Institute of Technology',
    slug: 'vit-vellore',
    location: { city: 'Vellore', state: 'Tamil Nadu', country: 'India' },
    fees: { annualTuitionInr: 198000, hostelInr: 86000 },
    rating: 4.3,
    nirfRank: 11,
    acceptedExams: ['VITEEE', 'JEE_MAIN'],
    overview:
      'Private university with multiple specializations, industry tie-ups, and a large residential campus.',
    courses: [
      { name: 'B.Tech Computer Science and Engineering', durationYears: 4, totalSeats: 600 },
      { name: 'B.Tech Information Technology', durationYears: 4, totalSeats: 240 },
    ],
    placements: {
      placementRate: 82,
      averagePackageLpa: 10.1,
      highestPackageLpa: 44,
      topRecruiters: ['Infosys', 'TCS', 'Microsoft', 'Accenture'],
    },
    reviewsSummary: {
      campusLife: 4.2,
      faculty: 4.0,
      infrastructure: 4.4,
    },
    cutoffProfiles: [
      { exam: 'VITEEE', closingRank: 18000 },
      { exam: 'JEE_MAIN', closingRank: 52000 },
    ],
  },
  {
    name: 'Manipal Institute of Technology',
    slug: 'manipal-institute-of-technology',
    location: { city: 'Manipal', state: 'Karnataka', country: 'India' },
    fees: { annualTuitionInr: 230000, hostelInr: 112000 },
    rating: 4.2,
    nirfRank: 39,
    acceptedExams: ['MET', 'JEE_MAIN'],
    overview:
      'Well-known private engineering college with strong campus life, good labs, and a broad alumni network.',
    courses: [
      { name: 'B.Tech Computer and Communication Engineering', durationYears: 4, totalSeats: 180 },
      { name: 'B.Tech Data Science and Engineering', durationYears: 4, totalSeats: 120 },
    ],
    placements: {
      placementRate: 79,
      averagePackageLpa: 9.4,
      highestPackageLpa: 28,
      topRecruiters: ['Deloitte', 'Nvidia', 'Cisco', 'JP Morgan'],
    },
    reviewsSummary: {
      campusLife: 4.6,
      faculty: 4.0,
      infrastructure: 4.5,
    },
    cutoffProfiles: [
      { exam: 'MET', closingRank: 14500 },
      { exam: 'JEE_MAIN', closingRank: 61000 },
    ],
  },
  {
    name: 'PSG College of Technology',
    slug: 'psg-college-of-technology',
    location: { city: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
    fees: { annualTuitionInr: 98000, hostelInr: 54000 },
    rating: 4.4,
    nirfRank: 63,
    acceptedExams: ['TNEA'],
    overview:
      'Highly regarded state engineering college with strong local industry connections and value-for-money education.',
    courses: [
      { name: 'B.E. Computer Science and Engineering', durationYears: 4, totalSeats: 120 },
      { name: 'B.E. Electronics and Communication Engineering', durationYears: 4, totalSeats: 120 },
    ],
    placements: {
      placementRate: 86,
      averagePackageLpa: 8.7,
      highestPackageLpa: 21,
      topRecruiters: ['Bosch', 'Cognizant', 'Zoho', 'L&T'],
    },
    reviewsSummary: {
      campusLife: 4.0,
      faculty: 4.3,
      infrastructure: 4.1,
    },
    cutoffProfiles: [{ exam: 'TNEA', closingRank: 4200 }],
  },
  {
    name: 'Maharaja Agrasen Institute of Technology',
    slug: 'mait-delhi',
    location: { city: 'New Delhi', state: 'Delhi', country: 'India' },
    fees: { annualTuitionInr: 145000, hostelInr: 0 },
    rating: 4.0,
    nirfRank: 0,
    acceptedExams: ['JEE_MAIN'],
    overview:
      'Popular Delhi engineering college with strong commuter access and good outcomes for mainstream branches.',
    courses: [
      { name: 'B.Tech Computer Science and Engineering', durationYears: 4, totalSeats: 240 },
      { name: 'B.Tech Information Technology', durationYears: 4, totalSeats: 180 },
    ],
    placements: {
      placementRate: 76,
      averagePackageLpa: 7.2,
      highestPackageLpa: 18,
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'ZS Associates'],
    },
    reviewsSummary: {
      campusLife: 3.8,
      faculty: 3.9,
      infrastructure: 3.7,
    },
    cutoffProfiles: [{ exam: 'JEE_MAIN', closingRank: 84000 }],
  },
];

module.exports = seedColleges;
