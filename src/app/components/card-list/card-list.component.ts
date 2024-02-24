import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card.model';
import { BehaviorSubject, finalize } from 'rxjs';
import { ModalTypes } from '../../enums/modal-types.enum';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  @Output() shouldFetchCards = new EventEmitter<boolean>();

  loading$: BehaviorSubject<boolean>;
  cards: Card[];
  isModalOpen: boolean = false;
  cardToEdit: Card | null;
  modalType: ModalTypes;

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.getCards();
  }

  ngOnDestroy() {
    this.loading$.complete();
  }

  getCards() {
    this.loading$.next(true);
    this.cardsService.getCards().pipe(finalize(() => this.loading$.next(false))).subscribe(result => this.cards = result);
  }

  onEditCard(card: Card) {
    this.cardToEdit = card;
    this.modalType = ModalTypes.Edit;
    this.isModalOpen = true;
  }

  onAddCard() {
    this.modalType = ModalTypes.Add;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.cardToEdit = null;
    this.isModalOpen = false;
  }
}
