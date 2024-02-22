import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { TabSplitPipe } from './pipes/tab-split.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
    declarations: [
        AppComponent,
        EditCardComponent,
        AddCardComponent,
        CardComponent,
        CardListComponent,
        TabSplitPipe,
        FormatDatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
