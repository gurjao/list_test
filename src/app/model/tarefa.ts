export interface Tarefa {
  isSelected: boolean;
  descricao: string;
  cpf: number;
  responsavel: string;
  status: boolean;
  isEdit: boolean;

}

export const TaskColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'descricao',
    type: 'text',
    label: 'Descrição',
    required: true,
  },
  {
    key: 'cpf',
    type: 'number',
    label: 'CPF',
    required: true,
  },
  {
    key: 'responsavel',
    type: 'string',
    label: 'Responsável',
    //pattern: '.+@.+',
  },
  {
    key: 'status',
    type: 'text',
    label: 'Status',
    readonly: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

