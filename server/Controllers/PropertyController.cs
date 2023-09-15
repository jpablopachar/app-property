using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.Properties;
using server.Dtos.Property;
using server.Middlewares;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepository;
        private IMapper _mapper;

        public PropertyController(IPropertyRepository propertyRepository, IMapper mapper)
        {
            _propertyRepository = propertyRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyResponseDto>>> GetProperties()
        {
            var properties = await _propertyRepository.GetAllProperties();

            return Ok(_mapper.Map<IEnumerable<PropertyResponseDto>>(properties));
        }

        [HttpGet("{id}", Name = "GetPropertyById")]
        public async Task<ActionResult<PropertyResponseDto>> GetPropertyById(int id)
        {
            var property = await _propertyRepository.GetPropertyById(id);

            if (property is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, new { message = $"No se encontró el inmueble por este id {id}" });
            }

            return Ok(_mapper.Map<PropertyResponseDto>(property));
        }

        [HttpPost]
        public async Task<ActionResult<PropertyResponseDto>> CreateProperty([FromBody] PropertyRequestDto propertyRequestDto)
        {
            var property = _mapper.Map<Property>(propertyRequestDto);

            await _propertyRepository.CreateProperty(property);
            await _propertyRepository.SaveChanges();

            var propertyResponseDto = _mapper.Map<PropertyResponseDto>(property);

            return CreatedAtRoute(nameof(GetPropertyById), new { propertyResponseDto.Id }, propertyResponseDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProperty(int id)
        {
            await _propertyRepository.DeleteProperty(id);
            await _propertyRepository.SaveChanges();

            return Ok();
        }
    }
}