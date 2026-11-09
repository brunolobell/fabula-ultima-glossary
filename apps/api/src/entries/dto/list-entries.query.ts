import { IsIn, IsOptional, IsString } from 'class-validator';
import { ENTRY_TYPES, EntryType } from '../entry-types';

export class ListEntriesQuery {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(ENTRY_TYPES)
  type?: EntryType;
}
