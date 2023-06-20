import { useEffect, useState } from "react";
import Product from "@/components/Product";

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);
  useEffect(() => {
    fetch("api/products")
      .then((response) => response.json())
      .then((json) => setProductsInfo(json));
  }, []);

  const categoriesNames = [...new Set(productsInfo.map((p) => p.category))];
  console.log(productsInfo);

  return (
    <div className="p-5">
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize">{categoryName}</h2>
            <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
              {productsInfo
                .filter((p) => p.category === categoryName)
                .map((product) => (
                  <div className="px-5" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div className="py-4"></div>
      </div>
    </div>
  );
}
