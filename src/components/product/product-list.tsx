import React, { useCallback, useEffect, useState } from "react";
import { ProductType } from "../../types/productType";
import { Grid, TextField } from "@mui/material";
import ProductItem from "./product-item";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [total, setTotal] = useState(0);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts([]);
    setTimeout(() => {
      setSearchName(e.target.value);
      setPage(0);
    }, 1000);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchName}&limit=20&skip=${
          20 * page
        }`
      );
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    }
  }, [page, searchName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  }, [fetchData, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, handleScroll]);

  return (
    <>
      <input type="text" onChange={handleChangeSearch} />

      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage(page + 1)}
        hasMore={products.length < total} // Replace with a condition based on your data source
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={800}
      >
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default ProductList;
