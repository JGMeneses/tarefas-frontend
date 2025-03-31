import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskListComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;

  constructor(private taskService: TaskService) {}

  onTaskCreated(): void {
    this.taskList.loadTasks(); 
  }
}
