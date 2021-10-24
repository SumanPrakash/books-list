import { CourseEntityService } from "./../services/course-entity.service";
import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // promoTotal$: Observable<number>;

  loading$: Observable<boolean>;

  // beginnerCourses$: Observable<Course[]>;
  beginnerCourses$: Observable<any>;

  advancedCourses$: Observable<Course[]>;

  searchText = "";

  constructor(
    private dialog: MatDialog,
    private coursesService: CourseEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.coursesService.entities$.pipe(
      map((courses) =>
        courses.filter(
          (course) =>
            course["volumeInfo"].title
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) != -1
        )
      )
    );

    this.loading$ = this.coursesService.loading$;
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create New Book",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
