import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { CodeRecoverDbInterface } from '../dbTypes/code-recover-db-interface';

const { Schema } = mongoose;

const codeRecoverSchema = new Schema<CodeRecoverDbInterface>({
  userId: { type: ObjectId },
  createdAt: { type: Number },
});

export const CodeRecovers = mongoose.model('code_recover', codeRecoverSchema);
