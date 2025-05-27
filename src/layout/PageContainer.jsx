import React from "react";

const PageContainer = ({ children, title, description, className = "" }) => {
  return (
    <main className={`container py-5 pb-5 ${className}`}>
      {(title || description) && (
        <section className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm p-4">
              {title && <h1>{title}</h1>}
              {description && (
                <p dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
          </div>
        </section>
      )}
      {children}
    </main>
  );
};

export default React.memo(PageContainer);
