import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getallproducts = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/product/get-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch products.');
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((p) => (
            <div className="col" key={p._id}>
              <Link
                to={`/admin/product/${p.slug}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 border-light shadow-sm">
                  <div className="card-img-wrapper position-relative">
                    <img
                      src={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top img-fluid"
                      alt={p.name}
                      style={{ objectFit: 'cover', height: '300px', width: '100%' }}
                    />
                    {p.discount && (
                      <span className="position-absolute top-0 start-0 bg-primary text-white px-2 py-1 rounded-end mt-2 ms-2 small fw-bold">
                        {p.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{p.name}</h5>
                    <p className={`card-text ${p.quantity > 0 ? 'text-success' : 'text-danger'}`}>
                      {p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <div className="d-flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`text-${i < p.rating ? 'warning' : 'secondary'} me-1`}
                          style={{ width: '16px', height: '16px' }}
                        />
                      ))}
                    </div>
                    <div className="mt-auto d-flex align-items-center">
                      <span className="text-muted text-decoration-line-through me-2">Rs {p.originalPrice}</span>
                      <span className="text-danger fw-bold">Rs {p.discountedPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Product;