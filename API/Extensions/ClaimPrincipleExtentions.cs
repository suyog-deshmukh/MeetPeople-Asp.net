using System;
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimPrincipleExtentions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;

        }
        public static int GetUserId(this ClaimsPrincipal user)
        {
            Console.WriteLine("@@@@@@@@@@@@@@@@@@");
            Console.WriteLine(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            Console.WriteLine("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        }


    }
}