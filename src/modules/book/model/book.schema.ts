import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, index: true })
  authors: string;

  @Prop()
  favourite?: string;

  @Prop()
  fileCover?: string;

  @Prop()
  fileName?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
