import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString, Length } from 'class-validator'

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

export class BatchCreateDto {
  /**
   * username
   * @example ["john"]
   */
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'At least one item must be provided' })
  @ArrayNotEmpty()
  users: string[]
}
