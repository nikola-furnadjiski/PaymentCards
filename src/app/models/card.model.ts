import { CardTypes } from '../enums/card-types.enum';

export interface Card {
    id?: string;
    type: CardTypes;
    name: string;
    cvc: string;
    expires: Date;
    cardNumber: string;
}
