// Referenced: https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
import { Schema, model, Document, Model } from 'mongoose';

export interface Task {
  task: string;
  comments?: string;
}

export interface TaskDocument extends Task, Document {}

export interface TaskModel extends Model<TaskDocument> {}

const taskSchema = new Schema<TaskDocument, TaskModel>({
  task: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

export default model<TaskDocument, TaskModel>('Task', taskSchema);
