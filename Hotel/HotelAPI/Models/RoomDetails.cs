using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Models
{
    public class RoomDetails
    {
       

    public string RoomID{get;set;}
    public string RoomType{get;set;}
    public int NumberOfBeds{get;set;}
    public double PricePerDay{get;set;}
    public string RoomImage{get;set;}

    }
}