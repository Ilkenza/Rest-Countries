import { Component } from "react";
import PropTypes from "prop-types";
import i18n from "../i18n";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center text-text_light dark:text-white">
          <h1 className="text-2xl font-bold">{i18n.t("errorTitle")}</h1>
          <p className="opacity-80">{i18n.t("dataLoadError")}</p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 rounded-md border border-bg_dark dark:border-bg_light"
          >
            {i18n.t("errorRetry")}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
