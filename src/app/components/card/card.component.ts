import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() showEditButton: boolean = true;

  @Output() editCard= new EventEmitter<Card>();

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
    this.editCard.emit(this.card);
  }
}
