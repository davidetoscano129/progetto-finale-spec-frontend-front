import React from "react";
import "../styles/PageContainer.css";

const PageContainer = ({
  children,
  title,
  description,
  backgroundImage = null,
  backgroundOverlay = true,
  additionalText = null,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  additionalTextClassName = "",
}) => {
  return (
    <main className={`container py-3 pb-5 ${className}`}>
      {(title || description) && (
        <section className="row mb-4">
          <div className="col-12">
            <div
              className={`card shadow-sm ${
                backgroundImage ? "page-header-with-bg" : "p-4"
              }`}
            >
              {backgroundImage && (
                <div className="page-header-background">
                  <img
                    src={backgroundImage}
                    alt=""
                    className="page-background-image"
                    loading="eager"
                  />
                  {backgroundOverlay && (
                    <div className="page-background-overlay"></div>
                  )}
                </div>
              )}
              <div
                className={`page-header-content ${
                  backgroundImage ? "with-bg" : ""
                }`}
              >
                {title && (
                  <div className="title-wrapper">
                    <h1
                      className={`${
                        backgroundImage ? "text-white" : ""
                      } ${titleClassName}`}
                    >
                      {title}
                    </h1>
                  </div>
                )}
                {description && (
                  <p
                    className={`${
                      backgroundImage ? "text-white mb-2" : ""
                    } ${descriptionClassName}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                {additionalText && (
                  <p
                    className={`additional-text text-white ${additionalTextClassName}`}
                  >
                    {additionalText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {children}
    </main>
  );
};

export default React.memo(PageContainer);
