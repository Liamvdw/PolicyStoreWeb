import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.scss']
})
export class DialogQuestionComponent implements OnInit {
  header: string = '';
  message: string = '';
  result: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.header = data.header;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  submit(result){
    this.dialogRef.close(result);
  }

}
