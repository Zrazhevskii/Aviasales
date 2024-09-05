export interface asideItem {
    id: number;
    title: string;
    status: boolean;
}

export interface asideState {
    choiceList: asideItem[];
}
