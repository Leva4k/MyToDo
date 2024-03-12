namespace ToDoApp.Server.Models
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComleted { get; set; }
        public DateTimeOffset CompletedDate { get; set; }

        public bool IsDeleted { get; set; }
        public DateTimeOffset DeletedDate { get; set; }
    }
}
