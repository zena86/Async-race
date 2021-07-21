export default class ServerError extends Error {
  constructor(errorOwner: string, public code: string) {
    super(`${errorOwner}: ${code}`);
  }
}
