import { API_BASE } from '../config';

export const prefixBase = (to: string) => {
  return API_BASE ? `${API_BASE}${to}` : to;
};
