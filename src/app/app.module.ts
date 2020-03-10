import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './helpers/auth.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomComponent } from './components/dashboard/rooms/room/room.component';
import { MessagesRoomComponent } from './components/dashboard/messages/messages-room/messages-room.component';
import { HomeComponent } from './components/home/home.component';
import { TitleNavComponent } from './components/home/title-nav/title-nav.component';
import { AccountComponent } from './components/user/account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RoomComponent,
    MessagesRoomComponent,
    HomeComponent,
    TitleNavComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Adicionar
    FormsModule,
    ReactiveFormsModule
    // BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
