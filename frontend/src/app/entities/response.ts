export interface Response<T> {
  status: number;
  info:string,
  data?: T
}
