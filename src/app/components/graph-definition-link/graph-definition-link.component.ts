import {Component, Input, OnInit} from '@angular/core';
import {Extension, GraphDefinitionLink} from "fhir-stu3";

@Component({
  selector: 'app-graph-definition-link',
  templateUrl: './graph-definition-link.component.html',
  styleUrls: ['./graph-definition-link.component.css']
})
export class GraphDefinitionLinkComponent implements OnInit {

  @Input()
  link: GraphDefinitionLink;

  @Input()
  level: number;

  expanded=false;

  constructor() { }

  ngOnInit() {

  }

  getLeft() {
   // console.log('level '+ this.level);
    if (this.level > 0) {
      return '5%';
    }
    return '0%';
}
  getRight() {
    if (this.level > 0) {
      return '95%';
    }
    return '100%';
  }
  getColour(level) {

    if (level === '0') return 'accent';
    if (level === '2') return 'info';
    return 'primary';
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }

  getParams(events : Extension[]) {
    for (const extension of events) {
      if (extension.url == 'http://hl7.org/fhir/4.0/StructureDefinition/extension-GraphDefinition.link.target.params' ) {
        return extension.valueString;
      }
    }

    return "";
  }

  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }

  expandedEvent() {
    this.expanded = true;
  }
  collapsedEvent() {
    this.expanded = false;
  }
}
