import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-policy',
  templateUrl: './dialog-policy.component.html',
  styleUrls: ['./dialog-policy.component.scss'],

})
export class DialogPolicyComponent implements OnInit {
  isNew: boolean = false;
  formData: FormGroup;
  header: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService) {
    if (!this.data) {
      this.isNew = true;
      this.header = 'Add Policy Document'
    }
    else {
      this.isNew = false;
      this.header = 'Update Policy Document'
    }
  }

  ngOnInit(): void {
    this.formData = this.builder.group({
      FirstName: new FormControl(this.data ? this.data.firstName : '', [Validators.required]),
      LastName: new FormControl(this.data ? this.data.lastName : '', [Validators.required]),
      Gender: new FormControl(this.data ? this.data.gender : '', [Validators.required]),
      DateOfBirth: new FormControl(this.data ? this.data.dateOfBirth : new Date(), [Validators.required]),
      PolicyNo: new FormControl(this.data ? this.data.policyNo : '', [Validators.required])
    })
  }

  addPolicy() {
    if (this.formData.status == 'VALID') {
      this.apiService.addPolicy(this.formData.value).subscribe(results => {
        this.dialogRef.close(results);
      });
    }
  }

  updatePolicy() {
    if (this.formData.status == 'VALID') {
      this.apiService.updatePolicy(this.data.policyNo, this.formData.value).subscribe(results => {
        this.dialogRef.close(results);
      });
    }
  }
}