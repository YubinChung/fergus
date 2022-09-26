import { Document } from 'mongoose';

export type jobStatus = 'scheduled' | 'active' | 'invoicing' | 'to priced' | 'completed';
export default interface Job extends Document {
  name: string,
  status: jobStatus,
  title: string,
  phone: string,
  email: string,
  note: string
}