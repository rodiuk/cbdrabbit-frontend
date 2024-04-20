import { Product } from "@prisma/client";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { calculatePrice } from "@/utils/calculatePrice";
import { Cart } from "@/interfaces/store.interface";
import { IProductRes } from "@/interfaces/product.interface";

export const initialCartState = {
  products: [],
  totalAmount: 0,
  totalCount: 0,
  newPrice: 0,
};

const storage = typeof window !== "undefined" ? window.localStorage : null;

// Cart atom
const cartAtom = atomWithStorage<Cart>(
  "cart",
  initialCartState,
  { ...createJSONStorage(() => storage as Storage) },
  {
    getOnInit: true,
  }
);

// Add product to cart
const addProductToCartAtom = atom(
  (get: (atom: any) => Cart) => get(cartAtom),
  (
    get: (atom: any) => Cart,
    set: (atom: any, cart: Cart) => void,
    update: Product
  ) => {
    const cart = get(cartAtom);
    const existingProductIndex = cart.products.findIndex(
      p => p.id === update.id
    );

    const updatedProducts = [...cart.products];
    let totalCount = cart.totalCount;

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].count += 1;
      totalCount += 1;
    } else {
      updatedProducts.push({ ...update, count: 1 });
      totalCount += 1;
    }

    const newPrice = calculatePrice(totalCount);

    cart.totalAmount = newPrice * totalCount;

    set(cartAtom, { ...cart, newPrice, totalCount, products: updatedProducts });
  }
);

// Remove product from cart
const removeProductFromCartAtom = atom(
  (get: (atom: any) => Cart) => get(cartAtom),
  (
    get: (atom: any) => Cart,
    set: (atom: any, cart: Cart) => void,
    update: Product
  ) => {
    const cart = get(cartAtom);
    const updatedProducts = [...cart.products];
    const existingProduct = updatedProducts.find(p => p.id === update.id);
    let totalCount = cart.totalCount;
    let newPrice = calculatePrice(cart.totalCount);

    if (existingProduct && existingProduct.count > 0) {
      existingProduct.count -= 1;
      newPrice = calculatePrice(totalCount);
      totalCount -= 1;
      newPrice = calculatePrice(totalCount);
      cart.totalAmount = totalCount * newPrice;
    }

    set(cartAtom, { ...cart, newPrice, totalCount, products: updatedProducts });
  }
);

// Change product count in cart by value
const changeProductCountAtom = atom(
  (get: (atom: any) => Cart) => get(cartAtom),
  (
    get: (atom: any) => Cart,
    set: (atom: any, cart: Cart) => void,
    { product, countValue }: { product: IProductRes; countValue: number }
  ) => {
    const cart = get(cartAtom);
    const updatedProducts = [...cart.products];
    const existingProduct = updatedProducts.find(p => p.id === product.id);
    let totalCount = cart.totalCount;
    let newPrice = calculatePrice(cart.totalCount);
    let totalAmount = cart.totalAmount;

    if (existingProduct) {
      totalAmount -= existingProduct.count * newPrice;
      totalCount -= existingProduct.count;
      totalCount += countValue;
      newPrice = calculatePrice(totalCount);
      totalAmount += newPrice * countValue;

      if (countValue > 0) {
        existingProduct.count = countValue;
      } else {
        existingProduct.count = 0;
      }
    } else {
      updatedProducts.push({ ...product, count: countValue });
      totalCount += countValue;
      newPrice = calculatePrice(totalCount);
      totalAmount += newPrice * countValue;
    }

    set(cartAtom, {
      ...cart,
      newPrice,
      totalCount,
      totalAmount,
      products: updatedProducts,
    });
  }
);

// Get all products from cart
const getAllProductsAtom = atom(get => {
  const { products } = get(cartAtom);
  return products;
});

// Get new price after order discount
const getProductNewPriceAtom = atom(get => {
  const { newPrice } = get(cartAtom);
  return newPrice;
});

// Get new price after order discount
const getTotalPriceAtom = atom(get => {
  const { totalAmount } = get(cartAtom);
  return totalAmount;
});

export {
  cartAtom,
  getAllProductsAtom,
  getProductNewPriceAtom,
  addProductToCartAtom,
  removeProductFromCartAtom,
  changeProductCountAtom,
  getTotalPriceAtom,
};
