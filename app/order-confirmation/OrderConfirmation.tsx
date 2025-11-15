"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { $api } from "@/api/api";

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface TrackingData {
  trackingNumber: string;
  orderNumber: string;
  currentStatus: string;
  estimatedDelivery: string;
  carrier: string;
  events: TrackingEvent[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface TrackOrderPageProps {
  serverOrderId: string;
  serverTrackingData: TrackingData | null;
}

export default function TrackOrderPage({
  serverOrderId,
  serverTrackingData,
}: TrackOrderPageProps) {
  const [orderId, setOrderId] = useState(serverOrderId || "");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(
    serverTrackingData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrackingData = async (number: string) => {
    if (!number.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await $api.get(`/tracking/${number}`);

      setTrackingData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch tracking data"
      );
      setTrackingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackingData(orderId);
  };

  return (
    <div className="container track-order-page">
      <h1 className="page-title">Track Your Order</h1>

      <div className="tracking-search">
        <form onSubmit={handleSubmit}>
          <div className="search-group">
            <input
              type="text"
              placeholder="Enter your tracking number or order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="tracking-input"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Tracking..." : "Track Package"}
            </button>
          </div>
        </form>
        <p className="tracking-hint">
          You can find your tracking number in the order confirmation email.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="tracking-loading">
          <div className="loader"></div>
          <p>Fetching tracking information...</p>
        </div>
      )}

      {trackingData && !isLoading && (
        <div className="tracking-results">
          <div className="tracking-overview">
            <div className="overview-header">
              <div>
                <h2>Order #{trackingData.orderNumber}</h2>
                <p className="tracking-number">
                  Tracking: {trackingData.trackingNumber}
                </p>
              </div>
              <div className="current-status">
                <span
                  className={`status-badge status-${trackingData.currentStatus
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {trackingData.currentStatus}
                </span>
              </div>
            </div>

            <div className="overview-details">
              <div className="detail-item">
                <span className="detail-label">Carrier:</span>
                <span className="detail-value">{trackingData.carrier}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estimated Delivery:</span>
                <span className="detail-value">
                  {trackingData.estimatedDelivery}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Delivery Address:</span>
                <span className="detail-value">
                  {trackingData.shippingAddress.address},{" "}
                  {trackingData.shippingAddress.city},{" "}
                  {trackingData.shippingAddress.postalCode},{" "}
                  {trackingData.shippingAddress.country}
                </span>
              </div>
            </div>
          </div>

          <div className="tracking-timeline">
            <h3>Tracking History</h3>
            <div className="timeline">
              {trackingData.events.map((event, index) => (
                <div
                  key={event.id}
                  className={`timeline-item ${
                    event.isCompleted ? "completed" : "pending"
                  }`}
                >
                  <div className="timeline-marker">
                    {event.isCompleted ? (
                      <span className="marker-completed">✓</span>
                    ) : (
                      <span className="marker-pending"></span>
                    )}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{event.status}</h4>
                      <span className="timeline-time">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="timeline-description">{event.description}</p>
                    <p className="timeline-location">📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!trackingData && !isLoading && !error && (
        <div className="tracking-help">
          <h3>Need Help?</h3>
          <div className="help-grid">
            <div className="help-card">
              <span className="help-icon">📦</span>
              <h4>Where&apos;s my tracking number?</h4>
              <p>
                Your tracking number was sent to your email after your order was
                shipped. Check your order confirmation email.
              </p>
            </div>
            <div className="help-card">
              <span className="help-icon">⏱️</span>
              <h4>When will I receive my order?</h4>
              <p>
                Standard shipping takes 3-5 business days. Express shipping
                takes 1-2 business days.
              </p>
            </div>
            <div className="help-card">
              <span className="help-icon">💬</span>
              <h4>Still have questions?</h4>
              <p>
                Our customer support team is here to help. Contact us anytime
                for assistance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
