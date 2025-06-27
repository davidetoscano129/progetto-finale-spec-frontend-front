import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FavoriteButton from "./FavoriteButton";
import "../style/components/PackageInfo.css";

export default function PackageInfo({ packageData }) {
  const { isFavorite, toggleFavorite } = useContext(GlobalContext);
  const formatPrice = (price) => `€${price.toLocaleString()}`;
  const formatBoolean = (value) => (value ? "Yes" : "No");

  return (
    <div className="package-info">
      <div className="package-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 className="package-name">{packageData.title}</h2>
            <span className="package-category-badge">
              {packageData.category}
            </span>
          </div>
          <FavoriteButton
            packageId={packageData.id}
            isFavorite={isFavorite(packageData.id)}
            onToggle={toggleFavorite}
          />
        </div>
      </div>

      <div className="package-details-grid">
        <div className="detail-row">
          <span className="detail-label">Duration</span>
          <span className="detail-value">
            {packageData.details.duration} weeks
          </span>
        </div>

        <div className="detail-row price-row">
          <span className="detail-label">Price</span>
          <span className="detail-value price">
            {formatPrice(packageData.details.price)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Team Size</span>
          <span className="detail-value">
            {packageData.details.team_size} consultants
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Remote Option</span>
          <span
            className={`detail-value ${
              packageData.details.remote_option ? "positive" : "negative"
            }`}
          >
            {formatBoolean(packageData.details.remote_option)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Support Level</span>
          <span className="detail-value">{packageData.details.support}</span>
        </div>
      </div>

      <div className="package-description">
        <h3>Best For</h3>
        <p>{packageData.details.best_for}</p>
      </div>
    </div>
  );
}
