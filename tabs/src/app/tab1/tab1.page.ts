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

  isUpsertingDeveloper: Boolean = false;
  editDeveloperObj: Number | null = null;

  public ngOnInit(): void {
    this.getDevelopers()
  }

  getDevelopers() {
    this.httpService.getDevelopers()
      .subscribe((data: any) => {
        this.developers = data
      })
  }

  editDeveloper(id) {
    this.editDeveloperObj = {
      ...this.developers.find(x => x.id === id)
    }
    this.isUpsertingDeveloper = true
  }

  onUpsertDeveloper() {
    console.warn(this.editDeveloperObj)
  }

  constructor(httpService: HttpService) {
    this.httpService = httpService
  }
}
