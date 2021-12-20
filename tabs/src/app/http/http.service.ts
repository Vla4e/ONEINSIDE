import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //TODO: change to one baseurl
  baseUrlDev = 'http://localhost:3000/developers';
  baseUrlProjects = 'http://localhost:3000/projects'
  baseUrlAssignment ='http://localhost:3000/assignments'

  //Assignment Calls
  createAssignment(assignment){
    return this.http.post<any>(this.baseUrlAssignment, {
      projectId: assignment.projectId,
      developerId: assignment.developerId,
    })
  }
  fireDeveloper(assignment){
    const url = `${this.baseUrlAssignment}`
    return this.http.delete<any>(url, { body: assignment })
  }

  //Project Calls
  getProjects() {
    return this.http.get<any>(this.baseUrlProjects);
  }
  deleteProject(id){
    const url = `${this.baseUrlProjects}/${id}`
    return this.http.delete<any>(url)
  }
  onUpsertProjects(project){
    if(!project.id){
      return this.http.post<any>(this.baseUrlProjects, {
        ...project,
      });
    } else {
      return this.http.put<any>(this.baseUrlProjects, {
        ...project,
      })
    }
  }

  //Developer Calls
  getDevelopers() {
    return this.http.get<any>(this.baseUrlDev);
  }
  deleteDeveloper(id){
    const url = `${this.baseUrlDev}/${id}`
    return this.http.delete<any>(url)
  }
  onUpsertDevelopers(developer){
    if(!developer.id){
      return this.http.post<any>(this.baseUrlDev, {
        name: developer.name,
        position: developer.position,
        startWork: developer.startWork,
        level: developer.level
      });
    } else {
      return this.http.put<any>(this.baseUrlDev, {
        id: developer.id,
        name: developer.name,
        position: developer.position,
        startWork: developer.startWork,
        level: developer.level
      })
    }
  }
  constructor(private http: HttpClient) { }
}