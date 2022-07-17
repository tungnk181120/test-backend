import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateMotelDto {
  @IsString()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  waterPrice: number;

  @IsNumber()
  electricPrice: number;

  @IsNumber()
  square: number;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  summary: string;

  @IsString()
  description: string;
}
