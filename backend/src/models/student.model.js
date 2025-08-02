import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  like: { type: String, required: true },
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
