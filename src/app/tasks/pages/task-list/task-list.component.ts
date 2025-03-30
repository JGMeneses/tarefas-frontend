import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../shared/models/task.model';
import { AuthService } from '../../../core/services/AuthService';

// Define the possible status values
type TaskStatus = 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PENDENTE' | 'TODAS';

interface StatusMap {
  EM_ANDAMENTO: { label: string; class: string };
  CONCLUIDA: { label: string; class: string };
  PENDENTE: { label: string; class: string };
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  loading = true;
  errorMessage: string | null = null;
  currentStatusFilter: TaskStatus = 'TODAS';
  displayedColumns: string[] = ['title', 'description', 'status', 'priority', 'createdAt', 'deadline', 'actions'];
  statusOptions: TaskStatus[] = ['TODAS', 'EM_ANDAMENTO', 'CONCLUIDA', 'PENDENTE'];

  statusMap: StatusMap = {
    EM_ANDAMENTO: { label: 'Em Andamento', class: 'status-in-progress' },
    CONCLUIDA: { label: 'Concluída', class: 'status-completed' },
    PENDENTE: { label: 'Pendente', class: 'status-pending' }
  };

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = null;

    this.taskService.getMySquadTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
        this.loading = false;

        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Sessão expirada. Faça login novamente.';
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Erro ao carregar tarefas. Tente novamente.';
        }
      }
    });
  }

  filterTasks(status: TaskStatus): void {
    this.currentStatusFilter = status;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.currentStatusFilter === 'TODAS') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.currentStatusFilter);
    }
  }


  editTask(id?: number): void {
    if (id) {
      this.router.navigate(['/tasks/', id]);
    }
  }

  deleteTask(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          console.error('Erro ao excluir tarefa:', err);
          this.errorMessage = 'Erro ao excluir tarefa. Tente novamente.';
        }
      });
    }
  }

  formatDate(dateString: string | Date | undefined): string {
    if (!dateString) return 'Sem data';
  
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'ALTA':
        return 'priority-high';
      case 'MEDIA':
        return 'priority-medium';
      case 'BAIXA':
        return 'priority-low';
      default:
        return '';
    }
  }
  getStatusLabel(status: TaskStatus): string {
    if (status === 'TODAS') return 'Todos';
    return this.statusMap[status].label;
  }
  
  getStatusClass(status: TaskStatus): string {
    if (status === 'TODAS') return '';
    return this.statusMap[status].class;
  }

  // Update markAsCompleted to use the string status
  markAsCompleted(taskId?: number): void {
    if (!taskId) return;
    this.taskService.updateTaskStatus(taskId, 2).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Erro ao marcar tarefa como concluída:', err);
        this.errorMessage = 'Erro ao concluir tarefa. Tente novamente.';
      }
    });
  }
}