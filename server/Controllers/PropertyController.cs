using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.Properties;
using server.Dtos.PropertyDtos;
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
        public async Task<ActionResult<IEnumerable<PropertyResponseDto>>> GetAllProperties()
        {
            var properties = await _propertyRepository.GetAllProperties();

            return Ok(_mapper.Map<IEnumerable<PropertyResponseDto>>(properties));
        }

        [HttpGet("{propertyId}", Name = "GetProperty")]
        public async Task<ActionResult<PropertyResponseDto>> GetProperty(int id)
        {
            var property = await _propertyRepository.GetProperty(id);

            if (property is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, new { message = "El inmueble no existe." });
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

            return CreatedAtRoute(nameof(GetProperty), new { propertyResponseDto.PropertyId }, propertyResponseDto);
        }

        [HttpDelete("{propertyId}")]
        public async Task<ActionResult> DeleteProperty(int id)
        {
            await _propertyRepository.DeleteProperty(id);
            await _propertyRepository.SaveChanges();

            return Ok();
        }
    }
}