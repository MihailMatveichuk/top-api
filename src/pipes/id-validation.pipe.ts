import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { IS_INVALID_ID_ERROR } from './pipes.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(IS_INVALID_ID_ERROR);
    }

    return value;
  }
}
