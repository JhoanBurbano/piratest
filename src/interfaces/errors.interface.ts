import { PATHS } from '../enums/paths.enum';
import { INotify } from './ui.interface';

export interface CustomErrorResponse {
  notify: INotify;
  path?: PATHS;
}
