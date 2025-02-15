export class SuccessResponse {
  constructor({success, message}: {success: boolean, message?: string}) {
    this.success = success;
    this.message = message;
  }
  success: boolean;
  message: string | undefined;
}
