import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "./base.schema";
import mongoose, { HydratedDocument, Types } from "mongoose";

export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    APPOINTMENT = 'appointment',
    FILE = 'file',
    CALL = 'call',
}

export enum AppointmentStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled',
}

export interface AppointmentMessage {
    title: string;
    content: string;
    date: Date;
    apptStatus: AppointmentStatus;
}

export interface CallMessage {
    duration: number;
    isAccepted: boolean;
}

@Schema({timestamps: true})
export class Message extends BaseSchema {
    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    content: string | AppointmentMessage | CallMessage;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;

    @Prop({ enum: MessageType})
    type: MessageType;

    @Prop({ default: false })
    isRead: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
    chat: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageDocument = HydratedDocument<Message>;

