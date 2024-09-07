import React, { useState } from 'react';
import DisplayProducts from './DisplayProducts';

const Products = () => {
  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button clicks
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button
  };

  return (
    <>
      <div className='md:grid grid-cols-5 mt-10'>
        {/* Sidebar with buttons */}
        <div className='flex flex-col mt-10 mx-5'> {/* 4px gap */}
          <button
            className={`btn bg-transparent border-0 my-2 hover:bg-black hover:text-white ${activeButton === 'Rocking chair' ? 'bg-black text-white' : ''}`}
            onClick={() => handleButtonClick('Rocking chair')}
          >
            Rocking chair
          </button>
          <button
            className={`btn bg-transparent border-0 my-2 hover:bg-black hover:text-white ${activeButton === 'Side chair' ? 'bg-black text-white' : ''}`}
            onClick={() => handleButtonClick('Side chair')}
          >
            Side chair
          </button>
          <button
            className={`btn bg-transparent border-0 my-2 hover:bg-black hover:text-white ${activeButton === 'Lounge chair' ? 'bg-black text-white' : ''}`}
            onClick={() => handleButtonClick('Lounge chair')}
          >
            Lounge chair
          </button>
        </div>

        {/* Main product display area */}
        <div className='col-span-4'>
            <DisplayProducts />
        </div>
      </div>
    </>
  );
};

export default Products;
