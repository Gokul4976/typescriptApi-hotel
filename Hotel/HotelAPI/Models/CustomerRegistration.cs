using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelAPI.Models
{
    public class CustomerRegistration
    {
    public string CustomerID{get;set;}
    public string Name{get;set;}
    public string MobileNumber{get;set;}
    public string Aadhar{get;set;}
    public string MailID{get;set;}
    public string Address{get;set;}
    public string FoodType{get;set;}
    public string Gender{get;set;}
    public string Password{get;set;}
    public double WalletBalance{get;set;}
    public string ProfilePhoto{get;set;}
    }
}