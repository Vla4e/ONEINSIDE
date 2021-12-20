import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';

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
    console.log('This is ID', id)
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
    console.warn(id)
    this.httpService.deleteDeveloper(id)
    .subscribe((data:any) => {
      this.getDevelopers()
      console.log(data)
      this.isDeletingDeveloper.modal = false
    })


  }
  
  onUpsertDeveloper() {
    console.warn(this.editDeveloperObj)
    this.httpService.onUpsertDevelopers(this.editDeveloperObj)
    .subscribe((data: any) => {
      this.getDevelopers()
      console.log(data)
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
