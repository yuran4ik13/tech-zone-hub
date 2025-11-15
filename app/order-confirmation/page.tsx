"use server";
import { $api } from "@/api/api";
import TrackOrderPage from "./OrderConfirmation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string | undefined }>;
}) {
  const { orderId } = await searchParams;

  let trackingData = null;

  try {
    const { data } = await $api.get(`/tracking/${orderId}`);
    trackingData = data;
  } catch (e) {
    console.error(e);
  }

  return (
    <TrackOrderPage
      serverOrderId={orderId ?? ""}
      serverTrackingData={trackingData}
    />
  );
}
