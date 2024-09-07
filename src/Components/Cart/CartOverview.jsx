import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const CartOverview = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://furni-flex-server-fawn.vercel.app/cart?email=${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch cart items");
          }
          return res.json();
        })
        .then((data) => {
          // Additional filtering on the client side
          const filteredItems = data.filter((item) => item.email === user?.email);
          setItems(filteredItems);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          setLoading(false);
        });
    }
  }, [url, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://furni-flex-server-fawn.vercel.app/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete item");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              // Update UI immediately
              const remainingItems = items.filter((item) => item._id !== id);
              setItems(remainingItems);
              // Show success message
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              // Show an error message if deletion failed
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            // Show an error message if the fetch fails
            Swal.fire({
              title: "Error!",
              text: "Unable to delete the item.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;

    fetch(`https://furni-flex-server-fawn.vercel.app/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update item quantity");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          // Update UI immediately
          const updatedItems = items.map((item) =>
            item._id === id ? { ...item, quantity: newQuantity } : item
          );
          setItems(updatedItems);
        } else {
          // Show an error message if update failed
          Swal.fire({
            title: "Error!",
            text: "Failed to update item quantity. Please try again.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        // Show an error message if the fetch fails
        Swal.fire({
          title: "Error!",
          text: "Unable to update the item quantity.",
          icon: "error",
        });
      });
  };

  const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  if (loading) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <div>
      <div className="grid grid-cols-3 px-20 gap-6">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">An overview of your order</h2>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 p-4 bg-white shadow rounded-lg"
              >
                <div className="flex items-center">
                  {/* Quantity Counter */}
                  <div className="flex items-center border-2 rounded-lg py-1 mr-4">
                    <button
                      onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                      className=" btn-sm text-xl "
                    >
                      -
                    </button>
                    <span className="mx-2 text-xl font-bold">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                      className=" btn-sm text-xl"
                    >
                      +
                    </button>
                  </div>

                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-28 h-28 bg-gray-200 p-1 rounded-xl object-cover mr-4"
                  />
                  <span className="text-xl font-semibold">{item.itemName}</span>
                </div>

                <div className="flex flex-col justify-between gap-16">
                  <button onClick={() => handleDelete(item._id)} className="ml-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <p className="text-lg font-semibold">€{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Order details</h2>
          <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex justify-between mb-4">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg">€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Shipping</span>
              <span className="text-lg">Free</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-lg">Estimated Tax</span>
              <span className="text-lg">€0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-xl mb-6">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full btn bg-black text-white p-4 rounded-lg">
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOverview;
