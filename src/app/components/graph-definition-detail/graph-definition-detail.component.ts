import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Extension, GraphDefinition, GraphDefinitionLink} from "fhir-stu3";
import {BrowserService} from "../../services/browser.service";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";



@Component({
  selector: 'app-graph-definition-detail',
  templateUrl: './graph-definition-detail.component.html',
  styleUrls: ['./graph-definition-detail.component.css']
})
export class GraphDefinitionDetailComponent implements OnInit {

  graphid = undefined;

  graph: GraphDefinition;

  value: string = 'table';

  nodes = [ ];

  /*
  "[
    {
      id: 'first',
      label: 'A'
    }, {
      id: 'second',
      label: 'B'
    }, {
      id: 'third',
      label: 'C'
    }
  ]"
   */

  edges = [];

  /*
  [
    {
      id: 'a',
      source: 'first',
    target: 'second',
      label: 'is parent of'
    }, {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'custom label'
    }
  ]
   */



  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fhirService: BrowserService) { }

  ngOnInit() {

    this.doSetup();
    this.route.url.subscribe( url => {
      this.doSetup();
    });
  }

  doSetup() {

    const tempid = this.route.snapshot.paramMap.get('graphid');
    if (tempid !== undefined && tempid !== this.graphid) {
      this.graphid = tempid;

      this.fhirService.getResource('/GraphDefinition/' + this.graphid ).subscribe( result => {
        const graph: GraphDefinition = result;
        this.graph = graph;
        this.processGraph();
      });
    }
  }

  getColour(resource) {
    if (resource === 'Bundle') return 'accent';
    return 'primary';
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }

  getNodeId(graphLink : GraphDefinitionLink) : string {

    if (graphLink.id != null) return graphLink.id;
    if (graphLink.target != undefined) {
      var targetId = this.getTargetId(graphLink);
    //  console.log('tg '+targetId);
      return targetId;
    }
    return this.getNodeLabel(graphLink)
  }

  getTargetId(graphLink : GraphDefinitionLink) : string {
 //   console.log(graphLink);
    if (graphLink.target !== undefined) {
      for (const target of graphLink.target) {
        if (target.extension != undefined) {
          for (const ext of target.extension) {
            if (ext.url == 'https://fhir.mayfield-is.co.uk/extension-GraphDefinition.targetLinkId') {
              return ext.valueString;
            }
          }
        }
      }
    }
    return "";
  }

  getNodeLabel(graphLink : GraphDefinitionLink) : string {

    if (graphLink.target !== undefined) {
      for (const target of graphLink.target) {
        if (target.type) return target.type;
      }
    }
    return "";
  }

  getMinMax(link: GraphDefinitionLink) {
    console.log(link);
    return "["+link.min+".."+link.max+"]";
  }

  processGraph() {
    this.nodes = [];
    this.edges = [];
    let f = 1;

    for(const graphLink of this.graph.link) {

      var node = {
        id : this.getNodeId(graphLink),
        label : this.getNodeLabel(graphLink),
        options : {
          color : 'red'
        }
      };
      this.nodes.push(node);
      //console.log("node id " + node.id);

      for(const target of graphLink.target) {
        if (target.link != undefined) {
          for (const link of target.link) {
            const edge = {
              id: 'e' + f,
              source: node.id,
              target: this.getTargetId(link),
              label: this.getMinMax(link) + " "+ link.path
            };
            if (link.sliceName != undefined) edge.label += " [slice="+link.sliceName+']';
            f++;
           // console.log('edge target ' + edge.target);
            if (edge.target !== "") {
              this.edges.push(edge);
            } else {
              console.log('Node issue ' + node.id + 'edge target ' + edge.target);
            }
          }
        }
      }
    }
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

  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }

  changeNodeColor(node: any) {

  }

}
