import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrapheditorMainComponent} from "./components/conformance-main/grapheditor-main.component";
import {GraphDefinitionComponent} from "./components/graph-definition/graph-definition.component";
import {GraphDefinitionDetailComponent} from "./components/graph-definition-detail/graph-definition-detail.component";
import {ObservationDefinitionSummaryComponent} from "./components/observation-definition-summary/observation-definition-summary.component";
import {IntroductionComponent} from "./components/introduction/introduction.component";


const routes: Routes = [
  { path: '', redirectTo: 'fhir', pathMatch: 'full'},
  {
    path: 'fhir', component: GrapheditorMainComponent,

    children : [
      { path: '', component: IntroductionComponent}
    ]
  },
  {
    path: 'observation', component: GrapheditorMainComponent,

    children : [
      { path: '', component: ObservationDefinitionSummaryComponent}
  ]
  },
      {
    path: 'graph', component: GrapheditorMainComponent,

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
