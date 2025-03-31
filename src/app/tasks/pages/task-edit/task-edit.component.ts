import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../shared/models/task.model';
import { UserDTO } from '../../../shared/models/DTO/UserDTO';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../../components/header/header.component';

type PriorityKey = 'high' | 'medium' | 'low';
type StatusKey = 'pending' | 'in_progress' | 'completed';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    ReactiveFormsModule
],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  currentSquadId: number | null = null;
  taskForm!: FormGroup;
  taskId!: number;
  isLoading = true;
  squadMembers: UserDTO[] = [];
  errorMessage: string | null = null;

  priorityMap: Record<PriorityKey, 'ALTA' | 'MEDIA' | 'BAIXA'> = {
    'high': 'ALTA',
    'medium': 'MEDIA',
    'low': 'BAIXA'
  };
  
  statusMap: Record<StatusKey, 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PENDENTE'> = {
    'pending': 'PENDENTE',
    'in_progress': 'EM_ANDAMENTO',
    'completed': 'CONCLUIDA'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadTask();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      responsible: ['', Validators.required],
      priority: ['medium', Validators.required],
      deadline: [''],
      status: ['pending', Validators.required]
    });
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        const priority = this.getPriorityForForm(task.priority);
        const status = this.getStatusForForm(task.status);
        
        const deadline = task.deadline instanceof Date 
          ? this.formatDateForInput(task.deadline) 
          : task.deadline;

        this.currentSquadId = task.idSquadResponsavel || null;
        
        // Carrega membros do squad
        if (this.currentSquadId) {
          this.loadSquadMembers();
        }

        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          responsible: task.responsible,
          priority: priority,
          deadline: deadline,
          status: status
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar tarefa';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/tasks']);
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

  private getPriorityForForm(priority: string): PriorityKey {
    switch(priority) {
      case 'ALTA': return 'high';
      case 'MEDIA': return 'medium';
      case 'BAIXA': return 'low';
      default: return 'medium';
    }
  }

  private getStatusForForm(status: string): StatusKey {
    switch(status) {
      case 'PENDENTE': return 'pending';
      case 'EM_ANDAMENTO': return 'in_progress';
      case 'CONCLUIDA': return 'completed';
      default: return 'pending';
    }
  }

  checkResponsibleValidity() {
    const responsibleControl = this.taskForm.get('responsible');
    const squadId = this.currentSquadId;
    
    if (responsibleControl?.value && squadId) {
      this.taskService.checkUserInSquad(responsibleControl.value, squadId).subscribe({
        next: isValid => {
          if (!isValid) {
            responsibleControl.setErrors({ invalidResponsible: true });
            this.errorMessage = `O responsável ${responsibleControl.value} não pertence ao squad atual`;
          } else {
            responsibleControl.setErrors(null);
            this.errorMessage = null;
          }
        },
        error: (err) => {
          console.error('Erro ao validar responsável:', err);
          responsibleControl?.setErrors({ validationError: true });
        }
      });
    }
  }

  updateTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      if (this.taskForm.get('responsible')?.errors?.['invalidResponsible']) {
        this.errorMessage = 'Por favor, selecione um responsável válido para o squad';
      }
      
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = null;
  
    const formData = this.taskForm.value;
    const taskData: Partial<Task> = {
      title: formData.title,
      description: formData.description || undefined,
      responsible: formData.responsible,
      priority: this.priorityMap[formData.priority as PriorityKey],
      status: this.statusMap[formData.status as StatusKey],
      deadline: formData.deadline ? new Date(formData.deadline) : undefined
    };
  
    this.taskService.updateTask(this.taskId, taskData).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar tarefa. Tente novamente.';
        this.isLoading = false;
        console.error('Erro ao atualizar tarefa', err);
      }
    });
  }

  private formatDateForInput(date: Date | string): string {
    if (!date) return '';
    if (typeof date === 'string') return date.split('T')[0];
    return date.toISOString().split('T')[0];
  }
}