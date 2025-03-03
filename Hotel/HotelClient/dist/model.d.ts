export interface CustomerRegistration {
    customerID: string;
    name: string;
    mobileNumber: string;
    aadhar: string;
    mailID: string;
    address: string;
    foodType: string;
    gender: string;
    password: string;
    walletBalance: number;
    profilePhoto: string;
}
export interface RoomDetails {
    roomID: string;
    roomType: string;
    numberOfBeds: number;
    pricePerDay: number;
    roomImage: string;
}
export interface BookingDetails {
    bookingID: any;
    customerID: string;
    totalPrice: number;
    dateOfBooking: string;
    bookingStatus: string;
}
export interface Wishlist {
    wishlistID: string;
    customerID: string;
    roomID: string;
    purchaseCount: number;
    priceOfRoom: number;
    stayingFrom: string;
    stayingTo: string;
    roomImage: string;
}
export interface RoomSelection {
    SelectionID: string;
    wishlistID: string;
    bookingID: string;
    roomID: string;
    StayingDateFrom: string;
    StayingDateTo: string;
    price: number;
    numberOfDays: number;
    bookingStatus: string;
}
