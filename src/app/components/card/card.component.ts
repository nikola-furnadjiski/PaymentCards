import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardsService } from '../../services/cards.service';
import { CardTypes } from '../../enums/card-types.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  protected readonly CardTypes = CardTypes;

  imageUrl: string;
  altText: string;

  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.imageUrl = this.card.type === CardTypes.Visa ? 'assets/images/visa-logo.svg' : 'assets/images/mastercard-logo.svg'
    this.altText = this.card.type === CardTypes.Visa ? 'visa-logo' : 'mastercard-logo'
  }

  onEditCard() {
    console.log('Edit card clicked!');
    const cardToEdit: Card = {
      name: 'Toso Malero',
      cardNumber: '1111222233334444',
      cvc: '111',
      expires: new Date(2029, 8),
      type: CardTypes.Mastercard
    }
    this.cardsService.editCard(cardToEdit).subscribe(result => {
      console.log(result);
    });
  }
}
