import { getAllProducts } from "@/libs/api/products.api";

import cn from "clsx";
import styles from "./page.module.css";

export default async function Home() {
  const res = await getAllProducts();

  return (
    <main className={cn("container", styles.main)}>
      <ul className={styles.list}>
        {res?.map(product => (
          <li key={product.id} className={styles.item}>
            <h1>{product.productName}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
