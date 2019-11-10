import {DataSource} from '@angular/cdk/table';

import {BehaviorSubject, Observable} from 'rxjs';
import {BrowserService} from "../services/browser.service";
import {GraphDefinitionLink} from "fhir-stu3";

export class GraphDefinitionLinkDataSource extends DataSource<any> {
  constructor(
              public graphs: GraphDefinitionLink[]
  ) {
    super();
  }

  private dataStore: {
    graphs: GraphDefinitionLink[]
  };

  connect(): Observable<GraphDefinitionLink[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<GraphDefinitionLink[]> =<BehaviorSubject<GraphDefinitionLink[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<GraphDefinitionLink> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
