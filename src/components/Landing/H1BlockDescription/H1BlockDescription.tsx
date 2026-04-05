import s from "./H1BlockDescription.module.css";

// import h1d1 from "/public/img/h1d1.png";
// import h1d2 from "/public/img/h1d2.png";
// import h1d3 from "/public/img/h1d3.png";
import Image from "next/image";

interface Props {
  productFinedDescr: any;
  productFinedImages: any;
  variantId?: string;
}

const H1BlockDescription = ({
  productFinedDescr,
  productFinedImages,
  variantId,
}: Props) => {
  const isClassic = variantId === "classic";
  const isBanana = variantId === "banana";
  const isMatcha = variantId === "matcha";
  const isCoffee = variantId === "coffee";

  return (
    <div
      className={`${s.descBlock} ${isMatcha ? s.matchaDescBlock : ""} ${isClassic ? s.classicDescBlock : ""} ${isBanana ? s.bananaDescBlock : ""} ${isCoffee ? s.coffeeDescBlock : ""}`}
    >
      {productFinedDescr &&
        productFinedDescr.map((it: any, index: number) => {
          const images = productFinedImages[index] || "";
          return (
            <div
              className={`${s.item} ${isMatcha ? s.matchaItem : ""} ${isClassic ? s.classicItem : ""} ${isBanana ? s.bananaItem : ""} ${isCoffee ? s.coffeeItem : ""}`}
              key={index}
            >
              <div
                className={`${s.ttl} ${isMatcha ? s.matchaTitle : ""} ${isClassic ? s.classicTitle : ""} ${isBanana ? s.bananaTitle : ""} ${isCoffee ? s.coffeeTitle : ""}`}
              >
                {it.descr}
              </div>
              <div className={s.img}>
                <Image src={images.image} width={240} height={342} alt="kg" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default H1BlockDescription;
