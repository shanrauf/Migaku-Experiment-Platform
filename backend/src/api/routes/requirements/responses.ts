import { BaseResponse } from '../../BaseResponse';
import { Requirement } from '../../../models/requirement';

export class Requirements extends BaseResponse {
  requirements: Requirement[];
  totalCount: number;
}

export class IRequirement extends BaseResponse {
  requirement: Requirement;
}

export class IDeleteRequirement extends BaseResponse {
  deletedCount: number;
  constructor() {
    super();
    this.message = `${this.deletedCount} requirement${
      this.deletedCount > 1 ? 's' : ''
    } deleted.`;
  }
}
