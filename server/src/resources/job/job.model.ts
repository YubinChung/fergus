import { Schema, model } from 'mongoose';
import Job from '@/resource/job/job.interface';

const JobSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    }
  },
  {timestamps: true}
)

export default model<Job>('Job', JobSchema);