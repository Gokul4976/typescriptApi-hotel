using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Models
{
    public class Wishlist
    {

    public string WishlistID{get;set;}
    public string CustomerID{get;set;}
    public string RoomID{get;set;}
    public int PurchaseCount{get;set;}
    public double PriceOfRoom{get;set;}
    public DateTime StayingFrom{get;set;}
    public DateTime StayingTo{get;set;}
    public string RoomImage{get;set;}
    
    }
}