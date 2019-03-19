import * as mongoose from 'mongoose';
import Group from './group.interface';

const groupSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  groupName: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});
  // TODO ADD members

const groupModel = mongoose.model<Group & mongoose.Document>('Group', groupSchema);

export default groupModel;
