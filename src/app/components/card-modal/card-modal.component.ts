import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card.model';
import { CardTypes } from '../../enums/card-types.enum';
import { CardsService } from '../../services/cards.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { ModalTypes } from '../../enums/modal-types.enum';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
    selector: 'app-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit, OnDestroy {
    @Input() modalType: ModalTypes;
    @Input() cardToEdit: Card | null;

    @Output() shouldFetchCards = new EventEmitter<boolean>();
    @Output() shouldCloseModal = new EventEmitter<boolean>();

    cardForm: FormGroup;
    loading$: BehaviorSubject<boolean>;

    formatDatePipe: FormatDatePipe = new FormatDatePipe();
    protected readonly ModalTypes = ModalTypes;

    constructor(private fb: FormBuilder,
                private cardsService: CardsService) {
    }

    ngOnInit(): void {
        this.loading$ = new BehaviorSubject<boolean>(false);

        this.cardForm = this.fb.group({
            nameOnCard: ['', Validators.required],
            cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
            expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
            cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
        });

        if (this.modalType === ModalTypes.Edit) {
            this.cardForm.patchValue({
                nameOnCard: this.cardToEdit?.name,
                cardNumber: this.cardToEdit?.cardNumber,
                expiryDate: this.formatDatePipe.transform(this.cardToEdit?.expires),
                cvc: this.cardToEdit?.cvc
            });
        }
    }

    ngOnDestroy() {
        this.loading$.complete();
    }

    onCloseModal() {
        this.shouldCloseModal.emit(true);
    }

    onSubmit() {
        if (this.cardForm.valid) {
            const expiryDateString = this.cardForm.get('expiryDate')?.value;
            const year = +('20' + expiryDateString.substring(expiryDateString.indexOf('/') + 1));
            const month = +expiryDateString.substring(0, expiryDateString.indexOf('/')) - 1;

            const newCard: Card = {
                type: Math.random() > 0.5 ? CardTypes.Mastercard : CardTypes.Visa,
                name: this.cardForm.get('nameOnCard')?.value,
                cardNumber: this.cardForm.get('cardNumber')?.value,
                expires: new Date(year, month),
                cvc: this.cardForm.get('cvc')?.value,
            }

            if (this.modalType === ModalTypes.Add) {
                this.onAddCard(newCard);
            } else {
                this.onEditCard(newCard);
            }
        } else {
            this.cardForm.markAllAsTouched();
        }
    }

    onAddCard(cardToAdd: Card) {
        this.loading$.next(true);
        this.cardsService.createCard(cardToAdd).pipe(
            finalize(() => this.loading$.next(false))
        ).subscribe(result => {
            this.shouldFetchCards.emit(true);
            this.onCloseModal();
            this.cardForm.markAsUntouched();
        });
    }

    onEditCard(cardToEdit: Card) {
        cardToEdit.id = this.cardToEdit?.id;
        cardToEdit.type = this.cardToEdit?.type!;

        this.loading$.next(true);
        this.cardsService.editCard(cardToEdit).pipe(
            finalize(() => this.loading$.next(false))
        ).subscribe(result => {
            this.shouldFetchCards.emit(true);
            this.onCloseModal();
            this.cardForm.markAsUntouched();
        });
    }

    onDeleteCard() {
        this.loading$.next(true);
        this.cardsService.deleteCard(this.cardToEdit?.id ? this.cardToEdit?.id : '').pipe(
            finalize(() => this.loading$.next(false))
        ).subscribe(result => {
            this.shouldFetchCards.emit(true);
            this.onCloseModal();
            this.cardForm.markAsUntouched();
        });
    }
}
