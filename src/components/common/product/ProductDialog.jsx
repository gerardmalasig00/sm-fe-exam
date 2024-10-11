import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { formatCurrency } from "../../../utils/helpers";
import { memo } from "react";
import LazyLoad from "react-lazyload";
const ProductDialog = ({ open, handleClose, row }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"md"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
          "&:hover": {
            transition: "all 0.3s ease",
            transform: "rotate(90deg)",
          },
        })}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Box>
          <Typography variant="caption" textTransform={"uppercase"}>
            {row?.category}
          </Typography>
          <Typography fontWeight={600} variant="h5">
            {row?.title}
          </Typography>
          <Typography marginY={2} variant="body2">
            {row?.description}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {formatCurrency(Number(row.price), "en-PH", "PHP")}
          </Typography>
          <Box my={2} p={2} bgcolor="#f9fafb">
            <Typography
              variant="body2"
              textTransform={"uppercase"}
              fontWeight={600}
            >
              More Images
            </Typography>
            <Box overflow={"auto"}>
              <Stack
                direction={"row"}
                spacing={2}
                marginY={2}
                sx={{
                  overflowX: "auto", // Ensures horizontal scrolling is enabled
                  whiteSpace: "nowrap", // Prevents wrapping of images
                }}
              >
                {row?.images?.slice(0, 4).map((image) => (
                  <Box key={image} width={250}>
                    <LazyLoad height={141} offset={100}>
                      <img
                        style={{
                          maxWidth: "250px",
                          objectFit: "cover",
                        }}
                        src={image}
                        alt={image}
                        loading="lazy"
                      />
                    </LazyLoad>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ProductDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  row: PropTypes.any,
};

export default memo(ProductDialog);
