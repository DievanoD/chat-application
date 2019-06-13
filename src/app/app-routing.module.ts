import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomComponent } from './components/dashboard/rooms/room/room.component';
import { MessagesRoomComponent } from './components/dashboard/messages/messages-room/messages-room.component';
import { MessagesTestComponent } from './components/dashboard/messages/messages-test/messages-test.component';
import { HomeComponent } from './components/dashboard/layout-test/home/home.component';

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
    path: 'test',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
