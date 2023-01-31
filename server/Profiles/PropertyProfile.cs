using AutoMapper;
using server.Dtos.PropertyDtos;
using server.Models;

namespace server.Profiles
{
    public class PropertyProfile : Profile
    {
        public PropertyProfile()
        {
            CreateMap<Property, PropertyResponseDto>();
            CreateMap<PropertyRequestDto, Property>();
        }
    }
}