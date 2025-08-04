# API Design Documentation

## Overview

This document outlines the RESTful API design for the School Management System. The API follows REST principles and uses JSON for data exchange.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected routes require JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## API Endpoints

### 1. Authentication & Authorization

#### POST /auth/login

Login user with credentials

```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student" // optional
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "student",
      "firstName": "John",
      "lastName": "Doe"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token"
    }
  }
}
```

#### POST /auth/refresh

Refresh access token

```json
Request:
{
  "refreshToken": "jwt_refresh_token"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

#### POST /auth/logout

Logout user (invalidate tokens)

#### POST /auth/forgot-password

Request password reset

```json
Request:
{
  "email": "user@example.com"
}
```

#### POST /auth/reset-password

Reset password with token

```json
Request:
{
  "token": "reset_token",
  "newPassword": "new_password123"
}
```

### 2. User Management

#### GET /users

Get all users (Admin only)
Query parameters: `role`, `page`, `limit`, `search`

#### GET /users/:id

Get user by ID

#### POST /users

Create new user (Admin only)

```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  }
}
```

#### PUT /users/:id

Update user information

#### DELETE /users/:id

Delete user (Admin only)

#### PUT /users/:id/status

Update user status (activate/deactivate)

### 3. Student Management

#### GET /students

Get all students
Query parameters: `grade`, `section`, `status`, `page`, `limit`, `search`

#### GET /students/:id

Get student by ID

#### POST /students

Create new student

```json
Request:
{
  "userId": "user_id",
  "admissionNumber": "ADM2024001",
  "currentGrade": "10",
  "section": "A",
  "rollNumber": "001",
  "bloodGroup": "O+",
  "nationality": "Country",
  "religion": "Religion",
  "emergencyContacts": [
    {
      "name": "Emergency Contact",
      "relationship": "Parent",
      "phone": "+1234567890",
      "email": "emergency@example.com"
    }
  ],
  "medicalInfo": {
    "allergies": ["Peanuts"],
    "medications": ["None"],
    "medicalConditions": ["None"]
  }
}
```

#### PUT /students/:id

Update student information

#### DELETE /students/:id

Delete student

#### GET /students/:id/attendance

Get student attendance records
Query parameters: `startDate`, `endDate`, `subject`

#### GET /students/:id/grades

Get student grades
Query parameters: `subject`, `academicYear`, `assessmentType`

#### GET /students/:id/fees

Get student fee records
Query parameters: `academicYear`, `status`

#### POST /students/:id/documents

Upload student document

#### GET /students/:id/documents

Get student documents

### 4. Teacher Management

#### GET /teachers

Get all teachers
Query parameters: `subject`, `department`, `status`, `page`, `limit`

#### GET /teachers/:id

Get teacher by ID

#### POST /teachers

Create new teacher

```json
Request:
{
  "userId": "user_id",
  "qualification": ["M.Sc. Mathematics"],
  "experience": 5,
  "specialization": ["Algebra", "Calculus"],
  "subjects": ["subject_id_1", "subject_id_2"],
  "joiningDate": "2024-01-01",
  "employmentType": "permanent",
  "department": "Mathematics"
}
```

#### PUT /teachers/:id

Update teacher information

#### DELETE /teachers/:id

Delete teacher

#### GET /teachers/:id/classes

Get classes assigned to teacher

#### GET /teachers/:id/schedule

Get teacher schedule

#### PUT /teachers/:id/schedule

Update teacher schedule

### 5. Class Management

#### GET /classes

Get all classes
Query parameters: `grade`, `academicYear`, `isActive`

#### GET /classes/:id

Get class by ID

#### POST /classes

Create new class

```json
Request:
{
  "className": "Grade 10-A",
  "grade": "10",
  "section": "A",
  "academicYear": "2024-2025",
  "classTeacher": "teacher_id",
  "maxStudents": 40
}
```

#### PUT /classes/:id

Update class information

#### DELETE /classes/:id

Delete class

#### GET /classes/:id/students

Get students in class

#### POST /classes/:id/students

Add student to class

#### DELETE /classes/:id/students/:studentId

Remove student from class

#### GET /classes/:id/timetable

Get class timetable

#### PUT /classes/:id/timetable

Update class timetable

### 6. Subject Management

#### GET /subjects

Get all subjects
Query parameters: `grade`, `category`, `isActive`

#### GET /subjects/:id

Get subject by ID

#### POST /subjects

Create new subject

```json
Request:
{
  "subjectName": "Mathematics",
  "subjectCode": "MATH101",
  "description": "Basic Mathematics",
  "grade": ["9", "10"],
  "category": "core",
  "credits": 4,
  "assessmentStructure": {
    "assignments": { "weight": 20, "count": 5 },
    "quizzes": { "weight": 15, "count": 3 },
    "midterm": { "weight": 25 },
    "final": { "weight": 35 },
    "participation": { "weight": 5 }
  }
}
```

#### PUT /subjects/:id

Update subject information

#### DELETE /subjects/:id

Delete subject

### 7. Attendance Management

#### GET /attendance

Get attendance records
Query parameters: `student`, `class`, `subject`, `date`, `status`

#### POST /attendance

Mark attendance

```json
Request:
{
  "student": "student_id",
  "class": "class_id",
  "subject": "subject_id",
  "teacher": "teacher_id",
  "date": "2024-01-01",
  "period": 1,
  "status": "present",
  "method": "manual"
}
```

#### PUT /attendance/:id

Update attendance record

#### POST /attendance/bulk

Mark attendance for multiple students

```json
Request:
{
  "class": "class_id",
  "subject": "subject_id",
  "teacher": "teacher_id",
  "date": "2024-01-01",
  "period": 1,
  "attendance": [
    {
      "student": "student_id_1",
      "status": "present"
    },
    {
      "student": "student_id_2",
      "status": "absent"
    }
  ]
}
```

#### GET /attendance/reports

Get attendance reports
Query parameters: `class`, `student`, `startDate`, `endDate`, `format`

### 8. Grade Management

#### GET /grades

Get grade records
Query parameters: `student`, `subject`, `class`, `assessmentType`, `academicYear`

#### POST /grades

Create grade record

```json
Request:
{
  "student": "student_id",
  "subject": "subject_id",
  "class": "class_id",
  "teacher": "teacher_id",
  "assessmentType": "assignment",
  "assessmentName": "Assignment 1",
  "maxMarks": 100,
  "obtainedMarks": 85,
  "assessmentDate": "2024-01-01",
  "academicYear": "2024-2025"
}
```

#### PUT /grades/:id

Update grade record

#### DELETE /grades/:id

Delete grade record

#### POST /grades/bulk

Create multiple grade records

#### GET /grades/reports

Get grade reports
Query parameters: `student`, `class`, `subject`, `academicYear`, `format`

#### POST /grades/:id/publish

Publish grade to students/parents

### 9. Fee Management

#### GET /fees

Get fee records
Query parameters: `student`, `academicYear`, `status`, `dueDate`

#### GET /fees/:id

Get fee record by ID

#### POST /fees

Create fee record

```json
Request:
{
  "student": "student_id",
  "feeStructure": {
    "tuitionFee": 5000,
    "admissionFee": 1000,
    "examFee": 500,
    "libraryFee": 200,
    "labFee": 300,
    "transportFee": 800,
    "miscellaneous": 200,
    "total": 8000
  },
  "academicYear": "2024-2025",
  "semester": "1",
  "dueDate": "2024-04-01"
}
```

#### PUT /fees/:id

Update fee record

#### POST /fees/:id/payment

Record payment

```json
Request:
{
  "amount": 5000,
  "paymentMethod": "online",
  "transactionId": "TXN123456",
  "notes": "Partial payment"
}
```

#### GET /fees/reports

Get fee reports
Query parameters: `academicYear`, `status`, `class`, `format`

### 10. Communication Management

#### GET /messages

Get messages
Query parameters: `type`, `sender`, `recipient`, `page`, `limit`

#### GET /messages/:id

Get message by ID

#### POST /messages

Send message

```json
Request:
{
  "subject": "Important Announcement",
  "content": "Message content here",
  "type": "announcement",
  "priority": "high",
  "targetAudience": {
    "roles": ["parent", "student"],
    "classes": ["class_id_1"],
    "grades": ["10"]
  },
  "scheduledAt": "2024-01-01T10:00:00Z"
}
```

#### PUT /messages/:id

Update message

#### DELETE /messages/:id

Delete message

#### POST /messages/:id/publish

Publish message

#### PUT /messages/:id/read

Mark message as read

### 11. Event Management

#### GET /events

Get events
Query parameters: `type`, `startDate`, `endDate`, `status`

#### GET /events/:id

Get event by ID

#### POST /events

Create event

```json
Request:
{
  "title": "Annual Sports Day",
  "description": "School annual sports event",
  "type": "sports",
  "startDate": "2024-03-15",
  "endDate": "2024-03-15",
  "startTime": "09:00",
  "endTime": "17:00",
  "venue": "School Ground",
  "targetAudience": {
    "roles": ["student", "parent", "teacher"],
    "grades": ["all"]
  }
}
```

#### PUT /events/:id

Update event

#### DELETE /events/:id

Delete event

#### POST /events/:id/participants

Add participants to event

#### GET /events/calendar

Get calendar view of events
Query parameters: `month`, `year`, `view`

### 12. Application Management

#### GET /applications

Get applications
Query parameters: `status`, `gradeAppliedFor`, `submittedDate`

#### GET /applications/:id

Get application by ID

#### POST /applications

Submit application

```json
Request:
{
  "applicantInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2010-01-01",
    "gender": "male",
    "gradeAppliedFor": "6"
  },
  "parentInfo": {
    "father": {
      "name": "Father Name",
      "occupation": "Engineer",
      "phone": "+1234567890",
      "email": "father@example.com"
    }
  },
  "address": {
    "permanent": {
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country"
    }
  }
}
```

#### PUT /applications/:id

Update application

#### PUT /applications/:id/status

Update application status

#### POST /applications/:id/documents

Upload application documents

#### GET /applications/:id/documents

Get application documents

#### POST /applications/:id/interview

Schedule interview

### 13. Notification Management

#### GET /notifications

Get notifications for current user
Query parameters: `isRead`, `type`, `category`

#### PUT /notifications/:id/read

Mark notification as read

#### PUT /notifications/read-all

Mark all notifications as read

#### DELETE /notifications/:id

Delete notification

### 14. Dashboard & Analytics

#### GET /dashboard/overview

Get dashboard overview data

```json
Response:
{
  "success": true,
  "data": {
    "totalStudents": 1250,
    "totalTeachers": 85,
    "totalClasses": 45,
    "attendanceToday": {
      "present": 1180,
      "absent": 70,
      "percentage": 94.4
    },
    "recentActivities": [],
    "upcomingEvents": []
  }
}
```

#### GET /dashboard/attendance-stats

Get attendance statistics
Query parameters: `period`, `class`, `grade`

#### GET /dashboard/grade-stats

Get grade statistics
Query parameters: `subject`, `class`, `academicYear`

#### GET /dashboard/fee-stats

Get fee collection statistics
Query parameters: `academicYear`, `month`

### 15. Reports

#### GET /reports/attendance

Generate attendance report
Query parameters: `class`, `student`, `startDate`, `endDate`, `format`

#### GET /reports/grades

Generate grade report
Query parameters: `student`, `class`, `subject`, `academicYear`, `format`

#### GET /reports/fees

Generate fee report
Query parameters: `academicYear`, `status`, `class`, `format`

#### GET /reports/student-profile

Generate student profile report
Query parameters: `student`, `format`

## HTTP Status Codes

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (duplicate)
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server errors

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- File upload endpoints: 10 requests per minute
- Report generation: 5 requests per minute

## Pagination

All list endpoints support pagination:

```
GET /api/students?page=1&limit=20
```

Default: `page=1`, `limit=10`
Maximum: `limit=100`

## File Upload

File uploads use multipart/form-data:

```
POST /api/students/:id/documents
Content-Type: multipart/form-data

file: [binary data]
type: "birth_certificate"
name: "Birth Certificate"
```

Supported formats: PDF, JPG, PNG, DOC, DOCX
Maximum file size: 10MB
