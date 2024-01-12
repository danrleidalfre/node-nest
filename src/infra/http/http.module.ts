import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchQuestionsController } from '@/infra/http/controllers/fetch-questions.controller'
import { Module } from '@nestjs/common'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { PrismaService } from '@/infra/prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
