export type gestor = {
  name: string;
};

export type cliente = {
  name: string;
  dni: string;
};

export type hipoteca = {
  cliente: cliente;
  gestor: gestor;
  cuota: number;
};
