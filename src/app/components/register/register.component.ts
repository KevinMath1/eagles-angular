import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    provideNgxMask()
  ]
})
export class RegisterComponent {
  rg = '';
  cpf = '';
  cnpj = '';
  ie = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router  
  ) {}

  onRegister(): void {
    const url = 'http://localhost:8090/pessoas';
    this.httpClient.post(url, { rg: this.rg, cpf: this.cpf, cnpj: this.cnpj, ie: this.ie }).subscribe({
      next: (response) => {
        console.log('Cadastro bem sucedido', response),
            this.router.navigate(['/produtos']);
    },
      error: (error) =>{
        console.error('Erro no cadastro', error),
        this.router.navigate(['/produtos']);
      }
    });
  }
}
