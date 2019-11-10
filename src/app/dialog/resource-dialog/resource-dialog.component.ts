import {Component, Inject, Input, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrowserService} from "../../services/browser.service";

declare var $: any;

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.css']
})
export class ResourceDialogComponent implements OnInit {


  //https://stackoverflow.com/questions/44987260/how-to-add-jstree-to-angular-2-application-using-typescript-with-types-jstree


  constructor(
    public dialogRef: MatDialogRef<ResourceDialogComponent>,
    public browserService: BrowserService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.resource = data.resource;
  }

  @Input()
  resource = undefined;


  ngOnInit() {
    console.log('Init Called TREE');

    this.browserService.getResourceChangeEmitter().subscribe(
      resource => {
        this.resource = resource;

      }
    )

  }







  entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  escapeHtml(source: string) {
    return String(source).replace(/[&<>"'\/]/g, s => this.entityMap[s]);
  }


 }


