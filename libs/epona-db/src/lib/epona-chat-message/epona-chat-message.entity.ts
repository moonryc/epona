import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}

@Entity('epona_chats')
export default class EponaChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
}
