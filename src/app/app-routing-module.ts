import { RouterModule, Routes } from "@angular/router";
import { NgModule} from "@angular/core";
import { EncodingComponent } from "./encoding/encoding.component";

  const routes: Routes = [
    { path: 'encoder', component: EncodingComponent },
    { path: '', redirectTo: '/encoder', pathMatch: 'full' },
    { path: '**', redirectTo: '/encoder' }
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}