import { Box, TableCell, TableRow, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ProductDialog from "./ProductDialog";
import { formatCurrency } from "../../../utils/helpers";

const ProductItem = ({ row }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ProductDialog open={open} handleClose={handleClose} row={row} />
      )}
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{ cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Box width={200} p={2}>
            <img
              src={row.thumbnail}
              alt={row.name}
              loading="lazy"
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
              }}
            />
          </Box>
        </TableCell>
        <TableCell align="left">
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Box width={"100%"} p={2} display={{ xs: "block", sm: "none" }}>
              <img
                src={row.thumbnail}
                alt={row.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography fontWeight="bold">{row.title}</Typography>
            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box", // Required for multi-line ellipsis
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",

                // Add a fixed height to ensure it always reserves space for 2 lines
                height: "3em",
              }}
            >
              {row.description}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="center">
          {formatCurrency(Number(row.price), "en-PH", "PHP")}
        </TableCell>
      </TableRow>
    </>
  );
};

ProductItem.propTypes = {
  row: PropTypes.any,
};

export default ProductItem;
