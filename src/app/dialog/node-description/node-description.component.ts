import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrowserService} from "../../services/browser.service";
import {GraphDefinitionLink} from "fhir-stu3";

@Component({
  selector: 'app-node-description',
  templateUrl: './node-description.component.html',
  styleUrls: ['./node-description.component.scss']
})
export class NodeDescriptionComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<NodeDescriptionComponent>,
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

  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }
}
