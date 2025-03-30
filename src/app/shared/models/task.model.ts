export interface Task {
    id: number;
    title: string;
    description?: string;
    responsible: string;
    idSquadResponsavel: number;
    priority: 'ALTA' | 'MEDIA' | 'BAIXA';
    status: 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PENDENTE';
    deadline: Date;
    createdAt?: Date;
    updatedAt?: Date;
}


export type StatusMap = {
    [key in 1 | 2 | 3]: { // Especifica exatamente as chaves permitidas
      label: string;
      class: string;
    };
};