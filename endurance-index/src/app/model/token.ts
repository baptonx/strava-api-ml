export class Token {
  private token_type!: string;
  public access_token!: string;
  private expires_at!: number;
  private expires_in!: number;
  private refresh_token!: string;

  constructor() {}
}
