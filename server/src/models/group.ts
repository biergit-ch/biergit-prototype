//Require Mongoose
import { Schema as _Schema, model } from 'mongoose';

//Define a schema
var Schema = _Schema;

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title    : String
});

var Story  = model('User', storySchema);