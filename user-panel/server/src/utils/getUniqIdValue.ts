import { v4 as uuidv4 } from 'uuid';

export const getUniqIdValue = (): string => {
  return uuidv4();
};
