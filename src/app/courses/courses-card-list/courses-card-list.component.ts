import { CourseEntityService } from "./../services/course-entity.service";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent {
  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private courseService: CourseEntityService
  ) {}
}
