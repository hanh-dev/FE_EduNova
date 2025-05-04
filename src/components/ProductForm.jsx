import { useState } from 'react';
import { getProducts, getProduct } from '../services/api/User';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getProducts(formData);
      await getProduct(formData);
      alert('Product created successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <button type="submit">Create</button>
    </form>
  );
}