import {Component, Input, OnInit} from '@angular/core';
import {BrowserService} from "../../services/browser.service";
import {QuestionnaireItemOption} from "fhir-stu3";
import {QuestionnaireItemOptionDataSource} from "../../data-source/questionnaire-item-option-data-source";

@Component({
  selector: 'app-questionnaire-item-option',
  templateUrl: './questionnaire-item-option.component.html',
  styleUrls: ['./questionnaire-item-option.component.css']
})
export class QuestionnaireItemOptionComponent implements OnInit {

  @Input()
  options: QuestionnaireItemOption[];

  dataSource: QuestionnaireItemOptionDataSource;

  displayedColumns = ['code', 'term', 'system'];

  constructor(
      private fhirService: BrowserService
  ) { }

  ngOnInit() {
    this.dataSource = new QuestionnaireItemOptionDataSource(this.fhirService, this.options);
  }

}
