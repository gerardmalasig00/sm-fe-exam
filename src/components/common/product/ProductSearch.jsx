import { Close } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const ProductSearch = ({ totalItems, isLoading, setParams }) => {
  const [search, setSearch] = useState("");

  // Create debounce when search is changed
  useEffect(() => {
    let timer;
    if (search) {
      timer = setTimeout(() => {
        setParams((prev) => ({ ...prev, q: search }));
      }, 300);
    } else {
      setParams((prev) => ({ ...prev, q: "" }));
    }
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Box width={"100%"} marginY={2}>
      <TextField
        sx={{ width: "100%" }}
        value={search}
        onChange={handleChange}
        variant="outlined"
        size="small"
        placeholder="Search product"
        slotProps={{
          input: {
            endAdornment: search ? (
              <InputAdornment position="start">
                <Close
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      // Add rotating animation through transform
                      transform: "rotate(90deg)",
                    },
                  }}
                  onClick={() => {
                    setParams((prev) => ({ ...prev, q: "" }));
                    setSearch("");
                  }}
                />
              </InputAdornment>
            ) : null,
          },
        }}
        helperText={
          isLoading
            ? "Searching..."
            : totalItems === 0
            ? "No products matched your search keyword."
            : ""
        }
      />
    </Box>
  );
};

ProductSearch.propTypes = {
  totalItems: PropTypes.number,
  setParams: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default ProductSearch;
