import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { CreatureStats } from './entities/creature-stats.entity';
import { Entry } from './entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, CreatureStats])],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
