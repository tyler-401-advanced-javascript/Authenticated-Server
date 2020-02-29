import mongoose, { model } from 'mongoose';

const rolesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: { type: [String] }
})

export default mongoose.model('Role', rolesSchema)