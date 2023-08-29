import { Length } from 'class-validator'

export class CreateUserDto {
  /**
   * username
   * @example john
   */
  @Length(3, 18)
  username: string

  /**
   * password
   * @example 123456
   */
  @Length(6, 18)
  password: string
}
