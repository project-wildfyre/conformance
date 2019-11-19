import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

import {Bundle, Questionnaire} from "fhir-stu3";
import {BrowserService} from "../../services/browser.service";
import {QuestionnaireDataSource} from "../../data-source/questionnaire-data-source";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";

@Component({
  selector: 'app-questionnaire-summary',
  templateUrl: './questionnaire-summary.component.html',
  styleUrls: ['./questionnaire-summary.component.css']
})
export class QuestionnaireSummaryComponent implements OnInit {

  questionnaires: Questionnaire[] = [];

  dataSource: QuestionnaireDataSource;

  displayedColumns = ['select', 'name', 'description', 'status', 'resource'];


  constructor(private fhirService: BrowserService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fhirService.get('/Questionnaire?_count=20').subscribe(
      result => {
        const bundle = <Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'Questionnaire') {
              this.questionnaires.push(<Questionnaire>entry.resource);
            }
          }
        }
        this.dataSource = new QuestionnaireDataSource(this.fhirService,  this.questionnaires);
      }
    );
  }

  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  selectQuestionnaire(questionnaire: Questionnaire) {

      this.router.navigate([ questionnaire.id ], {relativeTo: this.route});
  }

}
