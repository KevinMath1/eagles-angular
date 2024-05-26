import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule // Adicionar FormsModule aos imports
  ]
})
export class ListaComponent {
  produtos: any[] = [];
  produtoEditando: any = null; // Adicionar a propriedade produtoEditando

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos(): void {
    const url = 'http://localhost:8090/produtos';
    this.httpClient.get<any[]>(url).subscribe({
      next: (produtos) => {
        console.log('Produtos recebidos:', produtos);
        this.produtos = produtos;
      },
      error: (error) => console.error('Erro ao listar produtos', error)
    });
  }

  editarProduto(produto: any): void {
    this.produtoEditando = {...produto};
    console.log('Produto em edição:', this.produtoEditando); 
  }
  cancelarEdicao(): void {
    this.produtoEditando = null;
  }

  deletarProduto(id: number): void {
    const url = `http://localhost:8090/produtos/${id}`;
    this.httpClient.delete(url).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        console.log(`Produto com ID ${id} deletado.`);
      },
      error: (error) => console.error('Erro ao deletar produto', error)
    });
  }
}
