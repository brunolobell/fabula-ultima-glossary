import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ENTRY_TYPES, EntryType } from '../entry-types';

export class ListEntriesQuery {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsIn(ENTRY_TYPES)
  type?: EntryType;
}
