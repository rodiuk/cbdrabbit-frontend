import { handler } from "@/configs/auth.config";

export const runtime = "edge"; // запускаємо на Edge runtime
export const dynamic = "force-dynamic"; // вимикаємо будь-яку статичну оптимізацію
export const revalidate = 0; // нульова реалідація (не використовує ISR)
export const cache = "no-store"; // заголовок Cache-Control: no-store

export { handler as GET, handler as POST };
