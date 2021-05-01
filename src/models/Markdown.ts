import { Document, Schema, model } from 'mongoose'

export interface IMarkdown {
  content: string
  title: string
  description: string
}

export interface IMarkdownDoc extends IMarkdown, Document {
  createdAt: Date
  updatedAt: Date
}

const schema = new Schema(
  {
    content: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

const Markdown = model<IMarkdownDoc>('Markdown', schema)

export default Markdown
