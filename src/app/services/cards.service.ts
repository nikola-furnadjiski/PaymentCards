import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Card } from '../models/card.model';
@Injectable({
    providedIn: 'root'
})
export class CardsService {
    private cardsUrl = 'api/cards/';
    constructor(private http: HttpClient) { }

    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(this.cardsUrl).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                throw new Error(error.message);
            })
        );
    }

    createCard(card: Card): Observable<Card> {
        card.id = uuidv4();
        return this.http.post<Card>(this.cardsUrl, card).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                throw new Error(error.message);
            })
        )
    }

    editCard(card: Card): Observable<any> {
        return this.http.put(this.cardsUrl + card.id, card);
    }

    deleteCard(id: string): Observable<any> {
        return this.http.delete(this.cardsUrl + id);
    }
}
