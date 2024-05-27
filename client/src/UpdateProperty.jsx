import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProperty = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitals: '',
        colleges: '',
        sellerName: '',
        sellerEmail: '',
        sellerPhone: '',
        count: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/property/${propertyId}`)
            .then(response => {
                setProperty(response.data);
            })
            .catch(error => {
                console.error('Error fetching property:', error);
            });
    }, [propertyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/api/property/${propertyId}`, property)
            .then(response => {
                console.log(response.data);
                navigate('/properties');
            })
            .catch(error => {
                console.error('Error updating property:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Place:
                    <input type="text" name="place" value={property.place} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Area:
                    <input type="number" name="area" value={property.area} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Bedrooms:
                    <input type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Bathrooms:
                    <input type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Hospitals Nearby:
                    <input type="text" name="hospitals" value={property.hospitals} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Colleges Nearby:
                    <input type="text" name="colleges" value={property.colleges} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Seller Name:
                    <input type="text" name="sellerName" value={property.sellerName} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Seller Email:
                    <input type="email" name="sellerEmail" value={property.sellerEmail} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Seller Phone:
                    <input type="tel" name="sellerPhone" value={property.sellerPhone} onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Update Property</button>
        </form>
    );
};

export default UpdateProperty;
