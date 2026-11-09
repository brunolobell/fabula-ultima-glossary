import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListEntriesQuery } from './dto/list-entries.query';
import { EntriesService } from './entries.service';

/** Read-only: content changes only through the seed files. */
@Controller('entries')
export class EntriesController {
  constructor(private readonly entries: EntriesService) {}

  @Get()
  findAll(@Query() query: ListEntriesQuery) {
    return this.entries.findAll(query.search, query.type);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.entries.findOne(slug);
  }
}
