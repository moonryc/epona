import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import pluralize from 'pluralize';

export class NamingStrategy extends SnakeNamingStrategy {
  override tableName(className: string, customName: string): string {
    return super.tableName(pluralize(className), customName);
  }
}
