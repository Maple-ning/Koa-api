import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column({ select: false })
  password: string;
}
