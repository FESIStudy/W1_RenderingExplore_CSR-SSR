import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import styles from "@/styles/Search.module.css";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { q } = context.query; // 쿼리에서 검색 키워드를 가져옴
  let products = [];

  if (q) {
    try {
      const res = await axios.get(`/products/?q=${q}`);
      products = res.data.results;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return {
    props: {
      products,
      query: q || "",
    },
  };
}

export default function Search({ products, query }) {
  return (
    <div>
      <Head>
        <title>{query} 검색 결과 - Codeitmall</title>
      </Head>
      <SearchForm initialValue={query} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{query}</span> 검색 결과
      </h2>
      <ProductList className={styles.productList} products={products} />
    </div>
  );
}
