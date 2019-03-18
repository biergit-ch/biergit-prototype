import * as mongoose from 'mongoose';
import Group from './group.interface';

const groupSchema = new mongoose.Schema({
  owner: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  groupName: String,
});
  // TODO ADD members

const groupModel = mongoose.model<Group & mongoose.Document>('Group', groupSchema);

export default groupModel;
