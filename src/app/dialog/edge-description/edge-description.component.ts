import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrowserService} from "../../services/browser.service";
import {Extension, GraphDefinitionLink} from "fhir-stu3";

@Component({
  selector: 'app-edge-description',
  templateUrl: './edge-description.component.html',
  styleUrls: ['./edge-description.component.scss']
})
export class EdgeDescriptionComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EdgeDescriptionComponent>,
      public browserService: BrowserService,
      @Inject(MAT_DIALOG_DATA) data) {
    this.link = data.link;
  }

  @Input()
  link :GraphDefinitionLink = undefined;

  ngOnInit() {
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }
  getProfileName(profile: string, resource: string) {
    if (profile == undefined) return resource;
    var parts = profile.split('/');
    return parts[parts.length-1];

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
}
