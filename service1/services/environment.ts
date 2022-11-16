import { plainToClass, Type } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  validateSync,
  IsString,
  IsNumber,
} from 'class-validator'

enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment, { always: true })
  NODE_ENV: Environment

  @IsNotEmpty({ always: true })
  @Type(() => Number)
  @IsNumber({}, { always: true })
  API_PORT: number

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  API_PREFIX: string

  @IsNotEmpty({ always: true })
  @Type(() => Number)
  @IsNumber({}, { always: true })
  USER_SESSION_TOKEN_EXPIRE: number
}

export const checkEnvVariables = () => {
  const validatedConfig = plainToClass(EnvironmentVariables, process.env, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    groups: [validatedConfig.NODE_ENV],
  })

  if (errors.length && process.env?.['NODE_ENV'] !== 'test') {
    console.error(errors.toString())
    process.kill(process.pid, 'SIGINT')
  }

  return validatedConfig
}
