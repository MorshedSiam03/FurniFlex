import { useEffect, useState } from "react";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  useEffect(() => {
    fetch("/public/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Calculate the index of products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {displayedProducts.map((product) => (
          <div key={product.id}>
            <div className="rounded-xl bg-base-100 p-5 shadow-sm">
              <figure>
                <img
                  src={product.image}
                  className="rounded-xl p-7 mx-auto w-full bg-[#F2F2F2]"
                  alt="Product"
                />
              </figure>
              <div className="flex-col justify-start my-2">
                <p className="font-bold text-lg text-start mt-3">
                  {product.name}
                </p>
                <div className="flex gap-3 justify-start my-2 text-lg">
                  <p className="font-bold">€ {product.price.toFixed(2)}</p>{" "}
                  <p className="line-through">€ {product.original_price.toFixed(2)}</p>{" "}
                  <p className="font-bold text-red-600">
                    {product.discount_percentage}% OFF
                  </p>{" "}
                </div>
                <p className="text-sm text-justify">{product.description}</p>
                <button className="btn mt-3 w-full bg-black text-white">
                  <img src="/src/assets/Icon/Added Light.svg" alt="" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center my-10">
        <nav aria-label="Page navigation">
          <ul className="inline-flex space-x-2">
            <li>
              <button
                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "opacity-50 cursor-not-allowed bg-[#DADADA]" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-1 rounded-md font-bold border ${
                    currentPage === index + 1
                      ? " outline outline-2 outline-black"
                      : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "opacity-50 cursor-not-allowed bg-[#DADADA]" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DisplayProducts;
