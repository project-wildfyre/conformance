import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {BrowserService} from "../../services/browser.service";
import {Bundle, Questionnaire} from "fhir-stu3";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})


export class QuestionnaireComponent implements OnInit {

  questionnaire: Questionnaire;

  questionnaireid: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fhirService:BrowserService
  ) { }

  ngOnInit() {


    this.doSetup();

    this.route.url.subscribe( url => {
      this.doSetup();
    });

  }

  doSetup() {

    const tempid = this.route.snapshot.paramMap.get('questionnaireid');
    if (this.questionnaireid !== tempid) {
      this.questionnaireid = tempid;
      this.getQuestionnaire();
    }
  }

  getQuestionnaire() {
    this.fhirService.get('/Questionnaire?_id=' + this.questionnaireid).subscribe(
      result => {
        const bundle: Bundle = result;
        if (bundle.total > 0) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'Questionnaire') {
              console.log('Got Questionnaire');
              this.questionnaire = <Questionnaire> entry.resource;
            }
          }
        }
      }
    );
  }

  view(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }
}
