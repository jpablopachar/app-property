namespace server.Dtos.PropertyDtos
{
    public class PropertyResponseDto
    {
        public int PropertyId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Price { get; set; }
        public string? Picture { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}