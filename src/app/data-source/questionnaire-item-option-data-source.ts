import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable} from 'rxjs';
import {QuestionnaireItemOption} from "fhir-stu3";
import {BrowserService} from "../services/browser.service";

export class QuestionnaireItemOptionDataSource extends DataSource<any> {

  constructor(public fhirService: BrowserService,
              public options: QuestionnaireItemOption[]
  ) {
    super();
  }

  private dataStore: {
    options: QuestionnaireItemOption[]
  };

  connect(): Observable<QuestionnaireItemOption[]> {

  //  console.log('options DataSource connect '+this.patientId);

    const _options: BehaviorSubject<QuestionnaireItemOption[]> =<BehaviorSubject<QuestionnaireItemOption[]>>new BehaviorSubject([]);

    this.dataStore = { options: [] };


    if (this.options !== []) {
      for (const option of this.options) {
        this.dataStore.options.push(<QuestionnaireItemOption> option);
      }
      _options.next(Object.assign({}, this.dataStore).options);
    }
   return _options.asObservable();
  }



  disconnect() {}
}
