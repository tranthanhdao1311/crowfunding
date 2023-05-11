import React from "react";
import { Link } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/common/ErrorComponent";

const HeaderAuth = () => {
  return (
    <Link to="/" className="inline-block">
      <img srcSet="/logo.png 2x" alt="" />
    </Link>
  );
};

export default withErrorBoundary(HeaderAuth, {
  FallbackComponent: ErrorComponent,
});
