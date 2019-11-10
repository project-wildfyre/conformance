import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Bundle, GraphDefinition} from "fhir-stu3";
import {GraphDefinitionDataSource} from "../../data-source/graph-definition-data-source";
import {BrowserService} from "../../services/browser.service";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";

@Component({
  selector: 'app-graph-definition',
  templateUrl: './graph-definition.component.html',
  styleUrls: ['./graph-definition.component.css']
})
export class GraphDefinitionComponent implements OnInit {

  graphs: GraphDefinition[] = [];

  dataSource: GraphDefinitionDataSource;

  searchInputName;

  searchInputUrl;

  displayedColumns = ['view', 'name', 'description', 'status', 'resource'];

  constructor(private fhirService: BrowserService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  search(name, searchUri) {

    this.graphs = [];

    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (searchUri !== undefined) {
      this.searchInputUrl = searchUri;
    }

    let url = '/GraphDefinition';

    if (this.searchInputName !== undefined) {
      url = url + '?name=' + this.searchInputName;
    }
    if (this.searchInputUrl !== undefined) {
      if (this.searchInputName === undefined) {
        url = url + '?searchUri=' + this.searchInputUrl;
      } else {
        url = url + '&searchUri=' + this.searchInputUrl;
      }
    }
    url = url + '&_count=20';



    this.fhirService.get(url).subscribe(
      result => {
        const bundle = <Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'GraphDefinition') {
              this.graphs.push(<fhir.GraphDefinition>entry.resource);
            }
          }
        }
        this.dataSource = new GraphDefinitionDataSource(this.fhirService,  this.graphs);
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
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  view(graph: GraphDefinition) {
    this.router.navigate([graph.id], {relativeTo: this.route });
  }

}
