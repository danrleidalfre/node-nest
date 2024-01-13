import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHash } from 'test/cryptography/fake-hash'
import { FakeEncrypt } from 'test/cryptography/fake-encrypt'
import { makeStudent } from 'test/factories/make-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/enterprise/entities/authenticate-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHash: FakeHash
let encrypt: FakeEncrypt

let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHash = new FakeHash()
    encrypt = new FakeEncrypt()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHash,
      encrypt,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHash.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
