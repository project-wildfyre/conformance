import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bundle, OperationOutcome} from "fhir-stu3";
import {MessageService} from "./message.service";

export enum Formats {
    JsonFormatted = 'jsonf',
    Json = 'json',
    Xml = 'xml',
    EprView = 'epr'
}

@Injectable({
  providedIn: 'root'
})
export class BrowserService {


  private resource : any;


    private format: Formats = Formats.JsonFormatted;

  private rawResource : string;

  private validation: OperationOutcome;

  private config: any = {
    'baseUrl': 'http://localhost:8186/ccri-fhir/STU3'
  };

  private resourceChange: EventEmitter<any> = new EventEmitter();
  private rawResourceChange: EventEmitter<any> = new EventEmitter();
  private validationChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private messageService: MessageService) {

  }

    public getResource(search: string): Observable<any> {

        const url = this.config.baseUrl + search;
        let headers = new HttpHeaders(
        );

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': this.getHeaders(true)});
        }
    }




    triggerGetRawResource() {
          return this.getRawResourceChangeEmitter().emit(this.rawResource);
    }

    triggerGetResource() {
        return this.getResourceChangeEmitter().emit(this.resource);
    }
    triggerGetValidationResult() {
        return this.getValidationChangeEmitter().emit(this.validation);
    }

    getRawResource() {
        return this.rawResource;
    }

  getValidationResult() : OperationOutcome {
      return this.validation;
  }

    getRawResourceChangeEmitter() {
        return this.rawResourceChange;
    }

  getResourceChangeEmitter() {
    return this.resourceChange;
  }
    getValidationChangeEmitter() {
        return this.validationChange;
    }

    setValidation(result) {
        this.validation = result;
        this.validationChange.emit(result);
    }
    setResource(result) {
        this.resource = result;
        this.resourceChange.emit(result);
    }


    setRawResource(resource) {
        this.rawResource = resource;
        this.getRawResourceChangeEmitter().emit(this.rawResource);
    }

  setupResource(resource : any) {

     let contentType = 'application/fhir+xml';
     if (resource[0] == '{') {
         contentType = 'application/fhir+json';
     }
     // Clear previous results
      this.setValidation(undefined); // for browser and validate
      this.setRawResource(resource); // For editor
      this.setResource(undefined); // For browser


     // Call to enforce resource is in correct format (json)
      this.postContentType('$convert',resource,contentType).subscribe(
     resource => {
         this.setResource(resource);
         this.validateResource(resource);
     }, error => {

          if (error instanceof HttpErrorResponse) {
              const httpError: HttpErrorResponse = error;
             this.processHttpError(httpError);
          } else {
              this.messageService.addMessage(error);
          }
      });
  }

  processHttpError(httpError : HttpErrorResponse) {
      let message = "";
      const outcome: OperationOutcome = httpError.error;
      console.log(httpError.error);
      if (outcome != undefined) {
          for (const issue of outcome.issue) {
              message = issue.diagnostics;
          }
      } else {
          message = httpError.message;
      }
      this.messageService.addMessage(message);
  }

  public validateResource(resource) {
      this.postContentType('$validate',resource,'application/fhir+json').subscribe(
          data => {
              this.setValidation(data);
          },
          error => {
              if (error instanceof HttpErrorResponse) {
                  const httpError: HttpErrorResponse = error;
                  this.processHttpError(httpError);
              } else {
                  this.messageService.addMessage(error);
              }
          }
      );
  }

    public postContentType(resource: string, body: any, contentType): Observable<any> {

        let headers: HttpHeaders = this.getHeaders(false);
        headers = headers.append('Content-Type', contentType);
        headers = headers.append('Accept', 'application/fhir+json');

        return this.http.post<any>(this.config.baseUrl + resource, body, {headers: headers});
    }

    getHeaders(contentType: boolean = true): HttpHeaders {

        let headers = new HttpHeaders(
        );
        if (contentType) {
            headers = headers.append('Content-Type', 'application/fhir+json');
            headers = headers.append('Accept', 'application/fhir+json');
        }
        return headers;
    }
    public get(search: string): Observable<Bundle> {

        const url: string = this.config.baseUrl + search;
        let headers = new HttpHeaders(
        );

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': headers});
        }
    }
}
