import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

const ProductListSkeleton = () => {
  return (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell>
            <Skeleton variant="rectangular" height={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" height={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" height={100} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const ProductList = ({
  products = [],
  pagination,
  loading,
  setParams,
  error,
}) => {
  // For Sorting
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const columns = [
    {
      label: "Thumbnail",
      sortable: false,
      align: "left",
      hiddenOnMobile: true,
    },
    {
      id: "title",
      label: "Name",
      sortable: true,
      align: "left",
      width: "100%",
      hiddenOnMobile: false,
    },
    {
      id: "price",
      label: "Price",
      sortable: true,
      align: "center",
      hiddenOnMobile: false,
    },
  ];
  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setParams((prev) => ({
      ...prev,
      sortBy: property,
      order: isAsc ? "desc" : "asc",
    }));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align}
                    padding={"normal"}
                    width={col.width}
                    sortDirection={orderBy === col.id ? order : false}
                    sx={{
                      background: "#fafafa",
                      fontWeight: "bold",

                      display: {
                        xs: col.hiddenOnMobile ? "none" : "table-cell",
                        sm: "table-cell",
                      },
                    }}
                  >
                    {col.sortable ? (
                      <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : "asc"}
                        onClick={createSortHandler(col.id)}
                      >
                        {col.label}
                        {orderBy === col.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading ? (
              <ProductListSkeleton />
            ) : (
              <TableBody>
                {products.map((row) => {
                  return <ProductItem key={row.id} row={row} />;
                })}
                {pagination?.total === 0 && (
                  <TableRow
                    style={{
                      height: 53,
                    }}
                  >
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      <Typography>{error || "No Products Found"}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {pagination?.total !== 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={pagination.total}
            rowsPerPage={pagination.limit}
            page={pagination.skip / pagination.limit}
            labelRowsPerPage=""
            onPageChange={(e, newPage) => {
              setParams((prev) => ({ ...prev, skip: prev.limit * newPage }));
            }}
            onRowsPerPageChange={(e) =>
              setParams((prev) => ({ ...prev, skip: 0, limit: e.target.value }))
            }
          />
        )}
      </Paper>
    </Box>
  );
};
ProductList.propTypes = {
  products: PropTypes.array,
  pagination: PropTypes.shape({
    total: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }),
  setParams: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
};
export default ProductList;
