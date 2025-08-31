import { Routes } from '@angular/router';
import { CheckAdvanceComponent } from './components/check-advance/check-advance.component';
import { CheckEmailComponent } from './components/check-email/check-email.component';
import { CheckMailTypeComponent } from './components/check-mail-type/check-mail-type.component';
import { CodeSnippetsComponent } from './components/code-snippets/code-snippets.component';
import { EditorComponent } from './components/editor/editor.component';
import { AppDocumentationComponent } from './components/app-documentation/app-documentation.component';

export const routes: Routes = [
    {path:'', component:CheckEmailComponent},
    {path: 'advance', component:CheckAdvanceComponent},
    {path:'checkEMailType', component:CheckMailTypeComponent},
    {path:'Code-Snippets', component:CodeSnippetsComponent},
    {path: 'editor', component:EditorComponent},
    {path: 'docu', component:AppDocumentationComponent}
];  
