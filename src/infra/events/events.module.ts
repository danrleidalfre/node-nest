import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/db/database.module'
import { OnAnswerCreated } from '@/domain/notification/application/subrscribres/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subrscribres/on-question-best-answer-chosen'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
