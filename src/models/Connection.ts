import { Document, Schema, model } from 'mongoose'
import connectionRoles from '@src/constants/connectionRoles'

export interface IConnection {
  ip?: string
  lookUpData?: any
  socketId?: string | null
  role?: string
}

export interface IConnectionDoc extends IConnection, Document {
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema(
  {
    ip: { type: String },
    lookUpData: { type: Schema.Types.Mixed, default: null },
    socketId: { type: String, default: null },
    role: { type: String, enum: Object.values(connectionRoles) },
  },
  { timestamps: true },
)

const Connection = model<IConnectionDoc>('Connection', schema)

export default Connection
