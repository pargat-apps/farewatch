import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  alerts as initialAlerts,
  notifications as initialNotifications,
  savedSearches as initialSaved,
  type AlertItem,
  type NotificationItem,
  type SavedSearch,
} from '../data/mock';

export interface SearchForm {
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departDate: string;
  returnDate: string;
  travelers: number;
  cabin: string;
  tripType: 'Round trip' | 'One way' | 'Multi-city';
}

const defaultSearchForm: SearchForm = {
  fromCode: 'YYZ',
  fromCity: 'Toronto',
  toCode: 'DEL',
  toCity: 'Delhi',
  departDate: 'Thu, Oct 15',
  returnDate: 'Tue, Nov 10',
  travelers: 2,
  cabin: 'Economy',
  tripType: 'Round trip',
};

interface AppStateValue {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;

  searchForm: SearchForm;
  setSearchForm: (f: Partial<SearchForm>) => void;

  alerts: AlertItem[];
  pauseAlert: (id: string) => void;
  resumeAlert: (id: string) => void;
  deleteAlert: (id: string) => void;
  upsertAlert: (alert: AlertItem) => void;

  notifications: NotificationItem[];
  unreadCount: number;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  savedSearches: SavedSearch[];
  deleteSaved: (id: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [searchForm, setSearchFormState] = useState<SearchForm>(defaultSearchForm);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(initialSaved);

  const setSearchForm = (f: Partial<SearchForm>) => setSearchFormState((prev) => ({ ...prev, ...f }));

  const pauseAlert = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Paused' } : a)));
  const resumeAlert = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Active' } : a)));
  const deleteAlert = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const upsertAlert = (alert: AlertItem) =>
    setAlerts((prev) => {
      const exists = prev.some((a) => a.id === alert.id);
      return exists ? prev.map((a) => (a.id === alert.id ? alert : a)) : [alert, ...prev];
    });

  const markAllNotificationsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markNotificationRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const clearAllNotifications = () => setNotifications([]);

  const deleteSaved = (id: string) => setSavedSearches((prev) => prev.filter((s) => s.id !== id));

  const unreadCount = useMemo(() => notifications.filter((n) => n.unread).length, [notifications]);

  const value: AppStateValue = {
    isSignedIn,
    signIn: () => setIsSignedIn(true),
    signOut: () => setIsSignedIn(false),
    searchForm,
    setSearchForm,
    alerts,
    pauseAlert,
    resumeAlert,
    deleteAlert,
    upsertAlert,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    markNotificationRead,
    clearAllNotifications,
    savedSearches,
    deleteSaved,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
