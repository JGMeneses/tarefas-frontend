import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;  // Acessa o componente de lista

  constructor(private taskService: TaskService) {}

  onTaskCreated(): void {
    this.taskList.loadTasks();  // Chama a atualização da lista ao cadastrar uma nova tarefa
  }
}
