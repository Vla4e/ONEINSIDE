import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public projects: Array<any> = [];
  public developers: Array<any> = [];
  public httpService: HttpService;
  public columns: any;
  public dataTableRows: any;
  
  isUpsertingProject: Boolean = false;
  editProjectObj: Object = {};
  assignmentSelection: any = {
    projectId: Number,
    developerId: Number,
  }
  isAssigningProject: any = {
    modal: false,
    id: Number,
  }
  isDeletingProject: any = {
    modal: false,
    id: Number,
  };

  public ngOnInit(): void {
    this.getProjects()
    this.getDevelopers()
  }
  getDevelopers() {
    this.httpService.getDevelopers()
      .subscribe((data: any) => {
        this.developers = data
      })
  }

  //Projects
  getProjects() {
    this.httpService.getProjects()
      .subscribe((data: any) => {
        this.projects = data
        this.dataTableRows = data.map((x) => {
          return {
            ...x,
          }
        })
    })
  }
  editProject(id) {
    console.log('This is ID', id)
    this.editProjectObj = {
      ...this.projects.find(x => x.id === id)
    }
    this.isUpsertingProject = true
  }
  createProject(){
    this.editProjectObj = {};
    this.isUpsertingProject = true;
  }
  deleteProject(id){
    console.warn(id)
    this.httpService.deleteProject(id)
    .subscribe((data:any) => {
      this.getProjects()
      console.log(data)
      this.isDeletingProject.modal = false
    })


  }
  onUpsertProject() {
    console.warn(this.editProjectObj)
    this.httpService.onUpsertProjects(this.editProjectObj)
    .subscribe((data: any) => {
      this.getProjects()
      console.log(data)
      this.isUpsertingProject = false;
    })
  }

  //Assignments
  createAssignment(assignmentSelection){
    console.warn(assignmentSelection)
    this.httpService.createAssignment(assignmentSelection)
    .subscribe((data: any) => {
      this.getProjects()
      console.log(data)
      this.isAssigningProject.modal = false
    })
  }
  fireDeveloper(assignmentSelection){
    console.warn(assignmentSelection)
    this.httpService.fireDeveloper(assignmentSelection)
    .subscribe((data: any) => {
      this.getProjects()
      console.log(data)
      this.isUpsertingProject = false;
    })
  }

  constructor(httpService: HttpService,) {
    this.httpService = httpService;
  }

}
