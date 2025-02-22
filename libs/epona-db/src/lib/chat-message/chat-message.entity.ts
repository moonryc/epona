import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Conversation from '../conversation/conversation.entity';
import { BaseMemoryMessage } from '@epona/ollama';
export enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}

@Entity()
export default class ChatMessage implements BaseMemoryMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column('boolean', { default: false })
  isSummary!: boolean;

  @Column('text')
  content!: string;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Index()
  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: MessageSource,
  })
  role!: MessageSource;

  @Index()
  @Column('uuid')
  conversationId!: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
