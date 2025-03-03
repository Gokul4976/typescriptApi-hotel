using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Models
{
    public class RoomSelection
    {
       

    public string SelectionID{get;set;}
    public string WishlistID{get;set;}
    public string BookingID{get;set;}
    public string RoomID{get;set;}
    public DateTime StayingDateFrom{get;set;}
    public DateTime StayingDateTo{get;set;}
    public double Price{get;set;}
    public int NumberOfDays{get;set;}
    public string BookingStatus{get;set;}
    
    }
}