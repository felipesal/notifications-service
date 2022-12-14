import { IsNotEmpty, isNotEmpty, Length } from "class-validator";

export class CreateNotificationBody {
    @IsNotEmpty()
    recipientId: string;
    @Length(5,240)
    content: string;
    category: string;
}