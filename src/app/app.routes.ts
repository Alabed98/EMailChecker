import { Routes } from '@angular/router';
import { CheckAdvanceComponent } from './check-advance/check-advance.component';
import { CheckEmailComponent } from './check-email/check-email.component';

export const routes: Routes = [
    {path:'', component:CheckEmailComponent},
    {path: 'advance', component:CheckAdvanceComponent}
];
