import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
export default function Product({ product }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  function addProduct() {
    setSelectedProducts((prev) => [...prev, product._id]);
  }
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={`${product.pictures}`} alt="" />{" "}
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{product.name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 h-20 overflow-y-scroll scrollbar-hide">{product.description}</p>
      <div className="flex mt-1">
        <div className="text-xl font-bold grow">${product.price}</div>
        <button
          className="bg-emerald-400 text-white py-1 px-3 rounded-md"
          onClick={addProduct}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}
