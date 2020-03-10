import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomComponent } from './components/dashboard/rooms/room/room.component';
import { MessagesRoomComponent } from './components/dashboard/messages/messages-room/messages-room.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/user/account/account.component';

const routes: Routes = [
  // DEFAULT Routes
  {
    path: '',
    component: LoginComponent
  },
  // AUTH Routes
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Registro de Usuários'}
  },
  // USERS Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'DashBoard'},
    canActivate: [AuthGuardService],
    children: [    // Rota filha. Ex.: /dashboard/rooms
      {
        path: 'rooms',
        component: RoomComponent
      },
      {
        path: 'room/:id',
        component: MessagesRoomComponent
      }
    ]
  },
  // TEST's Layout Routes
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [    // Rota filha. Ex.: /home/rooms
      {
        path: 'rooms',
        component: RoomComponent
      },
      {
        path: 'room/:id',
        component: MessagesRoomComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
