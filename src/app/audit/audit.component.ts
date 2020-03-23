import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


// an interface for userdata 
export interface UserData {
    id: string;
    user: string;
    loginTime: string;
    logoutTime: string;
    ip: string;
  }
  
@Component({ templateUrl: 'audit.component.html'})

export class AuditComponent
{
    displayedColumns = ['id', 'user', 'loginTime', 'logoutTime', 'ip'];   // Displaying Column Names on Table
    dataSource = new MatTableDataSource<UserData> ();   // Insilizaing mattable for data soluce

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;   // Paginator children reference
    @ViewChild(MatSort, {static: true}) sort: MatSort;  // Sorting children reference

    audits = [];
    currentUser;
    TimeFormat = 'hh:mm:ss a';
    constructor( private authenticationService: AuthenticationService, private auditService: AuditService ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllAudits();
    }

    private loadAllAudits() {
        // this.auditService.getAll().pipe(first()).subscribe(audits => this.audits = audits);
        this.auditService.getAll().subscribe((data: {}) => {
            this.dataSource.data = data as UserData[];
        });
    }

      /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }

}