import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public developers: Array<any> = [];
  public httpService: HttpService;
  public columns: any;
  public dataTableRows: any;
  ColumnMode = ColumnMode;

  isUpsertingDeveloper: Boolean = false;
  editDeveloperObj: Object = {};
  isDeletingDeveloper: any = {
    modal: false,
    id: Number,
  };

  public ngOnInit(): void {
    this.getDevelopers()
  }

  getDevelopers() {
    this.httpService.getDevelopers()
      .subscribe((data: any) => {
        this.developers = data
        this.dataTableRows = data.map((x) => {
          return {
            ...x,
            startWork: new Date(x.startWork)
          }
        })
      })
  }

  editDeveloper(id) {
    this.editDeveloperObj = {
      ...this.developers.find(x => x.id === id)
    }
    this.isUpsertingDeveloper = true
  }
  createDeveloper(){
    this.editDeveloperObj = {};
    this.isUpsertingDeveloper = true;
  }
  deleteDeveloper(id){
    this.httpService.deleteDeveloper(id)
    .subscribe((data:any) => {
      this.getDevelopers()
      this.isDeletingDeveloper.modal = false
    })


  }
  
  onUpsertDeveloper() {
    this.httpService.onUpsertDevelopers(this.editDeveloperObj)
    .subscribe((data: any) => {
      this.getDevelopers()
      this.isUpsertingDeveloper = false;
    })
  }

  constructor(httpService: HttpService,) {
      this.columns = [
        {name: 'ID'},
        {name: 'Name'},
        {name: 'Position'},
        {name: 'Starting Year'},
        {name: 'Level'},
        
      ]
    this.httpService = httpService
  }
}
