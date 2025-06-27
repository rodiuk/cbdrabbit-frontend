import { handler } from "@/configs/auth.config";

export const runtime = "nodejs"; // запускаємо на Edge runtime
export const dynamic = "force-dynamic"; // вимикаємо будь-яку статичну оптимізацію
export const revalidate = 0; // нульова реалідація (не використовує ISR)

export { handler as GET, handler as POST };
