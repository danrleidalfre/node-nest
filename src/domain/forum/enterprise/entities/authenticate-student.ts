import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { WrongCredentialsError } from '@/domain/forum/enterprise/entities/errors/wrong-credentials-error'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Encrypt } from '@/domain/forum/application/cryptography/encrypt'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypt: Encrypt,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypt.encrypt({
      sub: student.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
