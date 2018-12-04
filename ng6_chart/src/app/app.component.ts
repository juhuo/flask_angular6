import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';

import { CcmtsService }  from './ccmts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog,
              private _ccmtsService: CcmtsService) { }

  ngOnInit() {}

  title = 'charts';
  msgBtn : string = "show messge";

  // multi-section
  toppings = new FormControl();
  toppingList: string[] = ["ds throughtput", "dsmac-bpi-crc", "dsmac-data", "dsmac-queue", "dsmac-test", "ip4-lookup", "ip4-rewrite", "memif-input", "memif0/1-output", "memif0/1-tx"];
  //['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  selectedValue = null;
  addSelValue(val: string[]) {
    this._ccmtsService.updateChecked(val);
  }

 
  // Message
  showMsg : boolean = false;
  onClickMsgBtn() : void {
  	this.showMsg = !this.showMsg;
    //console.log(this.showMsg);

  	if(this.showMsg) {
  		this.msgBtn = "hide messge";
  	} else {
  		this.msgBtn = "show messge";
  	}
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
}