import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../shared/models/task.model';
import { UserDTO } from '../../shared/models/DTO/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  private apiUrlSquad = 'http://localhost:8080/api/squads';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/my-tasks`, { headers: this.getAuthHeaders() });
  }

  getMySquadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/my-squad-tasks`, { headers: this.getAuthHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, taskData: Partial<Task>): Observable<Task> {
    // Garante que a data seja enviada no formato correto
    const payload = {
      ...taskData,
      deadline: this.formatDateForApi(taskData.deadline)
    };
    
    return this.http.put<Task>(
      `${this.apiUrl}/${id}`,
      payload,
      { headers: this.getAuthHeaders() }
    );

    }
    checkUserInSquad(username: string, squadId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/users/check?username=${username}&squadId=${squadId}`);
    }
  
  private formatDateForApi(date?: Date | string): string | undefined {
    if (!date) return undefined;
    
    // Se já for string, assume que está no formato correto
    if (typeof date === 'string') return date;
    
    // Converte Date para ISO string (remove a parte do timezone)
    return date.toISOString().split('T')[0];
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTaskStatus(id: number, status: number | string): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}/${id}/status?status=${status}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  getMySquadMembers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(
      `${this.apiUrlSquad}/my-squad/members`, 
      { headers: this.getAuthHeaders() }
     );
  }
}