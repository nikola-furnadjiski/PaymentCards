import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CardTypes } from '../enums/card-types.enum';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {
    constructor() {
    }

    createDb() {
        return {
            cards: [
                {
                    id: '1',
                    type: CardTypes.Mastercard,
                    name: 'John Cabruci',
                    cvc: '009',
                    expires: new Date(2021, 7),
                    cardNumber: '5532123455458014'
                },
                {
                    id: '2',
                    type: CardTypes.Visa,
                    name: 'John Cabruci',
                    cvc: '129',
                    expires: new Date(2024, 11),
                    cardNumber: '0923123188922381'
                },
                // {
                //     id: '3',
                //     type: CardTypes.Visa,
                //     name: 'Catrin Jones',
                //     cvc: '789',
                //     expires: new Date(2026, 2),
                //     cardNumber: '1234333390128888'
                // },
            ]
        };
    }
}
