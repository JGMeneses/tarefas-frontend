import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../shared/models/task.model';
import { UserDTO } from '../../../shared/models/DTO/UserDTO';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {} as Task;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  squadMembers: UserDTO[] = [];
  isLoading = false;

  @Output() taskCreated = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadSquadMembers();
  }

  loadSquadMembers(): void {
    this.isLoading = true;
    this.taskService.getMySquadMembers().subscribe({
      next: (members) => {
        this.squadMembers = members;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar membros do squad:', err);
        this.errorMessage = 'Erro ao carregar membros do squad';
        this.isLoading = false;
      }
    });
  }

  submitForm(): void {
    if (!this.task.responsible) {
      this.errorMessage = 'Por favor, selecione um responsável';
      return;
    }

    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.successMessage = 'Tarefa cadastrada com sucesso!';
        this.errorMessage = null;
        this.taskCreated.emit();
      },
      error: (err) => {
        console.error('Erro ao cadastrar tarefa:', err);
        this.errorMessage = 'Erro ao cadastrar tarefa. Verifique os dados e tente novamente.';
        this.successMessage = null;
      }
    });
  }
}