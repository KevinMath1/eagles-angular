import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastModule  
  ],
  providers: [MessageService] 
})
export class LoginComponent {
  name = '';
  password = '';
  nameError = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private messageService: MessageService 
  ) {}

  validateName(): void{
    if (!this.name.trim() || !this.password.trim()) {
      this.nameError = true; 
    }
  }

  onLogin(): void {
    if (!this.name.trim() || !this.password.trim()) {
      this.nameError = true; 
      this.messageService.add({
        severity: 'info',
        summary: 'Campos Vazios',
        detail: 'Por favor, preencha todos os campos.'
      });
      return;
    }
    const url = 'http://localhost:8090/api/auth/login';
    this.httpClient.post<any>(url, { username: this.name, password: this.password }).subscribe({
        next: (response) => {
            console.log('Login bem sucedido', response);
            this.messageService.add({severity:'success', summary: 'Login bem sucedido', detail: response.message});
            this.router.navigate(['/register']);
        },
        error: (error) => {
            console.error('Erro no login', error);
            this.messageService.add({severity:'error', summary: 'Erro no login', detail: error.error.message || 'Usuário ou senha incorretos'});
        }
    });
  }
}
