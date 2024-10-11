import { Container } from "@mui/material";
import { fetcher } from "../../services/apis/product";
import ProductList from "../../components/common/product/ProductList";
import useSWR from "swr";
import { useState } from "react";
import ProductSearch from "../../components/common/product/ProductSearch";
import ProductBanner from "../../components/common/product/ProductBanner";

const Home = () => {
  const [params, setParams] = useState({
    skip: 0,
    limit: 10,
    select: "id,title,price,thumbnail,description,category,images",
    q: "",
  });
  const { data, error, isLoading } = useSWR(
    `products/search?${new URLSearchParams(params).toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductBanner />

      <ProductSearch
        totalItems={data?.total}
        isLoading={isLoading}
        setParams={setParams}
      />
      <ProductList
        products={data?.products ?? []}
        pagination={{
          total: data?.total ?? 0,
          skip: data?.skip ?? 0,
          limit: data?.limit ?? 0,
        }}
        setParams={setParams}
        loading={isLoading}
        error={error}
      />
    </Container>
  );
};

export default Home;
