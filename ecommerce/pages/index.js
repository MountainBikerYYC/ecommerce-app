import { useEffect, useState } from "react";
import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  //   const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];
  //   console.log(productsInfo);

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  } else {
    products = products;
  }

  return (
    <Layout>
      <input
        value={phrase}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-fyll py-2 px-4 rounded-xl"
        onChange={(e) => setPhrase(e.target.value)}
      ></input>
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((product) => (
                      <div className="px-5 snap-start" key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
