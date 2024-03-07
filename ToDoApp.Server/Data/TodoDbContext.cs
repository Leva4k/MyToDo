using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ToDoApp.Server.Models;

namespace ToDoApp.Server.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Todo> Todos { get; set; }

    }
}
