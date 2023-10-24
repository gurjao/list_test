import { AfterViewInit, Component, ViewChild } from '@angular/core';

//Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'

import { SelectionModel } from '@angular/cdk/collections';

//Model
import { Tarefa, TaskColumns } from '../model/tarefa';
import { TaskService } from '../services/task.service';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})

export class TarefaListaComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private taskService: TaskService){
  }
  public initialSelection = [];
  public allowMultiSelect = true;
  public chipColor = "accent";

  //displayedColumns: string[] = TaskColumns.map((col) => col.key)
  displayedColumns: string[] = ['isSelected', 'descricao', 'cpf', 'responsavel', 'status', 'isEdit'];
  columnsSchema: any = TaskColumns
  dataSource = new MatTableDataSource<Tarefa>();
  valid: any = {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.taskService.getTarefas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selection = new SelectionModel<Tarefa>(this.allowMultiSelect, this.initialSelection);

  itemSelecionado(row : any){
    console.log(row);
  }

  adicionar(){
    console.log("Adicionar");
    const newTask: Tarefa = {
      descricao: '',
      cpf: 0,
      responsavel: '',
      status: false,
      isSelected: false,
      isEdit: true,
    }
    this.dataSource.data = [newTask, ...this.dataSource.data]
  }

  cancelarEdicao(element : any, index : any){
    if (element.descricao === "" || element.cpf === 0 || element.responsavel === "") {
      this.dataSource.data.forEach((value, index)=>{
        if( value == element ) this.dataSource.data.splice(index, 1);
      });
      this.dataSource.data = this.dataSource.data;
      element.isEdit = false;
    } else {
      element.isEdit = false;
    }
  }

  concluir(){
    console.log("Concluir");
  }

  excluir(tarefa : Tarefa, index : any){
    console.log("Excluir");
    // this.dataSource.data = this.dataSource.data.filter(
    //   (t: Tarefa) => t.cpf !== cpf,
    // )
    //this.taskService.deleteTarefa(tarefa, index);
    this.dataSource.data.forEach((value, index)=>{
      if( value == tarefa ) this.dataSource.data.splice(index, 1);
    });
    this.dataSource.data = this.dataSource.data;
  }

  excluirSelecionadas(){
    console.log("Excluir Selecionadas");
    const tarefas = this.dataSource.data.filter((t: Tarefa) => t.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
            this.dataSource.data = this.dataSource.data.filter(
              (t: Tarefa) => !t.isSelected,
            )
        }
      })
  }

  editarTarefa(row: Tarefa) {
    console.log(row);
    //this.taskService.editTarefa(row);
    row.isEdit = false
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
