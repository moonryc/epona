import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ChatMessage from '../chat-message/chat-message.entity';

export enum ConversationOwner {
    EPONA = 'Epona',
}

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  name: string;

  @Column('text')
  prompt: string;

  @Column('enum', { enum: ConversationOwner })
  owner: ConversationOwner;

  @OneToMany(() => ChatMessage, (message) => message.conversation)
  messages: ChatMessage[];
}