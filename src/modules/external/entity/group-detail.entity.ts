import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'GROUP_DETAIL' })
export class GroupDetail {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id: number;

  @Column({ name: 'GROUP_ID', type: 'varchar', length: 255 })
  group_id: string;

  @Column({ name: 'GROUP_NAME', type: 'varchar', length: 255 })
  group_name: string;

  @CreateDateColumn({ name: 'CREATE_DATE', type: 'timestamp' })
  create_date: Date;

  @UpdateDateColumn({ name: 'UPDATE_DATE', type: 'timestamp' })
  update_date: Date;

  @Column({ name: 'CREATED_BY', type: 'varchar', length: 255 })
  created_by: string;

  @Column({ name: 'UPDATED_BY', type: 'varchar', length: 255 })
  updated_by: string;

  @Column({ name: 'IS_FLAG', type: 'boolean', default: true })
  is_flag: boolean;

  @BeforeInsert()
  setCreateDate() {
    this.create_date = new Date();
  }
}
