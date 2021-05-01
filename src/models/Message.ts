import { Document, Schema, model } from 'mongoose'
import msgTypes from '@src/constants/msgTypes'

export interface IMessage {
  type: 'text' | 'photo'
  content: string
  author: string
  destination: string
}

export interface IMessageDoc extends IMessage, Document {
  createdAt: Date
}

const schema = new Schema(
  {
    type: { enum: msgTypes, type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // ip,
    destination: { type: String, required: true }, // ip | admin,
  },
  { timestamps: true },
)

const Message = model<IMessageDoc>('Message', schema)

export default Message
