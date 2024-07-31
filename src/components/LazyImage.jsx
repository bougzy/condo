import React, { useState } from "react";

function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="lazy-image">
      <img
        src={src}
        alt={alt}
        style={{ display: isLoaded ? 'block' : 'none' }}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <div className="placeholder">Loading...</div>}
    </div>
  );
}

export default LazyImage;
