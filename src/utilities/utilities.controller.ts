import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilityDto } from './dto/utility.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IResponse } from '../common/interfaces';
import { CreateUtilityDto } from './dto/create-utility.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Serialize(UtilityDto)
@Controller('utilities')
export class UtilitiesController {
  constructor(private utilitiesService: UtilitiesService) {}

  @Get('')
  async getUtilityList(): Promise<IResponse> {
    const options = {};
    const utility = await this.utilitiesService.find(options);

    return {
      data: utility,
    };
  }

  @Post('')
  async createUtility(
    @Body() createUtilityDto: CreateUtilityDto,
  ): Promise<IResponse> {
    const utility = await this.utilitiesService.create(createUtilityDto);

    return {
      message: 'Create utility successfully',
      data: utility,
    };
  }
}
