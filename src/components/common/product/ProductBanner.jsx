import { Box, Typography } from "@mui/material";
import bannerImage from "../../../assets/sm-banner.png";
const ProductBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "250px",
        // make it lazy loader
        backgroundColor: "#65eacf",
        backgroundImage: {
          xs: ``,
          sm: `url(${bannerImage})`,
        },
        backgroundSize: "contain", // Optional: Adjust background size
        backgroundPosition: "right", // Optional: Center the image
        backgroundRepeat: "no-repeat",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",

        padding: {
          xs: 5,
          md: 10,
        },
      }}
    >
      <Typography
        fontWeight={600}
        color="#0030ff"
        fontSize={{
          xs: 25,
          md: 30,
        }}
      >
        Products Demo
      </Typography>
      <Typography
        fontWeight={400}
        color="#fff"
        fontSize={{
          xs: 15,
          md: 20,
        }}
      >
        Discover the latest additions to our collection.
      </Typography>
    </Box>
  );
};

export default ProductBanner;
