export enum Status {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export enum Sort {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum Order {
  asc = 'ASC',
  desc = 'DESC',
}

export enum ErrorCode {
  unknown = 'UNKNOWN',
  notFound = 'NOT FOUND',
  badRequest = 'BAD REQUEST',
  tooManyRequests = 'TOO MANY REQUESTS',
  internalServerError = 'INTERNAL SERVER ERROR',
}
