"use client";

export default function formatPrice(num: number) {
  return num.toLocaleString(getCurrentLocale(), {
    style: "currency",
    currency: "EUR",
  });
}

function getCurrentLocale() {
  return "en-US";
}
