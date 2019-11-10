import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrapheditorMainComponent} from "./components/grapheditor-main/grapheditor-main.component";
import {GraphDefinitionComponent} from "./components/graph-definition/graph-definition.component";
import {GraphDefinitionDetailComponent} from "./components/graph-definition-detail/graph-definition-detail.component";


const routes: Routes = [
  { path: '', component: GrapheditorMainComponent,
    children : [
      { path: '', component: GraphDefinitionComponent},

      { path: ':graphid', component: GraphDefinitionDetailComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
