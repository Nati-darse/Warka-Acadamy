import Student from '../models/student.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    message: 'Students retrieved successfully',
    data: {
      students,
      count: students.length
    }
  });
});
