export interface OrderModel {
    selectedMovie: any
    selectedDate: any
    selectedTime: any
    numberOfTickets: number
    pricePerItem: number
    status: 'ordered' | 'paid' | 'canceled';
    rating: 'not-rated' | 'liked' | 'disliked';
}