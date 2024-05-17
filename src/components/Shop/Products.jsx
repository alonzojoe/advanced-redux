import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const products = [
  {
    id: 1,
    name: "Nike Shoe",
    description: "SB Dunk",
    price: 1200,
  },
  {
    id: 2,
    name: "iPhone 14 Pro Max",
    description: "256 GB",
    price: 52000,
  },
  {
    id: 3,
    name: "Sony Speaker",
    description: "Bass Boosted",
    price: 5000,
  },
  {
    id: 4,
    name: "Insulated Thumbler",
    description: "Longlast up to 24hrs",
    price: 900,
  },
  {
    id: 5,
    name: "Foldable Chair",
    description: "heavy duty",
    price: 300,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((p) => (
          <ProductItem
            id={p.id}
            title={p.name}
            price={p.price}
            description={p.description}
            key={p.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
