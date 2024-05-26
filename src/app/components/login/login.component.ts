import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  name = '';
  password = '';

  constructor(private httpClient: HttpClient) {}

  onLogin(): void {
    console.log('Dados de Login:', { name: this.name, password: this.password });

    const url = 'http://localhost:8090/login';  // A URL pode ser ajustada conforme necessário
    this.httpClient.post(url, { name: this.name, password: this.password }).subscribe({
      next: (response) => console.log('Login bem sucedido', response),
      error: (error) => console.error('Erro no login', error)
    });
  }
}
