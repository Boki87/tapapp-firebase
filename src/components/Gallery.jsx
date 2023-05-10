import { Box } from "@chakra-ui/react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "../global.css";

export default function Gallery({ images }) {
  return (
    <div style={{ padding: "10px" }}>
      <OwlCarousel
        loop
        margin={10}
        items={1}
        nav
        navClass={["my-prev", "my-next"]}
        navContainerClass={"my-nav"}
        responsive={{
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
        }}
        autoplay
        autoplayTimeout={4000}
      >
        {images.map((img) => (
          <div
            key={img}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={img}
              style={{
                minWidth: "100%",
                minHeight: "100%",
                maxHeight: "250px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
