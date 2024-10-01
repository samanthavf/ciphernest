import { RouterModule, Routes } from "@angular/router";
import { EncodingComponent } from "./encoding/encoding.component";
import { NgModule} from "@angular/core";

  const routes: Routes = [
    { path: '', redirectTo: '/encoder', pathMatch: 'full' },
    { path: 'encoder', component: EncodingComponent },
    { path: '**', redirectTo: '/encoder' },
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}