import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';
@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const {recipientId, content, category} = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHttp(notification)
    }
  }
}
