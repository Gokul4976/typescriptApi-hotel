using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HotelAPI.Models;
namespace HotelAPI.Controllers
{
     [ApiController]
    [Route("api/hotel/roomcontroller/")]
    public class RoomDetailsController:ControllerBase
    {
        [HttpGet ("rooms")]

        public IActionResult GetProducts()
        {
            return Ok(ApplicationDBContext.roomItems);
        }
        [HttpGet("get/room/{roomID}")]
        public IActionResult GetProductDetail(string roomID)
        {
            var room = ApplicationDBContext.roomItems.FirstOrDefault(room => room.RoomID == roomID);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

         [HttpPost ("add/newProduct")]
        public IActionResult AddNewProduct([FromBody] RoomDetails product)
        {
            var lastProduct=ApplicationDBContext.roomItems.LastOrDefault()?.RoomID;
            var lastIDFNumber=lastProduct?.Substring(3);
            var id=int.Parse(lastIDFNumber);
            Console.WriteLine(lastIDFNumber);
            Console.WriteLine(id+1);
            // product.ProductID="PID"+(ApplicationDBContext.products.Count+2001);
            product.RoomID="RID"+ (id+1);
            ApplicationDBContext.roomItems.Add(product);
            return Ok(product.RoomID);
        }
        // [HttpGet("product/{productName}")]

        // public IActionResult GetProductExist(string productName)
        // {
        //     bool isProductValid = ApplicationDBContext.roomItems.Any(product => product.ProductName.ToLower() == productName.ToLower());
        //     return Ok(isProductValid);
        // }
         [HttpPut("new/prod/edit")]
        public IActionResult EditProduct(RoomDetails room)
        {
            var prod = ApplicationDBContext.roomItems.FirstOrDefault(prod => prod.RoomID == room.RoomID);
            if (prod == null)
            {
                return NotFound();
            }
            prod.RoomType = room.RoomType;
            prod.PricePerDay = room.PricePerDay;
            prod.NumberOfBeds = room.NumberOfBeds;
            prod.RoomImage = room.RoomImage;
            return Ok();
        }
         [HttpDelete("delete/{roomID}")]
        public IActionResult DeleteProduct(string roomId)
        {
            var room = ApplicationDBContext.roomItems.Find(room => room.RoomID == roomId);
            if (room == null)
            {
                return NotFound();
            }
            ApplicationDBContext.roomItems.Remove(room);
            return Ok();
        }
    }
}