export interface headerItem {
    id: number;
    title: string;
    status: boolean;
}

export interface headerState {
    ticketAggregate: headerItem[];
}
