import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    console.log(uniqIds);
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);
  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      //   const price = productsInfos.find((p) => p._id === id).price;
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const taxes = Math.ceil(subtotal * 0.1);
  const total = subtotal + taxes;
  return (
    <Layout>
      {!productsInfos.length && <div>No products in your Shopping Cart</div>}
      {productsInfos.length &&
        productsInfos.map((productsInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productsInfo._id
          ).length;
          if (amount === 0) return;
          return (
            <div className="flex mb-5" key={productsInfo._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={productsInfo.pictures} alt="/" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productsInfo.name}</h3>
                <p className="text-sm leading-4 textd-gray-500">
                  {productsInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productsInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productsInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter((id) => id === productsInfo._id)
                          .length
                      }
                    </span>

                    <button
                      onClick={() => moreOfThisProduct(productsInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <form action="api/checkout" method="POST">
        <div className="mt-4">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and Postal Code"
          />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Personal Name"
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Taxes (Estimated):</h3>
            <h3 className="font-bold">${taxes}</h3>
          </div>
          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>
        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />
        <button
          type="submit"
          className="bg-emerald-500 p-5 py-2 rounded-xl text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
}
