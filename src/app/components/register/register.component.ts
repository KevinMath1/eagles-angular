import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  rg = '';
  cpf = '';
  cnpj = '';
  ie = '';

  constructor(private httpClient: HttpClient) {}

  onRegister(): void {
    console.log('Dados de Cadastro:', { rg: this.rg, cpf: this.cpf, cnpj: this.cnpj, ie: this.ie });

    const url = 'http://localhost:8090/pessoa';
    this.httpClient.post(url, { rg: this.rg, cpf: this.cpf, cnpj: this.cnpj, ie: this.ie }).subscribe({
      next: (response) => console.log('Cadastro bem sucedido', response),
      error: (error) => console.error('Erro no cadastro', error)
    });
  }
}
