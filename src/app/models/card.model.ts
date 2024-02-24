import { CardTypes } from '../enums/card-types.enum';

export interface Card {
    id?: string;
    type: CardTypes;
    name: string;
    cardNumber: string;
    expires: Date;
    cvc: string;
}
