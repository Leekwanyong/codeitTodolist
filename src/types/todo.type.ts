export interface TodoRequst {
    itemId: number;
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
}

export interface TodoResponse {
    id: number;
    name: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
}
