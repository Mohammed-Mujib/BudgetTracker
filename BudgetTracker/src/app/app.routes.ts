import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { guardGuard } from './guard.guard';
import { StatisticComponent } from './statistic/statistic.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"transactions",component:TransactionsComponent,canActivate:[guardGuard]},
    {path:"statistic",component:StatisticComponent,canActivate:[guardGuard]},
    {path:"register",component:RegisterComponent},
    {path:"**",component:NotfoundComponent}
];
