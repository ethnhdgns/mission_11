import { useEffect, useState } from 'react';
import './CategoryFilter.css';

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function CategoryFilter({ selectedCategories, setSelectedCategories }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5079/Book/GetCategories');
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {categories.map((b) => (
          <div key={b} className="category-item">
            <input
              type="checkbox"
              id={b}
              value={b}
              className="category-checkbox"
              checked={selectedCategories.includes(b)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={b}>{b}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
