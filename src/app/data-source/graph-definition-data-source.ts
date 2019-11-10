import {DataSource} from '@angular/cdk/table';

import {BehaviorSubject, Observable} from 'rxjs';
import {GraphDefinition} from "fhir-stu3";

export class GraphDefinitionDataSource extends DataSource<any> {
  constructor(
              public graphs: GraphDefinition[]
  ) {
    super();
  }

  private dataStore: {
    graphs: GraphDefinition[]
  };

  connect(): Observable<GraphDefinition[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<GraphDefinition[]> =<BehaviorSubject<GraphDefinition[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<GraphDefinition> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
