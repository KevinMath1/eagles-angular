import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductModalEditComponent } from '../product-modal-edit/product-modal-edit.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatDialogModule, 
    ProductModalComponent,
    ProductModalEditComponent,
    ToastModule
  ],
  providers: [MessageService] 
})
export class ListaComponent {
  produtos: any[] = [];
  produtoEditando: any = null;

  constructor(private httpClient: HttpClient,private messageService: MessageService, public dialog: MatDialog) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos(): void {
    const url = 'http://localhost:8090/produtos';
    this.httpClient.get<any[]>(url).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (error) => console.error('Erro ao listar produtos', error)
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.productAdded.subscribe(() => {
      this.messageService.add({severity:'success', summary: 'Produto cadastrado com sucesso'});
      this.listarProdutos(); 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado', result);
    });
  }

  editarProduto(produto: any): void {
    const dialogRef = this.dialog.open(ProductModalEditComponent, {
      width: '600px',
      data: produto 
    });
    dialogRef.componentInstance.productUpdated.subscribe(() => {
      this.messageService.add({severity:'success', summary: 'Produto editado com sucesso'});
      this.listarProdutos(); 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de edição foi fechado');
    });
  }
  
  cancelarEdicao(): void {
    this.produtoEditando = null;
  }

  deletarProduto(id: number): void {
    const url = `http://localhost:8090/produtos/${id}`;
    this.httpClient.delete(url).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
      this.messageService.add({severity:'success', summary: 'Produto deletado com sucesso'});
        console.log(`Produto com ID ${id} deletado.`);
      },
      error: (error) => {
      this.messageService.add({severity:'error', summary: 'Erro ao deletar produto'});
        console.error('Erro ao deletar produto', error)
      }
    });
  }
}
