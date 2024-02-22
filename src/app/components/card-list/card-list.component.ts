import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card.model';
import { CardTypes } from '../../enums/card-types.enum';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: Card[];

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards() {
    this.cardsService.getCards().subscribe(result => this.cards = result);
  }

  onAddCard() {
    console.log('Add card clicked!');
    const cardToAdd: Card = {
      name: 'Toso Malero',
      cardNumber: '1111222233334444',
      cvc: '111',
      expires: new Date(2029, 8),
      type: CardTypes.Mastercard
    }
    this.cardsService.createCard(cardToAdd).subscribe(result => {
      console.log(result);
      this.getCards();
    });
  }

}
