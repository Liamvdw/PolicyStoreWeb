import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPolicyComponent } from './components/dialog-policy/dialog-policy.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './shared/api.service';
import { Policy } from './model/policy.model';
import { DatePipe } from '@angular/common';
import { DialogQuestionComponent } from './components/popup/dialog-question/dialog-question.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  loading: boolean = false;
  columns: string[] = ["actions", "firstName", "lastName", "gender", "dateOfBirth", "policyNo"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  total: number = 0;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllPolicies();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPolicies() {
    this.loading = true;
    setTimeout(() => {
      this.apiService.getAllPolicies().subscribe((results: Policy[]) => {
        this.dataSource = new MatTableDataSource(results);
        this.total = this.dataSource.data.length;
        this.loading = false;
      });
    }, 300);
  }

  deletePolicy(row) {
    this.loading = true;
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '500px',
      data: { header: 'Warning', message: 'Are you sure you want to delete this policy?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deletePolicy(row).subscribe(results => {
          if (results.isSuccessful)
            this.getAllPolicies();
        });
      }
      else
        this.loading = false;
    });
  }

  openDialog(row) {
    const dialogRef = this.dialog.open(DialogPolicyComponent, {
      data: row ? row : null,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isSuccessful)
        this.getAllPolicies();
    });
  }

  deletePopup(): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '500px',
      data: { header: 'Warning', message: 'Are you sure you want to delete this policy?' },
    });


  }
}
