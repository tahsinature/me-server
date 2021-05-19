import { Document, Schema, model } from 'mongoose'
import connectionRoles from '@src/constants/connectionRoles'

export interface IConnection {
  ip: string
  lookUpData?: any
  socketId?: string | null
  role?: string
}

export type IConnectionDoc = IConnection & Document

const schema = new Schema(
  {
    ip: { type: String, required: true, unique: true },
    lookUpData: { type: Schema.Types.Mixed, default: null },
    socketId: { type: String, default: null },
    role: { type: String, enum: Object.values(connectionRoles) },
  },
  { timestamps: true },
)

const Connection = model<IConnectionDoc>('Connection', schema)

export default Connection
