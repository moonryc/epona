import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Conversation from '../conversation/conversation.entity';

export enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}

@Entity('epona_chats')
export default class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column('boolean', { default: false })
  isSummary!: boolean;

  @Column('text')
  content!: string;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: MessageSource,
  })
  role!: MessageSource;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
