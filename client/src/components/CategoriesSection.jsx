import React from 'react';

// Import images
import fashionImg from '../assets/ca1.png';
import groceriesImg from '../assets/ca2.png';
import electronicsImg from '../assets/ca3.png';
import wellnessImg from '../assets/ca5.png';
import footwearImg from '../assets/ca6.png';
import beautyImg from '../assets/ca7.png';
import jewelleryImg from '../assets/ca9.png';

// Define categories with imported images
const categories = [
  { name: 'Fashion', image: fashionImg, color: '#e8f5e9' },
  { name: 'Groceries', image: groceriesImg, color: '#ffebee' },
  { name: 'Electronics', image: electronicsImg, color: '#fff3e0' },
  { name: 'Wellness', image: wellnessImg, color: '#f3e5f5' },
  { name: 'Footwear', image: footwearImg, color: '#e8f5e9' },
  { name: 'Beauty', image: beautyImg, color: '#ffebee' },
  { name: 'Jewellery', image: jewelleryImg, color: '#fff8e1' }
];

const CategoriesSection = () => {
  return (
    <div className="container my-4">
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card h-100 category-card border-0" style={{ backgroundColor: category.color }}>
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  style={{ width: '100px', height: '100px', objectFit: 'contain', margin: 'auto', display: 'block' }}
                />
                <h5 className="card-title mt-2">{category.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
