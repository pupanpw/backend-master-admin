import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: 'USER_NAME' })
  user_name: string;

  @Column({ length: 255, name: 'FIRST_NAME' })
  first_name: string;

  @Column({ length: 255, name: 'LAST_NAME' })
  last_name: string;

  @Column({ type: 'varchar', length: 11 })
  password: string;

  @Column({ length: 255, name: 'PERMISSION' })
  permission: string;
}
