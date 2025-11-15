import { CartProvider } from "@/contexts/CartContext";
import { OrderHistoryProvider } from "@/contexts/OrderHistoryContext";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <OrderHistoryProvider>
            <Header />
            <main>{children}</main>
          </OrderHistoryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
