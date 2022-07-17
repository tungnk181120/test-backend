import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IResponse } from '../common/interfaces';
import { CreateRenterMotelDto } from './dto/create-renter-motel.dto';
import { RenterMotelService } from './renter-motel.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('renter-motel')
export class RenterMotelController {
  constructor(private renterMotelService: RenterMotelService) {}

  @Post('')
  async createRenterMotel(
    @Request() request,
    @Body() renterMotelData: CreateRenterMotelDto,
  ): Promise<IResponse> {
    const renterId = request.user.id;

    renterMotelData.renterId = renterId;

    const motel = await this.renterMotelService.create({
      ...renterMotelData,
    });

    return {
      message: `Rent a motel with id \`${renterMotelData.motelId}\` successfully.`,
      data: motel,
    };
  }
}
