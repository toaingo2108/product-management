import { ProductType } from "../../types/productType";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface ProductItemProps {
  product: ProductType;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.images[0]}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title} {product.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
