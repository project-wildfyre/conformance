import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from "@angular/router";
import {BrowserService} from "../../services/browser.service";
import {Extension} from "fhir-stu3";
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";


@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {

  @Input()
  item: any;

  @Input()
  depth;

  disabled = false;

  expanded=false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fhirService: BrowserService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getIcon(item) {
    switch (item.type) {
      case 'group':
        return 'group';
      case 'reference':
        return 'book';
      case 'choice':
        return 'question_answer';
      case 'string':
        return 'input';
      case 'dateTime': return 'event';
    }
    return 'group';
  }
  getStyle(item) {
    return this._sanitizer.bypassSecurityTrustStyle('{background-color: accent;}');
  }
  getProfile(extension: Extension[]): string {
     for ( const ext of extension) {
       if (ext.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-allowedProfile') {
         return ext.valueReference.reference;
       }
     }
     return '';
  }

  getProfileName(extension: Extension[]): string {
     var profile = this.getProfile(extension);
     if (profile == '') return '';
    var parts = profile.split('/');
    return parts[parts.length-1];
  }

  remove(str: String) {
    if (str === undefined) {
      return '';
    }

    return str.replace('http://hl7.org/fhir/StructureDefinition/questionnaire-', '');
  }
  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  valueSetClick(uri) {
    this.fhirService.get('/ValueSet?url='+uri).
    subscribe(result => {
          if (result.entry !== undefined) {

            this.router.navigateByUrl('/term/valuesets/'+result.entry[0].resource.id , { relativeTo : this.route });
          }
        }
    )
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
