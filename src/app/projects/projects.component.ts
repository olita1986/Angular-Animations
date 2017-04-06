import {Component, HostBinding, OnInit} from '@angular/core';

import { Project } from './project.model';

import { ProjectsService } from './projects.service';

import {itemStateTrigger, markedState, slideStateTrigger} from './animations';
import {AnimationEvent} from '@angular/animations';
import {routeFadeStateTrigger, routeSlideStateTrigger} from "../shared/route-animations";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    markedState,
    itemStateTrigger,
    slideStateTrigger,
    routeFadeStateTrigger,
    routeSlideStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  displayedProjects: Project[] = [];
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  // @HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@routeSlideState') routeAnimation = true;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;

          if (this.projects.length >= 1) {
            this.displayedProjects.push(this.projects[0])
          }
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    setTimeout(() => {
      this.projects.unshift(project);
    },300);
  }

  onItemAnimated(animationEvent: AnimationEvent, lastPrjId: number){
    if (animationEvent.fromState != 'void') {
      return;
    }

    if (this.projects.length > lastPrjId + 1) {
      this.displayedProjects.push(this.projects[lastPrjId + 1])
    } else {
      this.projects = this.displayedProjects;
    }
  }
}
