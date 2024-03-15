﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;



namespace ToDoApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _todoDbContext;
        public TodoController(TodoDbContext todoDbContext)
        {
            _todoDbContext = todoDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _todoDbContext.Todos
                .Where(x => x.IsDeleted == false)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
            return Ok(todos);
        }

        [HttpGet]
        [Route("get-deleted-todos")]
        //Получение списка дел помеченных как удаленные
        public async Task<IActionResult> GetDeletedTodos()
        {
            var todos = await _todoDbContext.Todos
                .Where(x => x.IsDeleted == true)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            todo.Id = Guid.NewGuid();
            _todoDbContext.Todos.Add(todo);
            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, Todo todoUpdateRequest)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.Description = todoUpdateRequest.Description;
            todo.IsComleted = todoUpdateRequest.IsComleted;
            todo.CompletedDate = DateTime.Now;
            todo.Tags = todoUpdateRequest.Tags;
            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);

            if (todo == null)
                return NotFound();
            todo.IsDeleted = true;
            todo.DeletedDate = DateTime.Now;
            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpPut]
        [Route("undo-deleted-todo/{id:Guid}")]
        public async Task<IActionResult> UndoDeletedTodo([FromRoute] Guid id, Todo undoDeleteTodoRequest)
            {
            var todo = await _todoDbContext.Todos.FindAsync(id);
            if(todo == null)
                return NotFound();
            todo.DeletedDate = DateTime.Now;
            todo.IsDeleted = false;

            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
            }
    }
}