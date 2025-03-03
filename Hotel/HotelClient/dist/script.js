var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as APICALLS from './apicalls.js';
const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");
const homePage = document.getElementById("homePage");
var signInButton = document.getElementById("signInButton");
var signUpButton = document.getElementById("signUpButton");
const userProfilePage = document.getElementById("UserProfilePage");
const productProfilePage = document.getElementById("ProductProfilePage");
const walletRechargePage = document.getElementById("walletRechargePage");
const takeOrderPage = document.getElementById("TakeOrderPage");
const addNewProductPage = document.getElementById("addNewProduct");
const editProductPage = document.getElementById("editProduct");
const customerCartItemsPage = document.getElementById("CustomerCartItemsPage");
const orderHistoryPage = document.getElementById("OrderHistoryPage");
var currentCustomer;
function displayNone() {
    return __awaiter(this, void 0, void 0, function* () {
        signIn.style.display = "none";
        signUp.style.display = "none";
        homePage.style.display = "none";
        userProfilePage.style.display = "none";
        productProfilePage.style.display = "none";
        walletRechargePage.style.display = "none";
        takeOrderPage.style.display = "none";
        addNewProductPage.style.display = "none";
        editProductPage.style.display = "none";
        customerCartItemsPage.style.display = "none";
        orderHistoryPage.style.display = "none";
    });
}
function signInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        signIn.style.display = "block";
        signUp.style.display = "none";
        // signInButton.style.background="rgb(247, 191, 113)";
        signInButton.style.background = "rgba(61, 113, 193, 0.927)";
        signUpButton.style.background = "none";
    });
}
function signUpPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        signUp.style.display = "block";
        signIn.style.display = "none";
        signInButton.style.background = "none";
        // signUpButton.style.background = "rgb(247, 191, 113)";
        signUpButton.style.background = "rgba(61, 113, 193, 0.927)";
    });
}
function submitForm(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        var name = document.getElementById("name").value;
        var aadhar = document.getElementById("aadhar").value;
        var gender = document.getElementById("gender").value;
        var mobile = document.getElementById("mobile").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var walletBalance = parseFloat(document.getElementById("walletBalance").value);
        var profilePhotoFile = (_a = document.getElementById("profilePhoto").files) === null || _a === void 0 ? void 0 : _a[0];
        var isavail = yield APICALLS.CheckCustomer(email);
        var foodtype = document.getElementById("foodtype").value;
        console.log(isavail);
        if (!isavail) {
            let profilePhotoBase64 = "";
            if (profilePhotoFile) {
                profilePhotoBase64 = yield convertToBase64(profilePhotoFile); // Convert the image to Base64
            }
            let newCustomer = yield APICALLS.AddNewCustomer({ customerID: "", name: name, aadhar: aadhar, address: address, gender: gender, mobileNumber: mobile, foodType: foodtype, mailID: email, password: password, walletBalance: walletBalance, profilePhoto: profilePhotoBase64 });
            document.getElementById("name").value = "";
            document.getElementById("aadhar").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("foodtype").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("walletBalance").value = "";
            document.getElementById("profilePhoto").value = "";
            // console.log(profilePhotoBase64);
            alert(`Registration Successful. Your Customer ID is ${newCustomer}.`);
        }
        else {
            var signInBorder = document.getElementById("signUp");
            signInBorder.style.border = "0.5px solid red";
            alert(`Already exist`);
        }
    });
}
function convertToBase64(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
}
function signInSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        var email = document.getElementById("email1");
        var password = document.getElementById("password2");
        if (!email.value || !password.value) {
            alert("Email and Password cannot be empty");
            return;
        }
        var customer = yield APICALLS.GetIndividualUser(email.value, password.value);
        if (customer == null) {
            alert("Invalid Email or Password");
            email.value = "";
            password.value = "";
        }
        else {
            var boxElement = document.getElementById("box");
            boxElement.style.display = "none";
            var menu = document.getElementById("menu");
            menu.style.display = "block";
            currentCustomer = customer;
            home();
            email.value = "";
            password.value = "";
        }
    });
}
function home() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        homePage.style.display = "block";
    });
}
function CustomerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        userProfilePage.style.display = "block";
        document.getElementById('user-profile-card').innerHTML = `
    <div class="profile-photo">
          <img src="${currentCustomer.profilePhoto}">
    </div>
    <table class="profile-table">
        <tr>
            <th>User ID</th> <td>${currentCustomer.customerID}</td>
        </tr>
        <tr>
            <th>User Name</th>  <td>${currentCustomer.name}</td>
        </tr>
        <tr>
            <th>Aadhar number</th>  <td>${currentCustomer.aadhar}</td>
        </tr>
        <tr>
            <th>Gender</th>  <td>${currentCustomer.gender}</td>
        </tr>
        <tr>
            <th>Mobile Number</th>  <td>${currentCustomer.mobileNumber}</td>
        </tr>
        <tr>
            <th>Mail ID</th>  <td>${currentCustomer.mailID}</td>    
        </tr>
        <tr>
            <th>Food Type</th>  <td>${currentCustomer.foodType}</td>    
        </tr>
        
        <tr>
            <th>Balance</th> <td>${currentCustomer.walletBalance}</td>
        </tr>
    </table>
    `;
    });
}
function ShowRoomDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        productProfilePage.style.display = "block";
        var products = yield APICALLS.FetchProducts();
        var productTable = document.getElementById("product-table");
        productTable.innerHTML = `
                <tr>
                    <th>Room Image</th> <th>Room ID</th> <th>Room Type</th> <th>NumberOfBeds</th> <th>Price</th> <th>Action</th>
                </tr>`;
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                <td><img src="${product.roomImage}"></td> <td>${product.roomID}</td> <td>${product.roomType}</td>
                <td>${product.numberOfBeds}</td> <td>${product.pricePerDay}</td>
                <td>
                    <button onclick="editChosenProduct('${product.roomID}')">Edit</button>
                    <button onclick="deleteProduct('${product.roomID}')">Delete</button>
                </td>
                </tr> `;
            productTable.appendChild(row);
        });
    });
}
var currentRoom;
function editChosenProduct(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        editProductPage.style.display = "block";
        addNewProductPage.style.display = "none";
        currentRoom = yield APICALLS.GetIndividualProduct(roomID);
        if (currentRoom != null) {
            document.getElementById("editRoomType").value = currentRoom.roomType;
            document.getElementById("editNumberofBeds").value = String(currentRoom.numberOfBeds);
            document.getElementById("editpriceperday").value = String(currentRoom.pricePerDay);
        }
        else {
            alert("Room not found");
        }
    });
}
function editProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        if (currentRoom != null) {
            var roomType = document.getElementById("editRoomType").value;
            var numberOfBeds = parseFloat(document.getElementById("editNumberofBeds").value);
            var price = parseFloat(document.getElementById("editpriceperday").value);
            var productPhotoFile = (_a = document.getElementById("edit-photo").files) === null || _a === void 0 ? void 0 : _a[0];
            let productPhotoBase64 = "";
            if (productPhotoFile) {
                productPhotoBase64 = yield convertToBase64(productPhotoFile); // Convert the image to Base64
            }
            yield APICALLS.EditProductDetail({ roomID: currentRoom.roomID, roomType: roomType, numberOfBeds: numberOfBeds, pricePerDay: price, roomImage: productPhotoBase64 });
            alert("Product modified successfully.");
            document.getElementById("editRoomType").value = "";
            document.getElementById("editNumberofBeds").value = "";
            document.getElementById("editpriceperday").value = "";
            document.getElementById("edit-photo").value = "";
            ShowRoomDetails();
        }
    });
}
function deleteProduct(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProduct = confirm('Do you want to delete this room');
        if (deleteProduct) {
            yield APICALLS.DeleteProductDetail(roomID);
            alert("Product deleted successfully.");
        }
        ShowRoomDetails();
    });
}
function NewProductPage() {
    return __awaiter(this, void 0, void 0, function* () {
        addNewProductPage.style.display = "block";
        editProductPage.style.display = "none";
    });
}
function addProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        var roomType = document.getElementById("roomType").value;
        var numberOfBeds = parseFloat(document.getElementById("numberOfBeds").value);
        var pricePerDay = parseFloat(document.getElementById("pricePerDay").value);
        // var isProductValid = await APICALLS.CheckProductExist(productName);
        var isProductValid = false;
        if (isProductValid) {
            document.getElementById("roomType").value = "";
            document.getElementById("numberOfBeds").value = "";
            document.getElementById("pricePerDay").value = "";
            document.getElementById("add-photo").value = "";
            alert("This product already exists");
        }
        else {
            var productPhotoFile = (_a = document.getElementById("add-photo").files) === null || _a === void 0 ? void 0 : _a[0];
            let productPhotoBase64 = "";
            if (productPhotoFile) {
                productPhotoBase64 = yield convertToBase64(productPhotoFile); // Convert the image to Base64
            }
            let newProduct = yield APICALLS.AddNewProduct({ roomID: "", roomType: roomType, numberOfBeds: numberOfBeds, pricePerDay: pricePerDay, roomImage: productPhotoBase64 });
            document.getElementById("roomType").value = "";
            document.getElementById("numberOfBeds").value = "";
            document.getElementById("pricePerDay").value = "";
            document.getElementById("add-photo").value = "";
            alert(`Product added successfully. Product ID is ${newProduct}`);
        }
        ShowRoomDetails();
    });
}
function RechargeWallet() {
    displayNone();
    walletRechargePage.style.display = "block";
    document.getElementById("currentBalance").innerHTML = `Available Balance : ${currentCustomer.walletBalance}`;
}
function deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        var amount1 = document.getElementById("amount").value;
        yield APICALLS.RechargeWalletBalance(currentCustomer.customerID, Number(amount1));
        var customer = yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
        currentCustomer = customer;
        document.getElementById("amount").value = "";
        alert(`Recharge Successful. Your current balance is ${currentCustomer.walletBalance}`);
        RechargeWallet();
    });
}
const productContainer = document.getElementById('product-container');
function BookRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        takeOrderPage.style.display = "block";
        var products = yield APICALLS.FetchProducts();
        productContainer.innerHTML = '';
        displayProducts(products);
    });
}
function displayProducts(products) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        // Create image
        const productImage = document.createElement('img');
        productImage.src = product.roomImage;
        productImage.alt = product.roomType;
        productDiv.appendChild(productImage);
        // Create product name
        const roomType = document.createElement('h2');
        roomType.textContent = product.roomType;
        productDiv.appendChild(roomType);
        // Create product details (quantity, price)
        const productDetails = document.createElement('p');
        productDetails.textContent = `No of beds: ${product.numberOfBeds} | Price: $${product.pricePerDay}`;
        productDiv.appendChild(productDetails);
        // Create button
        const button = document.createElement('button');
        button.textContent = 'Add to wishlist';
        if (product.numberOfBeds < 1) {
            button.disabled = true;
            button.style.backgroundColor = "grey";
        }
        productDiv.appendChild(button);
        button.onclick = function () {
            AddToCart(product.roomID);
        };
        // Append to the container
        productContainer.appendChild(productDiv);
    });
}
const inputcon = document.getElementById("inputdate-container");
// var selectedProduct:string;
function AddToCart(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        //Prompt for asking food count
        // var table = document.getElementById("medicineTable") as HTMLTableElement;
        var len = inputcon.getElementsByTagName("div").length;
        if (inputcon.hasChildNodes()) {
            for (var i = len - 1; i >= 0; i--) {
                inputcon.removeChild(inputcon.children[i]);
            }
        }
        const inputdiv = document.createElement('div');
        inputdiv.className = "getdate";
        // inputdiv.innerHTML="<p>start date</p> ";
        // inputdiv.innerHTML=`<input type="Date" id ="startdate>" name="startdate">`;
        inputdiv.innerHTML = `<p>start date</p> 
    <input type="Date" id ="startdate"  name="startdate" required> 
    <input type="Date" id ="enddate" name="enddate" required>
    
    <input type="hidden" id ="productID" value=${productID} name="quantity" required>
    <button onclick="submitDate()">Submit</button>
    `;
        inputcon.appendChild(inputdiv);
        inputcon.style.display = "block";
        //  selectedProduct=productID;
        // const quantity = prompt("Enter the number of rooms you want to book");
        //     const quantity=document.getElementById("quantity") as HTMLInputElement;
        //     // Convert the string input to a number
        //     const quantityNumber = Number(quantity);
        //     // Check if the quantity is a valid number and greater than 0
        //     if (isNaN(quantityNumber) || quantityNumber <= 0) {
        //         alert("Please enter a valid quantity greater than 0.");
        //     }
        //     else {
        //         // Proceed with the valid quantity
        //         var selectedProduct: RoomDetails | null = await APICALLS.GetIndividualProduct(productID);
        //         if (selectedProduct != null) {
        //             var cartID: string = await APICALLS.AddItemToCart({ wishlistID: "", customerID: currentCustomer.customerID, roomID: selectedProduct.roomID, purchaseCount: quantityNumber, priceOfRoom: quantityNumber * selectedProduct.pricePerDay, roomImage: selectedProduct.roomImage });
        //             alert(`${selectedProduct.roomID} added to cart list with ${quantityNumber} quantity. Your OrderID is ${cartID}`);
        //         }
        //     }
        //     TakeOrder();
        // }
    });
}
function submitDate() {
    return __awaiter(this, void 0, void 0, function* () {
        // const quantityele=document.getElementById("quantity") as HTMLInputElement;
        const startdateele = document.getElementById("startdate");
        const enddateele = document.getElementById("enddate");
        const productIDele = document.getElementById("productID");
        const productID = productIDele.value;
        // const quantity=quantityele.value;
        const startdate = startdateele.value;
        const enddate = enddateele.value;
        console.log(productID);
        // const getdate=document.getElementById("getdate") as HTMLDivElement;
        inputcon.style.display = "none";
        // console.log((quantity));
        console.log((startdate));
        console.log((enddate));
        // Convert the string input to a number
        // const quantityNumber = Number(quantity);
        // Check if the quantity is a valid number and greater than 0
        // if (isNaN(quantityNumber) || quantityNumber <= 0) {
        //     alert("Please enter a valid quantity greater than 0.");
        // }
        // else {
        // Proceed with the valid quantity
        let date1 = new Date(startdate);
        let date2 = new Date(enddate);
        // Calculating the time difference
        // of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();
        // Calculating the no. of days between
        // two dates
        let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        var selectedProduct = yield APICALLS.GetIndividualProduct(productID);
        // var selectedProduct: RoomDetails | null = await APICALLS.GetIndividualProduct(selectedProduct);
        if (selectedProduct != null) {
            console.log(typeof (startdate));
            var isBooked = yield APICALLS.CheckIsBooked(selectedProduct.roomID, startdate, enddate);
            console.log(isBooked, "book");
            if (isBooked) {
                var cartID = yield APICALLS.AddItemToCart({ wishlistID: "", customerID: currentCustomer.customerID, roomID: selectedProduct.roomID, purchaseCount: selectedProduct.numberOfBeds, priceOfRoom: (Difference_In_Days) * selectedProduct.pricePerDay, roomImage: selectedProduct.roomImage,
                    stayingFrom: startdate, stayingTo: enddate });
                alert(`${selectedProduct.roomID} added to cart list . Your OrderID is ${cartID}`);
            }
            else {
                alert("The room is already booked");
            }
        }
        // }
        TakeOrder();
    });
}
function PurchaseAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        var bookingStatus = yield APICALLS.purchaseAll(currentCustomer.customerID);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        alert(bookingStatus);
        modifydate.style.display = "none";
        Wishlists();
    });
}
function TakeOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        takeOrderPage.style.display = "block";
        var products = yield APICALLS.FetchProducts();
        productContainer.innerHTML = '';
        displayProducts(products);
    });
}
const billContentDiv = document.getElementById('bill-content');
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        orderHistoryPage.style.display = "block";
        billContentDiv.innerHTML = '';
        var bookings = yield APICALLS.FetchAllBookings(currentCustomer.customerID);
        var bookingTable = document.getElementById("booking-table");
        if (bookings.length == 0) {
            bookingTable.innerHTML = '';
            const emptyCart = document.createElement('h2');
            emptyCart.textContent = 'No Bookings Found';
            emptyCart.className = 'empty';
            billContentDiv.appendChild(emptyCart);
        }
        else {
            bookingTable.innerHTML = `
                <tr>
                    <th>Booking ID</th>  <th>Total Price</th> <th>Date Of Booking</th> <th>Booking Status</th> <th>Action</th>
                </tr>
    `;
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateOfBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="viewBill('${booking.bookingID}')">View Bill</button>
                    </td>
                </tr>
        `;
                bookingTable.appendChild(row);
            });
        }
    });
}
const cartItemContainer = document.getElementById('cart-item-div');
const purchaseAllButton = document.getElementById("new-order-btn");
const totalPriceText = document.getElementById("showTotalPrice");
const emptyCartDiv = document.getElementById("empty-cart");
function Wishlists() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        customerCartItemsPage.style.display = "block";
        var orders = yield APICALLS.FetchCarts(currentCustomer.customerID);
        cartItemContainer.innerHTML = '';
        emptyCartDiv.innerHTML = '';
        displayCartItems(orders);
    });
}
function displayCartItems(wishlist) {
    return __awaiter(this, void 0, void 0, function* () {
        const emptyCart = document.createElement('h2');
        if (wishlist.length == 0) {
            emptyCart.textContent = 'Cart Wish List is Empty';
            emptyCart.className = 'empty';
            purchaseAllButton.style.display = "none";
            totalPriceText.style.display = "none";
            emptyCartDiv.appendChild(emptyCart);
        }
        else {
            emptyCartDiv.innerHTML = '';
            emptyCart.textContent = '';
            purchaseAllButton.style.display = "block";
            totalPriceText.style.display = "block";
            var totalPrice = 0;
            for (const cart of wishlist) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart';
                var product = yield APICALLS.GetIndividualProduct(cart.roomID);
                if (product != null) {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'cart-div';
                    const productImage = document.createElement('img');
                    productImage.src = product.roomImage;
                    productImage.alt = product.roomType;
                    imageDiv.appendChild(productImage);
                    cartItemDiv.appendChild(imageDiv);
                    const detailsDiv = document.createElement('div');
                    detailsDiv.className = 'cart-div';
                    const roomType = document.createElement('h2');
                    roomType.textContent = product.roomType;
                    const productPrice = document.createElement('p');
                    productPrice.textContent = `Price: $${cart.priceOfRoom} | No of beds: ${cart.purchaseCount}`;
                    const startdate = document.createElement('p');
                    startdate.textContent = `Start date: ${new Date(cart.stayingFrom).toLocaleDateString()} | enddate : ${new Date(cart.stayingTo).toLocaleDateString()}`;
                    detailsDiv.appendChild(roomType);
                    detailsDiv.appendChild(productPrice);
                    detailsDiv.appendChild(startdate);
                    const modifyButton = document.createElement('button');
                    modifyButton.textContent = 'Modify';
                    modifyButton.onclick = () => {
                        ModifyCartCount(cart.wishlistID);
                    };
                    const outOfStock = document.createElement('p');
                    if (product.numberOfBeds >= cart.purchaseCount) {
                        const buyButton = document.createElement('button');
                        buyButton.textContent = 'Buy';
                        buyButton.disabled = false;
                        buyButton.style.backgroundColor = "#28a745";
                        buyButton.style.cursor = 'allowed';
                        totalPrice += cart.priceOfRoom;
                        outOfStock.textContent = '';
                        detailsDiv.appendChild(buyButton);
                        buyButton.onclick = () => {
                            BuySingleCartItem(cart.wishlistID);
                        };
                    }
                    else {
                        const buyButton = document.createElement('button');
                        buyButton.textContent = 'Buy';
                        buyButton.disabled = true;
                        buyButton.style.backgroundColor = 'gray';
                        buyButton.style.cursor = 'not-allowed';
                        outOfStock.textContent = 'Out Of Stock';
                        outOfStock.style.color = 'Gray';
                        detailsDiv.appendChild(buyButton);
                    }
                    detailsDiv.appendChild(modifyButton);
                    detailsDiv.appendChild(outOfStock);
                    cartItemDiv.appendChild(detailsDiv);
                    //Delete Icon 
                    const cancelIcon = document.createElement('img');
                    cancelIcon.src = "Images/Close Icon.svg";
                    cancelIcon.alt = "Delete Icon";
                    cancelIcon.className = 'cancel-icon';
                    cartItemDiv.appendChild(cancelIcon);
                    cancelIcon.onclick = function () {
                        DeleteTempCartDetail(cart.wishlistID);
                    };
                    cartItemContainer.appendChild(cartItemDiv);
                }
            }
            totalPriceText.innerHTML = `Total Price: $${totalPrice}`;
        }
    });
}
function BuySingleCartItem(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        var orderConfirmation = yield APICALLS.BuySingleItem(cartID, currentCustomer.customerID);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        alert(orderConfirmation);
        Wishlists();
    });
}
function DeleteTempCartDetail(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProduct = confirm('Do you want to delete this cart');
        if (deleteProduct) {
            yield APICALLS.DeleteCartDetail(currentCustomer.customerID, cartID);
            alert("Order deleted successfully.");
            Wishlists();
        }
    });
}
const modifydate = document.getElementById("modifydate");
function ModifyCartCount(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        //Prompt for asking food count
        var len = modifydate.getElementsByTagName("div").length;
        if (modifydate.hasChildNodes()) {
            for (var i = len - 1; i >= 0; i--) {
                modifydate.removeChild(modifydate.children[i]);
            }
        }
        const inputdiv = document.createElement('div');
        inputdiv.className = "getdate";
        // inputdiv.innerHTML="<p>start date</p> ";
        // inputdiv.innerHTML=`<input type="Date" id ="startdate>" name="startdate">`;
        inputdiv.innerHTML = `<p>start date</p> 
    <input type="Date" id ="startdatemodify"  name="startdate" required> 
    <input type="Date" id ="enddatemodify" name="enddatemodify" required>
    
    <input type="hidden" id ="productIDmodify" value=${cartID} name="quantity" required>
    <button onclick="submitDatemodify()">Submit</button>
    `;
        modifydate.appendChild(inputdiv);
        modifydate.style.display = "block";
    });
}
function submitDatemodify() {
    return __awaiter(this, void 0, void 0, function* () {
        const startdateele = document.getElementById("startdatemodify");
        const enddateele = document.getElementById("enddatemodify");
        const productIDele = document.getElementById("productIDmodify");
        let startdate = startdateele.value;
        let enddate = enddateele.value;
        let productid = productIDele.value;
        modifydate.style.display = "none";
        yield APICALLS.UpdateCartQuantity(currentCustomer.customerID, productid, startdate, enddate);
        alert('Order Modified Successfully.');
        // }
        Wishlists();
    });
}
function viewBill(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentBooking = yield APICALLS.GetIndividualBooking(bookingID);
        billContentDiv.innerHTML = '';
        var purchases = yield APICALLS.FetchPurchases(bookingID);
        displayBillContent(currentBooking, purchases);
    });
}
function displayBillContent(booking, purchases) {
    return __awaiter(this, void 0, void 0, function* () {
        const billContainer = document.createElement('div');
        billContainer.className = 'bill-container';
        const downloadButton = document.createElement('span');
        downloadButton.textContent = 'Download Bill';
        downloadButton.style.backgroundColor = '#3271a5';
        downloadButton.style.cursor = 'allowed';
        billContainer.appendChild(downloadButton);
        if (booking.bookingStatus == "Booked") {
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel Booking';
            cancelButton.disabled = false;
            cancelButton.style.backgroundColor = '#3271a5';
            cancelButton.style.cursor = 'allowed';
            billContainer.appendChild(cancelButton);
            cancelButton.onclick = () => {
                deleteSpecificBooking(booking.bookingID);
            };
        }
        else {
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel Booking';
            cancelButton.disabled = true;
            cancelButton.style.backgroundColor = 'gray';
            cancelButton.style.cursor = 'not-allowed';
            billContainer.appendChild(cancelButton);
        }
        // Display booking details
        const bookingSection = document.createElement('div');
        bookingSection.className = 'booking-details';
        bookingSection.innerHTML = `
        <h3>Booking ID: ${booking.bookingID}</h3>
        <p>Name: ${currentCustomer.name} |</p>
        <p>From Date: ${booking.StayingDateFrom} |</p>
        <p>To date: ${booking.StayingDateTo} |</p>
        <p>Status: ${booking.bookingStatus}</p>
    `;
        billContainer.appendChild(bookingSection);
        // Display purchased items
        const itemsSection = document.createElement('div');
        itemsSection.className = 'purchased-items';
        const itemsTable = document.createElement('table');
        itemsTable.className = 'items-table';
        itemsTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;
        for (let item of purchases) {
            let productDetail = yield APICALLS.GetIndividualProduct(item.roomID);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${productDetail === null || productDetail === void 0 ? void 0 : productDetail.roomType}</td>
            <td>${item.numberOfDays}</td>
            <td>$${item.price}</td>
        `;
            itemsTable.appendChild(row);
        }
        ;
        itemsSection.appendChild(itemsTable);
        billContainer.appendChild(itemsSection);
        // Add a final total price at the bottom (if necessary)
        const totalRow = document.createElement('div');
        totalRow.className = 'total-price';
        const totalAmount = booking.price;
        totalRow.innerHTML = `<h3>Total: $${totalAmount}</h3>`;
        billContainer.appendChild(totalRow);
        billContentDiv.appendChild(billContainer);
    });
}
function deleteSpecificBooking(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        var deleteBooking = yield APICALLS.cancelBooking(bookingID, currentCustomer.customerID);
        alert(deleteBooking);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        OrderHistory();
    });
}
function LogOut() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById("menu").style.display = "none";
        document.getElementById("box").style.display = "block";
        signIn.style.display = "block";
    });
}
const functions = { home, signInPage, signUpPage, displayNone, submitForm, signInSubmit, CustomerDetails, ShowRoomDetails, deleteProduct, editChosenProduct, editProduct, NewProductPage, addProduct, RechargeWallet, deposit, OrderHistory, LogOut, BookRoom, displayProducts, AddToCart, Wishlists, displayCartItems, ModifyCartCount, DeleteTempCartDetail, submitDate, BuySingleCartItem, viewBill, displayBillContent, deleteSpecificBooking, PurchaseAllItems, submitDatemodify };
Object.assign(window, functions);
