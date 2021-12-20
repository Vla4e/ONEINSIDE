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
  public assignedDevelopers: any;
  
  isStartTimeOpen: Boolean = false;
  isEndTimeOpen: Boolean = false;
  isUpsertingProject: Boolean = false;
  editProjectObj: any = {};
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
        this.assignedDevelopers  = data.map((x)=>{
          return{
            ...x.developers,
          }
        })
    })
  }
  editProject(id) {
    this.editProjectObj = {
      ...this.projects.find(x => x.id === id)
    }
    this.assignmentSelection.projectId = id;
    this.isUpsertingProject = true
  }
  createProject(){
    this.editProjectObj = {};
    this.isUpsertingProject = true;
  }
  deleteProject(id){
    this.httpService.deleteProject(id)
    .subscribe((data:any) => {
      this.getProjects()
      this.isDeletingProject.modal = false
    })


  }
  onUpsertProject() {
    this.httpService.onUpsertProjects(this.editProjectObj)
    .subscribe((data: any) => {
      this.getProjects()
      this.isUpsertingProject = false;
    })
  }

  //Assignments
  createAssignment(assignmentSelection){
    this.httpService.createAssignment(assignmentSelection)
    .subscribe((data: any) => {
      this.getProjects()
      this.isAssigningProject.modal = false
    })
  }
  fireDeveloper(assignmentSelection){
    if(!assignmentSelection.developerId) return;
    this.httpService.fireDeveloper(assignmentSelection)
    .subscribe((data: any) => {
      this.getProjects()
      this.isUpsertingProject = false;
    })
  }

  constructor(httpService: HttpService,) {
    this.httpService = httpService;
  }

}
