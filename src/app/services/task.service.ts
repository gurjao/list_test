import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Tarefa } from '../model/tarefa';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  public tarefas: Tarefa[] = [
    {descricao: 'Tarefa 1', cpf : 12345678900, responsavel : 'Lorem ipsum 1', status: false, isSelected: false, isEdit: false},
    {descricao: 'Tarefa 2', cpf : 12345678901, responsavel : 'Lorem ipsum 2', status: true, isSelected: false, isEdit: false},
    {descricao: 'Tarefa 3', cpf : 12345678902, responsavel : 'Lorem ipsum 3', status: false, isSelected: false, isEdit: false},
    {descricao: 'Tarefa 4', cpf : 12345678903, responsavel : 'Lorem ipsum 4', status: false, isSelected: false, isEdit: false},
    {descricao: 'Tarefa 5', cpf : 12345678904, responsavel : 'Lorem ipsum 5', status: false, isSelected: false, isEdit: false},
    {descricao: 'Tarefa 6', cpf : 12345678905, responsavel : 'Lorem ipsum 6', status: false, isSelected: false, isEdit: false}
  ];

  getTarefas(): Tarefa[] {
    return this.tarefas
  }

  editTarefa(tarefa: Tarefa): Tarefa {
    //this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
    //adicionar lógica de atualizar tarefas
    const index = this.tarefas.indexOf(tarefa);
    this.tarefas.splice(index, 1);
    return tarefa
  }

  addTarefa(tarefa: Tarefa): Tarefa {
    //return this.http.post<User>(`${this.serviceUrl}/add`, user);
    //adicionar lógica de adicionar em tarefas
    this.tarefas.push(tarefa);
    return tarefa
  }

  deleteTarefa(tarefa: Tarefa, index: any) {
    //return this.http.delete<User>(`${this.serviceUrl}/${id}`);
    //adicionar lógica de deletar tarefas
    this.tarefas.forEach((value, index)=>{
      if(value.cpf == tarefa.cpf) this.tarefas.splice(index, 1);
    });
    const tarefas = this.tarefas;
    return tarefas
  }

  deleteTarefas(tarefa: Tarefa[]): Tarefa[] {
    // return forkJoin(
    //   users.map((user) =>
    //     this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
    //   )
    // );
    return tarefa
  }
}
