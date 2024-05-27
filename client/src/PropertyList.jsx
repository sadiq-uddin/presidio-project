import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyList = ({ properties, onDelete, user }) => {

    const [counts, setCounts] = useState({});

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(2); // Change the number of properties per page as needed

    const handleInterestedClick = (property) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const navigate = useNavigate();

    const handleEdit = (propertyId) => {
        if (user?.role === 'seller') {
            navigate(`/update-property/${propertyId}`);
        } else {
            window.alert('You do not have permission to edit properties');
        }
    };

    const handleIncrementCount = (propertyId) => {
        const updatedCounts = { ...counts };
        if (!updatedCounts[propertyId]) {
            updatedCounts[propertyId] = 0;
        }
        updatedCounts[propertyId]++;
        setCounts(updatedCounts);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    const nextPage = () => {
        if (indexOfLastProperty < properties.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Properties</h2>
            <ul>
                {currentProperties.map((property, index) => (
                    <li key={index}>
                        <p>Place: {property.place}</p>
                        <p>Area: {property.area} sqft</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Bathrooms: {property.bathrooms}</p>
                        <p>Hospitals Nearby: {property.hospitals}</p>
                        <p>Colleges Nearby: {property.colleges}</p>
                        <button onClick={() => handleEdit(property.id)} className='addMargin'>Edit</button>
                        <button className='addMargin' onClick={() => onDelete(property.id)}>Delete</button>
                        <button className='addMargin' onClick={() => handleInterestedClick(property)}>I'm Interested</button>
                        <button className='addMargin' onClick={() => handleIncrementCount(property.id)}>Like ({counts[property.id] || 0})</button>
                    </li>
                ))}
            </ul>
            {selectedProperty && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Seller Details</h2>
                        <p>Name: {selectedProperty.sellerName}</p>
                        <p>Email: {selectedProperty.sellerEmail}</p>
                        <p>Phone: {selectedProperty.sellerPhone}</p>
                    </div>
                </div>
            )}
            <div>
                <button onClick={prevPage} className='addMargin'  >Previous</button>
                <button onClick={nextPage} className='addMargin' >Next</button>
            </div>
        </div>
    );
};

export default PropertyList;

