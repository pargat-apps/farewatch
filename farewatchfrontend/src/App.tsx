import { Routes, Route, Navigate } from 'react-router-dom';

import SplashPage from './pages/search/SplashPage';
import HomePage from './pages/search/HomePage';
import AirportSearchPage from './pages/search/AirportSearchPage';
import DatePickerPage from './pages/search/DatePickerPage';
import TravelersPage from './pages/search/TravelersPage';
import SearchLoadingPage from './pages/search/SearchLoadingPage';

import ResultsPage from './pages/results/ResultsPage';
import NoResultsPage from './pages/results/NoResultsPage';
import FlightDetailsPage from './pages/results/FlightDetailsPage';
import ComparePage from './pages/results/ComparePage';
import ViewDealPage from './pages/results/ViewDealPage';
import PriceChangedPage from './pages/results/PriceChangedPage';
import NoBookingOptionsPage from './pages/results/NoBookingOptionsPage';
import CompareFlightsPage from './pages/results/CompareFlightsPage';

import TrackPricePage from './pages/tracking/TrackPricePage';
import AlertCreatedPage from './pages/tracking/AlertCreatedPage';
import TargetReachedPage from './pages/tracking/TargetReachedPage';
import PriceHistoryPage from './pages/tracking/PriceHistoryPage';

import SignInPage from './pages/auth/SignInPage';
import CreateAccountPage from './pages/auth/CreateAccountPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

import DashboardPage from './pages/dashboard/DashboardPage';
import AlertsPage from './pages/dashboard/AlertsPage';
import EditAlertPage from './pages/dashboard/EditAlertPage';

import NotificationsPage from './pages/account/NotificationsPage';
import SavedPage from './pages/account/SavedPage';
import ProfilePage from './pages/account/ProfilePage';
import EditProfilePage from './pages/account/EditProfilePage';
import SettingsPage from './pages/account/SettingsPage';

import NetworkErrorPage from './pages/errors/NetworkErrorPage';
import SearchErrorPage from './pages/errors/SearchErrorPage';
import AlertErrorPage from './pages/errors/AlertErrorPage';

import StyleguideIndexPage from './pages/styleguide/StyleguideIndexPage';
import ToastsPage from './pages/styleguide/ToastsPage';
import TabBarStatesPage from './pages/styleguide/TabBarStatesPage';
import ComponentSheetPage from './pages/styleguide/ComponentSheetPage';

function App() {
  return (
    <div className="fw-app-shell">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search/airport" element={<AirportSearchPage />} />
        <Route path="/search/dates" element={<DatePickerPage />} />
        <Route path="/search/travelers" element={<TravelersPage />} />
        <Route path="/search/loading" element={<SearchLoadingPage />} />

        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/empty" element={<NoResultsPage />} />
        <Route path="/flight/:id" element={<FlightDetailsPage />} />
        <Route path="/flight/:id/compare" element={<ComparePage />} />
        <Route path="/flight/:id/price-changed" element={<PriceChangedPage />} />
        <Route path="/flight/:id/sold-out" element={<NoBookingOptionsPage />} />
        <Route path="/provider/:providerId/deal" element={<ViewDealPage />} />
        <Route path="/compare-flights" element={<CompareFlightsPage />} />

        <Route path="/track/:id" element={<TrackPricePage />} />
        <Route path="/track/:id/success" element={<AlertCreatedPage />} />
        <Route path="/target-reached" element={<TargetReachedPage />} />
        <Route path="/alerts/:id/history" element={<PriceHistoryPage />} />

        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/create-account" element={<CreateAccountPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/alerts/:id/edit" element={<EditAlertPage />} />

        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />

        <Route path="/error/network" element={<NetworkErrorPage />} />
        <Route path="/error/search" element={<SearchErrorPage />} />
        <Route path="/error/alert" element={<AlertErrorPage />} />

        <Route path="/styleguide" element={<StyleguideIndexPage />} />
        <Route path="/styleguide/toasts" element={<ToastsPage />} />
        <Route path="/styleguide/tabbar" element={<TabBarStatesPage />} />
        <Route path="/styleguide/components" element={<ComponentSheetPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
