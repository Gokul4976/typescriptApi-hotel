using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HotelAPI.Models;
namespace HotelAPI.Controllers
{
    [ApiController]
    [Route("api/hotel/roomSelectionController/")]
    public class RoomSelectionController:ControllerBase
    {
          [HttpPost("add/purchases")]
        public IActionResult AddNewPurchasesOfCustomer([FromBody] string customerID)
        {
            double totalPrice = 0;
            var customer = ApplicationDBContext.customers.FirstOrDefault(user => user.CustomerID == customerID);

            if (customer == null)
            {
                return NotFound();
            }

            List<Wishlist> tempCartsForPurchase = new List<Wishlist>();
            string purchaseStatus = "";
            foreach (var cart in ApplicationDBContext.wishlists)
            {
                //Check if the cart is customer's cart
                if (cart.CustomerID == customerID)
                {
                    // Find the product in the products list by ProductID
                    var product = ApplicationDBContext.roomItems.FirstOrDefault(p => p.RoomID == cart.RoomID);

                    // Check if product is found and if stock is available
                    if (product != null)
                    {
                        if (product.NumberOfBeds >= cart.PurchaseCount)
                        {

                            // Add the item price to the total price
                            totalPrice += cart.PriceOfRoom;
                            tempCartsForPurchase.Add(cart);
                        }
                    }
                }
            }

            if (totalPrice == 0)
            {
                purchaseStatus = "Sorry all products are out of stock to purchase.";
            }
            else if (customer.WalletBalance < totalPrice)
            {
                purchaseStatus = "Insufficient balance to make your purchase. Please recharge";
            }
            else
            {
                //Create new booking
                BookingDetails booking = new BookingDetails();
                booking.BookingID = "BID" + (ApplicationDBContext.bookings.Count + 3001);
                booking.CustomerID = customerID;
                booking.TotalPrice = totalPrice;
                booking.DateOfBooking = DateTime.Now.ToString("dd/MM/yyyy");
                booking.BookingStatus = "Booked";
                ApplicationDBContext.bookings.Add(booking);
                //Decrease customers wallet balance
                customer.WalletBalance -= totalPrice;

                foreach (Wishlist cart in tempCartsForPurchase)
                {
                    //Create purchase ID
                    string purchaseID = "SID" + (ApplicationDBContext.roomSelections.Count + 5001);
                    //Add purchase to purchase list
                    ApplicationDBContext.roomSelections.Add(new RoomSelection { SelectionID = purchaseID, WishlistID = cart.WishlistID, BookingID = booking.BookingID, RoomID = cart.RoomID, NumberOfDays =(cart.StayingTo- cart.StayingFrom).Days, Price = cart.PriceOfRoom });
                    // Find the product in the products list by ProductID
                    var product = ApplicationDBContext.roomItems.FirstOrDefault(p => p.RoomID == cart.RoomID);
                    //Deduct product quantity
                    // product.NumberOfBeds -= cart.PurchaseCount;
                    //Remove cartItem from list after moving it to purchased item list
                    ApplicationDBContext.wishlists.Remove(cart);
                }

                purchaseStatus = $"Booking Successfull. Your Booking ID is {booking.BookingID}";
            }

            return Ok(purchaseStatus);
        }

        [HttpGet("fetchbookings/get/{bookingID}")]

        public IActionResult GetBooking(string bookingID)
        {
            BookingDetails booking1 = default;
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.BookingID == bookingID)
                {
                   booking1 = booking;
                }
            });
            return Ok(booking1);
        }

        [HttpGet("fetchbookings/{customerID}")]

        public IActionResult GetBookings(string customerID)
        {
            List<BookingDetails> bookings = new List<BookingDetails>();
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.CustomerID == customerID)
                {
                    bookings.Add(booking);
                }
            });
            return Ok(bookings);
        }

        [HttpGet("fetchpurchases/{bookingID}")]

        public IActionResult GetPurchases(string bookingID)
        {
            List<RoomSelection> purchases = new List<RoomSelection>();
            foreach (RoomSelection purchased in ApplicationDBContext.roomSelections)
            {
                if (purchased.BookingID == bookingID)
                {
                    purchases.Add(purchased);
                }
            }
            return Ok(purchases);
        }
         [HttpPut("new/singleBooking/{cartID}/{customerID}")]
        public IActionResult BuySingleItem(string cartID, string customerID)
        {
            var cartItem = ApplicationDBContext.wishlists.Find(cart => cart.WishlistID == cartID && cart.CustomerID == customerID);
            string purchaseStatus = "";
            if (cartItem == null)
            {
                return NotFound();
            }
            var customer = ApplicationDBContext.customers.Find(customer => customer.CustomerID == customerID);
            if (customer != null && customer.WalletBalance >= cartItem.PriceOfRoom)
            {
                string bookingID = "SID" + (5001 + ApplicationDBContext.bookings.Count);
                customer.WalletBalance -= cartItem.PriceOfRoom;
                DateTime date = DateTime.Now;
                ApplicationDBContext.bookings.Add(new BookingDetails { BookingID = bookingID, CustomerID = customerID, TotalPrice = cartItem.PriceOfRoom, DateOfBooking = date.ToString("dd/MM/yyyy"), BookingStatus = "Booked" });

                //Create purchase ID
                string purchaseID = "PRID" + (ApplicationDBContext.roomSelections.Count + 5001);
                //Add purchase to purchase list
                ApplicationDBContext.roomSelections.Add(new RoomSelection { SelectionID = purchaseID, WishlistID = cartItem.WishlistID, BookingID = bookingID, RoomID = cartItem.RoomID, NumberOfDays = cartItem.PurchaseCount, Price = cartItem.PriceOfRoom,StayingDateFrom=cartItem.StayingFrom,StayingDateTo=cartItem.StayingTo });
                // Find the product in the products list by ProductID
                var product = ApplicationDBContext.roomItems.FirstOrDefault(p => p.RoomID == cartItem.RoomID);
                //Deduct product quantity
                // product.NumberOfBeds -= cartItem.PurchaseCount;
                //Remove cartItem from list after moving it to purchased item list
                ApplicationDBContext.wishlists.Remove(cartItem);

                purchaseStatus = $"Booking Successful. Your Booking ID is {bookingID}";
                return Ok(purchaseStatus);
            }
            else
            {
                purchaseStatus = "Insufficient balance to make this purchase";
                return Ok(purchaseStatus);
            }
        }
        
        [HttpPut("cancel/booking/{bookingID}/{customerID}")]
        public IActionResult CancelBooking(string bookingID, string customerID)
        {
            var booking = ApplicationDBContext.bookings.FirstOrDefault(booking => booking.BookingID == bookingID && booking.BookingStatus == "Booked" && booking.CustomerID == customerID);
            var customer = ApplicationDBContext.customers.FirstOrDefault(customer => customer.CustomerID == customerID);
            if (booking == null || customer == null)
            {
                return NotFound();
            }
            booking.BookingStatus = "Cancelled";
            customer.WalletBalance += booking.TotalPrice;
            ApplicationDBContext.roomSelections.ForEach(purchase => {
                if(booking.BookingID == purchase.BookingID)
                {
                    var product = ApplicationDBContext.roomItems.FirstOrDefault(product => product.RoomID == purchase.RoomID);
                    if(product != null)
                    {
                        // product.NumberOfBeds += purchase.PurchaseCount;
                        product.NumberOfBeds += 1;
                    }
                }
            });
            
            return Ok("Order cancelled successfully");
        }

        [HttpGet ("checkbooking/{roomID}/{startdate}/{enddate}")]
         public IActionResult CheckBooked(string roomID, string startdate,string enddate)
         {
            DateTime startdate1 = DateTime.Parse(startdate);
            DateTime enddate1 = DateTime.Parse(enddate);
            
            // bool isChecked=false;
            var roombooked = ApplicationDBContext.roomSelections.FirstOrDefault(roo => roo.RoomID == roomID);
            if (roombooked==null){
                System.Console.WriteLine("no room in selection");
                    return Ok(roomID);
                     
            }
            foreach (RoomSelection roomSelection in ApplicationDBContext.roomSelections){
                System.Console.WriteLine(startdate1<roomSelection.StayingDateFrom );
                if (roomSelection.RoomID==roomID && ((startdate1 <roomSelection.StayingDateFrom && enddate1< roomSelection.StayingDateFrom ) || (startdate1>roomSelection.StayingDateTo && enddate1 >roomSelection.StayingDateTo))){
                    // isChecked=true;
                    return Ok(roomID);
                    // break;
                            
                }
            }
            // bool isChecked=true;
            // if (isChecked){
            //     return Ok(room);
            // }
           return NotFound();

         }
    }
}