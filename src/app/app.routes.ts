import { Routes } from '@angular/router';
import { CheckAdvanceComponent } from './check-advance/check-advance.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { CheckMailTypeComponent } from './check-mail-type/check-mail-type.component';
import { CodeSnippetsComponent } from './code-snippets/code-snippets.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
    {path:'', component:CheckEmailComponent},
    {path: 'advance', component:CheckAdvanceComponent},
    {path:'checkEMailType', component:CheckMailTypeComponent},
    {path:'Code-Snippets', component:CodeSnippetsComponent},
    {path: 'editor', component:EditorComponent}
];  
