import { ObjectId } from 'mongodb';

export interface Lead {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  language: 'pt' | 'en';
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  message?: string;
  language?: 'pt' | 'en';
}
