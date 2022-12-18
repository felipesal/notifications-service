import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";

describe('Count recipientId notifications', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientId = new CountRecipientNotification(
            notificationsRepository
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('nova notificacao'),
                recipientId: 'recipient-1'
            })
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('nova notificacao'),
                recipientId: 'recipient-2'
            })
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('nova notificacao'),
                recipientId: 'recipient-1'
            })
        );

        const { count } = await countRecipientId.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});