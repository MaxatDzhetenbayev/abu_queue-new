import { Controller, Post, Body } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';

@Controller('specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post()
  create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistService.create(createSpecialistDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.specialistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSpecialistDto: UpdateSpecialistDto,
  // ) {
  //   return this.specialistService.update(+id, updateSpecialistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.specialistService.remove(+id);
  // }
}
