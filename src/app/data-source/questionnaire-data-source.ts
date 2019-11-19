import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable} from 'rxjs';
import {Questionnaire} from "fhir-stu3";
import {BrowserService} from "../services/browser.service";

export class QuestionnaireDataSource extends DataSource<any> {
  constructor(public fhirService: BrowserService,
              public questionnaires: Questionnaire[]
  ) {
    super();
  }

  private dataStore: {
    questionnaires: Questionnaire[]
  };

  connect(): Observable<Questionnaire[]> {

  //  console.log('questionnaires DataSource connect '+this.patientId);

    const _questionnaires: BehaviorSubject<Questionnaire[]> =<BehaviorSubject<Questionnaire[]>>new BehaviorSubject([]);

    this.dataStore = { questionnaires: [] };


    if (this.questionnaires !== []) {
      for (const questionnaire of this.questionnaires) {
        this.dataStore.questionnaires.push(<Questionnaire> questionnaire);
      }
      _questionnaires.next(Object.assign({}, this.dataStore).questionnaires);
    }
   return _questionnaires.asObservable();
  }



  disconnect() {}
}
