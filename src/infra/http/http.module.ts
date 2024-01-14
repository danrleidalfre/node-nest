import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchQuestionsController } from '@/infra/http/controllers/fetch-questions.controller'
import { Module } from '@nestjs/common'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { DatabaseModule } from '@/infra/db/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { FetchQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-questions'
import { RegisterStudentUseCase } from '@/domain/forum/enterprise/entities/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/enterprise/entities/authenticate-student'
import { GetQuestionBySlugController } from '@/infra/http/controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchQuestionsController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
