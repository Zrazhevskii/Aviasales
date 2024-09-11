export interface TicketsSegments {
    // Код города (iata)
    origin: string;
    // Код города (iata)
    destination: string;
    // Дата и время вылета туда
    date: string;
    // Массив кодов (iata) городов с пересадками
    stops: string[];
    // Общее время перелёта в минутах
    duration: number;
}

export interface TicketItem {
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: TicketsSegments[];
}

export interface TicketsState {
    tickets: TicketItem[];
    copyTickets: TicketItem[];
    loading: boolean;
    error: boolean;
    showMoreTickets: number;
    noResult: boolean;
    isSearchId: boolean;
    stop: boolean;
}
