import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipientId notifications', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientId = new CountRecipientNotification(
            notificationsRepository
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        const { count } = await countRecipientId.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});
