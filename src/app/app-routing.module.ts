import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrapheditorMainComponent} from "./components/grapheditor-main/grapheditor-main.component";


const routes: Routes = [
  { path: '', component: GrapheditorMainComponent,
    children : [
      { path: '', component: GrapheditorMainComponent},
      { path: 'editor', component: GrapheditorMainComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
