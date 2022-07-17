import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../addresses/address.entity';
import { MotelUtility } from '../motel-utility/motel-utility.entity';
import { RenterMotel } from '../renter-motel/renter-motel.entity';
import { User } from '../users/user.entity';

@Entity('motels')
export class Motel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'float' })
  price: number;

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => RenterMotel, (renterMotel) => renterMotel.motel)
  renterMotel: RenterMotel;

  @OneToMany(() => MotelUtility, (motelUtility) => motelUtility.motel)
  motelUtilities: MotelUtility[];

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'float', name: 'water_price' })
  waterPrice: number;

  @Column({ type: 'float', name: 'electric_price' })
  electricPrice: number;

  @Column({ type: 'float' })
  square: number;

  @Column({ type: 'varchar' })
  summary: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ name: 'is_public', default: false })
  isPublic: boolean;
}
