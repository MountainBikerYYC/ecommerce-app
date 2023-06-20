import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useState, useEffect } from "react";
export default function CheckoutPage() {
  const { selectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    console.log(uniqIds);
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);
  return (
    <Layout>
      {!productsInfos.length && <div>No products in your Shopping Cart</div>}
      {productsInfos.length && productsInfos.map((productsInfo) => <div>{productsInfo.name}</div>)}
      Checkout
    </Layout>
  );
}
