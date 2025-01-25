import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

export async function getStaticProps() {
  const res = await axios.get("/products");
  return {
    props: {
      products: res.data.results,
    },
    revalidate: 60, // 60초마다 데이터를 재생성
  };
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Codeitmall</title>
      </Head>
      <SearchForm />
      <ProductList className={styles.products} products={products} />
    </>
  );
}
