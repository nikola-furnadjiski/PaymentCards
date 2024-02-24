import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { TabSplitPipe } from './pipes/tab-split.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        CardModalComponent,
        CardComponent,
        CardListComponent,
        TabSplitPipe,
        FormatDatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
