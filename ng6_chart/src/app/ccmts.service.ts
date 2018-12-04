import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DocsisFile }         from './docsis-file';


import { MatDialog } from '@angular/material';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CcmtsService {

  constructor(private _http: HttpClient,
              private messageService: MessageService,
              private dialog: MatDialog) { }

  //dataUrl = "http://172.22.11.242:8880/ccmts/1";

  // FIXME, chnage url for debug
  // fileUrl = "http://127.0.0.1:8000/api/files";
  // dataUrl = "http://127.0.0.1:8000/api/ccmts/1";
  fileUrl = "api/files";
  dataUrl = "api/ccmts/1";


  dailyChart() {
		return this._http.get(this.dataUrl).pipe( map(result => result));
		}

  getDocsisFile(id: number): Observable<DocsisFile> {
    const url = `${this.fileUrl}/${id}`;
    return this._http.get<DocsisFile>(url).pipe(
      tap(_ => this.log(`fetched docsis file id=${id}`)),
      catchError(this.handleError<DocsisFile>(`getDocsisFile from ${url} id=${id}`))
    );
  }

  unregister() {
    let dialogRef = this.dialog.open(MyAlertDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        console.log('Unregistered');
      }
    })
  }

  getDocsisFileClicked(id: number, index: number): Observable<DocsisFile> {
    // const url = `${this.fileUrl}/${id}/${index}`;
    const url = `${this.fileUrl}/${id}/${index}${this.urlReqOption}`;
    return this._http.get<DocsisFile>(url).pipe(
      tap(_ => this.log(`fetched docsis file clicked id=${id} index=${index}`)),
      catchError(this.handleError<DocsisFile>(`getDocsisFile from ${url} id=${id} index=${index}`))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // FIXME, pass ${error.message} to alertDiaglog
      // this.unregister();

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CcmtsService: ${message}`);
  }


  urlReqOption : string = "";

  updateChecked(val: string[]) {
       
       var str = "?";
       for (var i=0; i<val.length; i++) {
          str = str+val[i]+"=1&";
       }
       this.urlReqOption = str;

       // this.messageService.add(`Input Seclected ${val}`);
       this.messageService.add(`url: ${str}`);
  }
}