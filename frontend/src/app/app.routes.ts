import { Routes } from '@angular/router';
import { EncodingComponent } from './encoding/encoding.component';

export const routes: Routes = [
    { path: 'encoder', component: EncodingComponent },
    { path: '', redirectTo: '/encoder', pathMatch: 'full' },
    { path: '**', redirectTo: '/encoder' }
];
