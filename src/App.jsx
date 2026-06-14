import { useEffect, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import BigLoader from "./components/BigLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

const App = () => {
  const { i18n, ready } = useTranslation();
  // Show the splash loader until translations are ready, then latch it off so
  // switching languages later never brings back the full-screen loader.
  const [appReady, setAppReady] = useState(ready);

  useEffect(() => {
    if (ready) setAppReady(true);
  }, [ready]);

  return (
    <Router>
      {!appReady ? (
        <BigLoader />
      ) : (
        <Suspense fallback="Loading...">
          <Header />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to={`/${i18n.language}`} />} />
              <Route path="/:language" element={<HomePage />} />
              <Route
                path="/:language/country/:countryCode"
                element={<CountryPage />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </Suspense>
      )}
    </Router>
  );
};

export default App;
