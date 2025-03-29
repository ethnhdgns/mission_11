import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookCards from '../components/BookCards';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BookList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <WelcomeBand />
      <CartSummary />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookCards selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookList;
