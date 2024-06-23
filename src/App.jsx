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
import { useTranslation } from "react-i18next";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <Router>
      {loading ? (
        <BigLoader />
      ) : (
        <Suspense fallback="Loading...">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to={`/${i18n.language}`} />} />
            <Route path="/:language" element={<HomePage />} />
            <Route
              path="/:language/country/:countryCode"
              element={<CountryPage />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      )}
    </Router>
  );
};

export default App;
