# Database Schema Design

## Overview

This document outlines the comprehensive database schema for the School Management System. The system uses MongoDB as the primary database with Mongoose for object modeling.

## Core Entities

### 1. User (Base Schema)

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['student', 'parent', 'teacher', 'admin', 'staff']),
  firstName: String (required),
  lastName: String (required),
  middleName: String,
  dateOfBirth: Date,
  gender: String (enum: ['male', 'female', 'other']),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profilePicture: String (URL),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (ref: 'User'),
  updatedBy: ObjectId (ref: 'User')
}
```

### 2. Student

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  studentId: String (unique, auto-generated),
  admissionNumber: String (unique),
  admissionDate: Date,
  currentGrade: String,
  section: String,
  rollNumber: String,
  academicYear: String,

  // Personal Information
  bloodGroup: String,
  nationality: String,
  religion: String,
  motherTongue: String,

  // Emergency Contacts
  emergencyContacts: [{
    name: String,
    relationship: String,
    phone: String,
    email: String,
    address: String
  }],

  // Medical Information
  medicalInfo: {
    allergies: [String],
    medications: [String],
    medicalConditions: [String],
    doctorName: String,
    doctorPhone: String,
    insuranceInfo: String
  },

  // Academic Information
  previousSchool: String,
  transferCertificate: String (URL),

  // Parent/Guardian Information
  parents: [ObjectId] (ref: 'Parent'),
  guardians: [ObjectId] (ref: 'Guardian'),

  // Status
  status: String (enum: ['active', 'inactive', 'transferred', 'graduated']),

  // Documents
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadedAt: Date
  }],

  createdAt: Date,
  updatedAt: Date
}
```

### 3. Parent/Guardian

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),

  // Relationship Information
  relationship: String (enum: ['father', 'mother', 'guardian', 'other']),
  students: [ObjectId] (ref: 'Student'),

  // Professional Information
  occupation: String,
  workPlace: String,
  workPhone: String,
  workAddress: String,
  annualIncome: Number,

  // Additional Information
  education: String,
  maritalStatus: String,

  // Communication Preferences
  preferredContactMethod: String (enum: ['email', 'phone', 'sms']),
  receiveNotifications: Boolean (default: true),

  createdAt: Date,
  updatedAt: Date
}
```

### 4. Teacher

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  employeeId: String (unique, auto-generated),

  // Professional Information
  qualification: [String],
  experience: Number, // years
  specialization: [String],
  subjects: [ObjectId] (ref: 'Subject'),

  // Employment Details
  joiningDate: Date,
  employmentType: String (enum: ['permanent', 'contract', 'substitute']),
  salary: Number,
  department: String,

  // Schedule
  workingHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String }
  },

  // Classes Assigned
  classes: [ObjectId] (ref: 'Class'),

  // Status
  status: String (enum: ['active', 'inactive', 'on_leave']),

  createdAt: Date,
  updatedAt: Date
}
```

### 5. Class

```javascript
{
  _id: ObjectId,
  className: String (required), // e.g., "Grade 10-A"
  grade: String (required), // e.g., "10"
  section: String (required), // e.g., "A"
  academicYear: String (required),

  // Class Details
  classTeacher: ObjectId (ref: 'Teacher'),
  maxStudents: Number (default: 40),
  currentStudents: Number (default: 0),

  // Students
  students: [ObjectId] (ref: 'Student'),

  // Subjects
  subjects: [{
    subject: ObjectId (ref: 'Subject'),
    teacher: ObjectId (ref: 'Teacher'),
    periodsPerWeek: Number
  }],

  // Schedule
  timetable: [{
    day: String,
    periods: [{
      periodNumber: Number,
      subject: ObjectId (ref: 'Subject'),
      teacher: ObjectId (ref: 'Teacher'),
      startTime: String,
      endTime: String,
      room: String
    }]
  }],

  // Status
  isActive: Boolean (default: true),

  createdAt: Date,
  updatedAt: Date
}
```

### 6. Subject

```javascript
{
  _id: ObjectId,
  subjectName: String (required, unique),
  subjectCode: String (required, unique),
  description: String,

  // Academic Information
  grade: [String], // applicable grades
  category: String (enum: ['core', 'elective', 'extracurricular']),
  credits: Number,

  // Assessment Configuration
  assessmentStructure: {
    assignments: { weight: Number, count: Number },
    quizzes: { weight: Number, count: Number },
    midterm: { weight: Number },
    final: { weight: Number },
    participation: { weight: Number }
  },

  // Prerequisites
  prerequisites: [ObjectId] (ref: 'Subject'),

  // Resources
  textbooks: [String],
  resources: [String],

  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Attendance

```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: 'Student', required),
  class: ObjectId (ref: 'Class', required),
  subject: ObjectId (ref: 'Subject'),
  teacher: ObjectId (ref: 'Teacher', required),

  // Attendance Details
  date: Date (required),
  period: Number,
  status: String (enum: ['present', 'absent', 'late', 'excused'], required),

  // Additional Information
  arrivalTime: Date,
  departureTime: Date,
  notes: String,

  // Tracking
  markedBy: ObjectId (ref: 'User'),
  markedAt: Date,
  method: String (enum: ['manual', 'qr_code', 'biometric']),

  createdAt: Date,
  updatedAt: Date
}
```

### 8. Grade/Assessment

```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: 'Student', required),
  subject: ObjectId (ref: 'Subject', required),
  class: ObjectId (ref: 'Class', required),
  teacher: ObjectId (ref: 'Teacher', required),

  // Assessment Details
  assessmentType: String (enum: ['assignment', 'quiz', 'midterm', 'final', 'project']),
  assessmentName: String,
  maxMarks: Number (required),
  obtainedMarks: Number (required),
  percentage: Number,
  grade: String, // A+, A, B+, etc.

  // Timing
  assessmentDate: Date,
  submissionDate: Date,

  // Additional Information
  feedback: String,
  rubric: Object,

  // Academic Period
  academicYear: String,
  semester: String,
  quarter: String,

  // Status
  isPublished: Boolean (default: false),

  // Tracking
  gradedBy: ObjectId (ref: 'Teacher'),
  gradedAt: Date,

  createdAt: Date,
  updatedAt: Date
}
```

### 9. Course/Curriculum

```javascript
{
  _id: ObjectId,
  courseName: String (required),
  courseCode: String (required, unique),
  description: String,

  // Academic Information
  grade: String (required),
  subjects: [ObjectId] (ref: 'Subject'),
  duration: String, // e.g., "1 year", "6 months"

  // Curriculum Structure
  modules: [{
    moduleName: String,
    description: String,
    duration: String,
    subjects: [ObjectId] (ref: 'Subject'),
    learningOutcomes: [String],
    assessmentMethods: [String]
  }],

  // Prerequisites
  prerequisites: [ObjectId] (ref: 'Course'),

  // Status
  isActive: Boolean (default: true),
  academicYear: String,

  createdAt: Date,
  updatedAt: Date
}
```

### 10. Fee/Financial

```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: 'Student', required),

  // Fee Structure
  feeStructure: {
    tuitionFee: Number,
    admissionFee: Number,
    examFee: Number,
    libraryFee: Number,
    labFee: Number,
    transportFee: Number,
    miscellaneous: Number,
    total: Number
  },

  // Payment Information
  academicYear: String (required),
  semester: String,
  dueDate: Date (required),

  // Payment Status
  status: String (enum: ['pending', 'partial', 'paid', 'overdue']),
  paidAmount: Number (default: 0),
  remainingAmount: Number,

  // Payment History
  payments: [{
    amount: Number,
    paymentDate: Date,
    paymentMethod: String (enum: ['cash', 'card', 'bank_transfer', 'online']),
    transactionId: String,
    receiptNumber: String,
    notes: String,
    processedBy: ObjectId (ref: 'User')
  }],

  // Late Fee
  lateFee: Number (default: 0),

  createdAt: Date,
  updatedAt: Date
}
```

### 11. Communication/Message

```javascript
{
  _id: ObjectId,

  // Message Details
  subject: String (required),
  content: String (required),
  type: String (enum: ['announcement', 'message', 'alert', 'newsletter']),
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),

  // Sender/Receiver
  sender: ObjectId (ref: 'User', required),
  recipients: [{
    user: ObjectId (ref: 'User'),
    role: String,
    readAt: Date,
    status: String (enum: ['sent', 'delivered', 'read'])
  }],

  // Targeting
  targetAudience: {
    roles: [String], // ['parent', 'student', 'teacher']
    classes: [ObjectId] (ref: 'Class'),
    grades: [String],
    specific_users: [ObjectId] (ref: 'User')
  },

  // Attachments
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number,
    fileType: String
  }],

  // Scheduling
  scheduledAt: Date,
  expiresAt: Date,

  // Status
  isPublished: Boolean (default: false),
  isDraft: Boolean (default: true),

  createdAt: Date,
  updatedAt: Date
}
```

### 12. Event/Calendar

```javascript
{
  _id: ObjectId,

  // Event Details
  title: String (required),
  description: String,
  type: String (enum: ['academic', 'sports', 'cultural', 'meeting', 'holiday', 'exam']),

  // Timing
  startDate: Date (required),
  endDate: Date (required),
  startTime: String,
  endTime: String,
  isAllDay: Boolean (default: false),

  // Location
  venue: String,
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },

  // Participants
  organizer: ObjectId (ref: 'User', required),
  participants: [{
    user: ObjectId (ref: 'User'),
    role: String,
    status: String (enum: ['invited', 'accepted', 'declined', 'maybe'])
  }],

  // Targeting
  targetAudience: {
    roles: [String],
    classes: [ObjectId] (ref: 'Class'),
    grades: [String]
  },

  // Additional Information
  isRecurring: Boolean (default: false),
  recurrencePattern: String, // daily, weekly, monthly, yearly
  attachments: [String],

  // Status
  status: String (enum: ['scheduled', 'ongoing', 'completed', 'cancelled']),
  isPublic: Boolean (default: true),

  createdAt: Date,
  updatedAt: Date
}
```

### 13. Application/Admission
```javascript
{
  _id: ObjectId,
  applicationNumber: String (unique, auto-generated),

  // Applicant Information
  applicantInfo: {
    firstName: String (required),
    lastName: String (required),
    middleName: String,
    dateOfBirth: Date (required),
    gender: String (required),
    nationality: String,
    religion: String,
    bloodGroup: String,
    previousSchool: String,
    gradeAppliedFor: String (required)
  },

  // Parent/Guardian Information
  parentInfo: {
    father: {
      name: String,
      occupation: String,
      phone: String,
      email: String,
      income: Number
    },
    mother: {
      name: String,
      occupation: String,
      phone: String,
      email: String,
      income: Number
    },
    guardian: {
      name: String,
      relationship: String,
      occupation: String,
      phone: String,
      email: String
    }
  },

  // Address Information
  address: {
    permanent: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    current: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      isSameAsPermanent: Boolean
    }
  },

  // Documents
  documents: [{
    type: String (required), // birth_certificate, transfer_certificate, etc.
    fileName: String,
    fileUrl: String,
    uploadedAt: Date,
    verified: Boolean (default: false),
    verifiedBy: ObjectId (ref: 'User'),
    verifiedAt: Date
  }],

  // Application Status
  status: String (enum: ['submitted', 'under_review', 'approved', 'rejected', 'waitlisted']),
  submittedAt: Date,
  reviewedBy: ObjectId (ref: 'User'),
  reviewedAt: Date,
  reviewNotes: String,

  // Interview/Test
  interviewScheduled: Date,
  interviewNotes: String,
  testScore: Number,

  // Admission Decision
  admissionDecision: {
    status: String (enum: ['accepted', 'rejected', 'waitlisted']),
    classAssigned: ObjectId (ref: 'Class'),
    feeStructure: ObjectId (ref: 'FeeStructure'),
    admissionDate: Date,
    decisionDate: Date,
    decisionBy: ObjectId (ref: 'User'),
    notes: String
  },

  createdAt: Date,
  updatedAt: Date
}
```

### 14. Notification
```javascript
{
  _id: ObjectId,

  // Notification Details
  title: String (required),
  message: String (required),
  type: String (enum: ['info', 'warning', 'success', 'error']),
  category: String (enum: ['attendance', 'grade', 'fee', 'announcement', 'system']),

  // Recipient Information
  recipient: ObjectId (ref: 'User', required),
  sender: ObjectId (ref: 'User'),

  // Status
  isRead: Boolean (default: false),
  readAt: Date,

  // Additional Data
  relatedEntity: {
    entityType: String, // 'student', 'class', 'fee', etc.
    entityId: ObjectId
  },

  // Delivery
  deliveryMethod: [String], // ['in_app', 'email', 'sms']
  deliveryStatus: {
    in_app: String (enum: ['pending', 'delivered', 'failed']),
    email: String (enum: ['pending', 'sent', 'delivered', 'failed']),
    sms: String (enum: ['pending', 'sent', 'delivered', 'failed'])
  },

  // Scheduling
  scheduledAt: Date,
  expiresAt: Date,

  createdAt: Date,
  updatedAt: Date
}
```

## Relationships and Indexes

### Key Relationships
1. **User → Student/Teacher/Parent**: One-to-one relationship
2. **Student → Parent**: Many-to-many relationship
3. **Class → Students**: One-to-many relationship
4. **Teacher → Classes**: Many-to-many relationship
5. **Subject → Classes**: Many-to-many relationship
6. **Student → Attendance**: One-to-many relationship
7. **Student → Grades**: One-to-many relationship
8. **Student → Fees**: One-to-many relationship
9. **User → Messages**: One-to-many relationship (sender)
10. **User → Notifications**: One-to-many relationship

### Recommended Indexes
```javascript
// User collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "isActive": 1 })

// Student collection
db.students.createIndex({ "studentId": 1 }, { unique: true })
db.students.createIndex({ "userId": 1 })
db.students.createIndex({ "currentGrade": 1, "section": 1 })
db.students.createIndex({ "status": 1 })
db.students.createIndex({ "academicYear": 1 })

// Teacher collection
db.teachers.createIndex({ "employeeId": 1 }, { unique: true })
db.teachers.createIndex({ "userId": 1 })
db.teachers.createIndex({ "subjects": 1 })
db.teachers.createIndex({ "status": 1 })

// Class collection
db.classes.createIndex({ "grade": 1, "section": 1, "academicYear": 1 }, { unique: true })
db.classes.createIndex({ "classTeacher": 1 })
db.classes.createIndex({ "isActive": 1 })

// Attendance collection
db.attendance.createIndex({ "student": 1, "date": -1 })
db.attendance.createIndex({ "class": 1, "date": -1 })
db.attendance.createIndex({ "date": -1 })
db.attendance.createIndex({ "status": 1 })

// Grade collection
db.grades.createIndex({ "student": 1, "subject": 1, "academicYear": 1 })
db.grades.createIndex({ "class": 1, "subject": 1 })
db.grades.createIndex({ "assessmentType": 1 })
db.grades.createIndex({ "isPublished": 1 })

// Fee collection
db.fees.createIndex({ "student": 1, "academicYear": 1 })
db.fees.createIndex({ "status": 1, "dueDate": 1 })
db.fees.createIndex({ "dueDate": 1 })

// Message collection
db.messages.createIndex({ "sender": 1, "createdAt": -1 })
db.messages.createIndex({ "recipients.user": 1 })
db.messages.createIndex({ "type": 1, "isPublished": 1 })
db.messages.createIndex({ "scheduledAt": 1 })

// Event collection
db.events.createIndex({ "startDate": 1, "endDate": 1 })
db.events.createIndex({ "type": 1, "status": 1 })
db.events.createIndex({ "organizer": 1 })

// Application collection
db.applications.createIndex({ "applicationNumber": 1 }, { unique: true })
db.applications.createIndex({ "status": 1 })
db.applications.createIndex({ "submittedAt": -1 })

// Notification collection
db.notifications.createIndex({ "recipient": 1, "createdAt": -1 })
db.notifications.createIndex({ "isRead": 1 })
db.notifications.createIndex({ "type": 1, "category": 1 })
```

## Data Validation Rules

### Business Rules
1. **Student ID**: Auto-generated with format "STU-YYYY-NNNN"
2. **Employee ID**: Auto-generated with format "EMP-YYYY-NNNN"
3. **Application Number**: Auto-generated with format "APP-YYYY-NNNN"
4. **Academic Year**: Format "YYYY-YYYY" (e.g., "2024-2025")
5. **Grade Validation**: Obtained marks cannot exceed max marks
6. **Attendance**: One record per student per subject per day
7. **Fee Due Date**: Cannot be in the past when creating new fee record
8. **Class Capacity**: Current students cannot exceed max students

### Data Integrity
1. **Referential Integrity**: All ObjectId references must exist
2. **Unique Constraints**: Email, student ID, employee ID, application number
3. **Required Fields**: All fields marked as required must have values
4. **Enum Validation**: All enum fields must have valid values
5. **Date Validation**: End dates must be after start dates
