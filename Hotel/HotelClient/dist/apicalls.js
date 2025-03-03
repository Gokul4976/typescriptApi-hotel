var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function CheckCustomer(mailID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/customercontroller/${mailID}`;
        let response = yield fetch(apiURL);
        console.log(response);
        // console.log(response.json());
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
export function AddNewCustomer(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/customercontroller/newUser/${customer}`;
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        console.log(response.text);
        return yield response.text();
    });
}
export function GetIndividualUser(mailID, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/customercontroller/${mailID}/${password}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            return null;
        }
        return yield response.json();
    });
}
export function FetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomcontroller/rooms`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
export function GetIndividualProduct(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomcontroller/get/room/${roomID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            return null;
        }
        //returns product
        return yield response.json();
    });
}
export function EditProductDetail(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomcontroller/new/prod/edit`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("Fail to update data");
        }
    });
}
export function DeleteProductDetail(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5224/api/hotel/roomcontroller/delete/${roomID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
export function AddNewProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5224/api/hotel/roomcontroller/add/newProduct";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        return yield response.text();
    });
}
export function RechargeWalletBalance(customerID, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/customercontroller/recharge/${customerID}/${amount}`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Fail to update data");
        }
    });
}
export function FetchAllBookings(customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomSelectionController/fetchbookings/${customerID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
export function AddItemToCart(cartItem) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5224/api/hotel/wishlistcontroller/add/cartItem";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        return yield response.text();
    });
}
export function FetchCarts(customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/wishlistcontroller/carts/${customerID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
export function UpdateCartQuantity(customerID, cartID, startdate, enddate) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/wishlistcontroller/update/cart/${customerID}/${cartID}/${startdate}/${enddate}`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Fail to update data");
        }
    });
}
export function DeleteCartDetail(customerID, wishlistID) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(customerID, wishlistID);
        const response = yield fetch(`http://localhost:5224/api/hotel/wishlistcontroller/delete/newcart/${customerID}/${wishlistID}`, {
            method: 'DELETE'
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
export function BuySingleItem(cartID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5224/api/hotel/roomSelectionController/new/singleBooking/${cartID}/${customerID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        return yield response.text();
    });
}
export function GetIndividualBooking(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomSelectionController/fetchbookings/get/${bookingID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            return null;
        }
        //returns product
        return yield response.json();
    });
}
export function purchaseAll(customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5224/api/hotel/roomSelectionController/add/purchases";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerID)
        });
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        return yield response.text();
    });
}
export function FetchPurchases(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5224/api/hotel/roomSelectionController/fetchpurchases/${bookingID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
export function cancelBooking(bookingID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5224/api/hotel/roomSelectionController/cancel/booking/${bookingID}/${customerID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        return yield response.text();
    });
}
export function CheckIsBooked(room, startdate, enddate) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(typeof(startdate)+'api');
        console.log(startdate.toString());
        const response = yield fetch(`http://localhost:5224/api/hotel/roomSelectionController/checkbooking/${room}/${startdate}/${enddate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        // if (!response.ok) {
        //     throw new Error('Failed to add wishlist');
        // }
        return yield response.text();
    });
}
