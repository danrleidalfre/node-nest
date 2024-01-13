import { Module } from '@nestjs/common'
import { Encrypt } from '@/domain/forum/application/cryptography/encrypt'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { JwtEncrypt } from './jwt-encrypt'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: Encrypt, useClass: JwtEncrypt },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypt, HashComparer, HashGenerator],
})
export class CryptographyModule {}
