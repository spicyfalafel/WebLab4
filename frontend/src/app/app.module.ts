import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/main/app.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {AboutComponent} from './components/about/about.component';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        RadioButtonModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
