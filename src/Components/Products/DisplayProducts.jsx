import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const DisplayProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://furni-flex-server-fawn.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Calculate the index of products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (product) => {
    const Product = {
      itemId: product._id,
      itemName: product.name,
      price: product.price,
      image: product.image,
      CustomerName: user.displayName,
      email: user.email,
      quantity: 1 // Default quantity is 1
    };
  
    // First check if the product is already in the cart
    fetch(`https://furni-flex-server-fawn.vercel.app/cart?email=${user.email}&itemId=${product._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // If the product is already in the cart, update its quantity
          const existingItem = data[0];
          const updatedQuantity = existingItem.quantity + 1; // Increment quantity
  
          fetch(`https://furni-flex-server-fawn.vercel.app/cart/${existingItem._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Product quantity updated in cart",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        } else {
          // If the product is not in the cart, add it
          fetch("https://furni-flex-server-fawn.vercel.app/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Product added to cart",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                    window.location.reload(); // Refresh the page to update cart count
                  });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }
      });
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {displayedProducts.map((product) => (
          <div key={product._id}> {/* Use _id or id */}
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
                  <p className="font-bold">€ {product.price.toFixed(2)}</p>
                  <p className="line-through">
                    € {product.original_price?.toFixed(2)}
                  </p>
                  <p className="font-bold text-red-600">
                    {product.discount_percentage}% OFF
                  </p>
                </div>
                <p className="text-sm text-justify">{product.description}</p>

                {/* Use arrow function to pass product */}
                <button
                  onClick={() => handleAddToCart(product)} // Fix this
                  className="btn mt-3 w-full bg-black text-white"
                >
                  <img src="https://raw.githubusercontent.com/MorshedSiam03/FurniFlex/619e205aa49582dce5221ef393d7f8b8ac7d0325/src/assets/Icon/Added%20Light.svg" alt="" /> Add to
                  Cart
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
                className={`px-3 py-1 rounded-md border ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed bg-[#DADADA]"
                    : ""
                }`}
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
                className={`px-3 py-1 rounded-md border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed bg-[#DADADA]"
                    : ""
                }`}
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
