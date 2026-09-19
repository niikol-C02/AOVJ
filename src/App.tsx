/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AccessibilityPreferences, AuthMode, Career, Scholarship, TestResult, University, User, ViewType } from './types';
import { StorageController } from './controllers/StorageController';
import { CAREERS_DATA, UNIVERSITIES_DATA, SCHOLARSHIPS_DATA } from './models/data';

// Components
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { AuthModal } from './components/AuthModal';
import { CareerDetailModal } from './components/CareerDetailModal';
import { UniversityDetailModal } from './components/UniversityDetailModal';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { CareerCompareModal } from './components/CareerCompareModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Compass, RefreshCw } from 'lucide-react';

// Views
import { WelcomeAuthView } from './views/WelcomeAuthView';
import { HomeView } from './views/HomeView';
import { TestView } from './views/TestView';
import { ResultsView } from './views/ResultsView';
import { CareersView } from './views/CareersView';
import { UniversitiesView } from './views/UniversitiesView';
import { ScholarshipsView } from './views/ScholarshipsView';
import { ProfileView } from './views/ProfileView';
import { AdminDashboardView } from './views/AdminDashboardView';

export default function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // User session
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Auth modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Active item detail modals
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Compare Tool state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparedCareerIds, setComparedCareerIds] = useState<string[]>([
    'ing-software-ia',
    'diseno-digital-ux-ui'
  ]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = StorageController.initAuthListener((user) => {
      setCurrentUser(user);
      setIsAuthChecking(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth actions
  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    try {
      sessionStorage.setItem('vocaccion_session_authenticated', 'true');
    } catch (e) {
      // ignore
    }
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('vocaccion_session_authenticated');
    } catch (e) {
      // ignore
    }
    await StorageController.logout();
    setCurrentUser(null);
    showToast('Sesión cerrada', 'Has salido de tu cuenta de VocAcción.', 'info');
    setCurrentView('home');
  };

  // Accessibility Preferences
  const [accessibilityPreferences, setAccessibilityPreferences] = useState<AccessibilityPreferences>(
    currentUser?.accessibilityPreferences || {}
  );

  useEffect(() => {
    if (currentUser?.accessibilityPreferences) {
      setAccessibilityPreferences(currentUser.accessibilityPreferences);
    }
  }, [currentUser?.accessibilityPreferences]);

  // Guard for Admin Dashboard
  useEffect(() => {
    if (currentView === 'admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        showToast('Acceso Denegado (403)', 'Esta área requiere privilegios de administrador autorizados.', 'error');
        setCurrentView('home');
      }
    }
  }, [currentView, currentUser]);

  const handleUpdateAccessibilityPreferences = async (newPrefs: AccessibilityPreferences) => {
    setAccessibilityPreferences(newPrefs);
    if (currentUser) {
      const updated = await StorageController.updateUser(currentUser.id, {
        accessibilityPreferences: newPrefs
      });
      if (updated) {
        setCurrentUser(updated);
      }
    }
  };

  const handleUpdateUserAge = async (newAge: number) => {
    if (currentUser) {
      const updated = await StorageController.updateUser(currentUser.id, {
        age: newAge
      });
      if (updated) {
        setCurrentUser(updated);
        showToast('Edad actualizada', `Tu experiencia vocacional ahora se adapta para los ${newAge} años.`, 'success');
      }
    }
  };

  // Test completed handler
  const handleCompleteTest = async (result: TestResult) => {
    if (currentUser) {
      const updated = await StorageController.addTestResultToUser(currentUser.id, result);
      if (updated) {
        setCurrentUser(updated);
      }
    }
    showToast(
      '¡Test Guardado en la Base de Datos!',
      `Tu perfil dominante es ${result.profileTitle}. Descubre tus carreras compatibles.`,
      'success'
    );
    setCurrentView('results');
  };

  // Bookmark / Favorite Toggles
  const handleToggleFavoriteCareer = async (careerId: string) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    const updated = await StorageController.toggleFavorite(currentUser.id, 'career', careerId);
    if (updated) {
      setCurrentUser(updated);
      const isNowSaved = updated.savedCareers?.includes(careerId);
      showToast(
        isNowSaved ? 'Carrera guardada en Firebase' : 'Carrera removida',
        isNowSaved ? 'Se agregó a tus carreras favoritas en tu perfil.' : 'Se quitó de tus favoritos.',
        'info'
      );
    }
  };

  const handleToggleFavoriteUniversity = async (uniId: string) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    const updated = await StorageController.toggleFavorite(currentUser.id, 'university', uniId);
    if (updated) {
      setCurrentUser(updated);
      const isNowSaved = updated.savedUniversities?.includes(uniId);
      showToast(
        isNowSaved ? 'Universidad guardada en Firebase' : 'Universidad removida',
        isNowSaved ? 'Se agregó a tus universidades de interés.' : 'Se quitó de tu lista.',
        'info'
      );
    }
  };

  const handleToggleFavoriteScholarship = async (schId: string) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    const updated = await StorageController.toggleFavorite(currentUser.id, 'scholarship', schId);
    if (updated) {
      setCurrentUser(updated);
      const isNowSaved = updated.savedScholarships?.includes(schId);
      showToast(
        isNowSaved ? 'Beca guardada en Firebase' : 'Beca removida',
        isNowSaved ? 'Se agregó a tus becas de interés en el perfil.' : 'Se quitó de tus becas.',
        'info'
      );
    }
  };

  // Compare Tool Actions
  const handleToggleCompareCareer = (careerId: string) => {
    setComparedCareerIds(prev => {
      if (prev.includes(careerId)) {
        return prev.filter(id => id !== careerId);
      }
      if (prev.length >= 3) {
        showToast('Límite del comparador', 'Puedes comparar un máximo de 3 carreras simultáneamente.', 'info');
        return prev;
      }
      showToast('Carrera agregada al comparador', 'Abre el comparador para ver las diferencias.', 'success');
      return [...prev, careerId];
    });
  };

  const handleRemoveFromCompare = (careerId: string) => {
    setComparedCareerIds(prev => prev.filter(id => id !== careerId));
  };

  const handleAddToCompare = (careerId: string) => {
    if (!comparedCareerIds.includes(careerId) && comparedCareerIds.length < 3) {
      setComparedCareerIds(prev => [...prev, careerId]);
    }
  };

  // Navigation from university careers click
  const handleNavigateToCareersWithFilter = (careerName?: string) => {
    setCurrentView('careers');
    if (careerName) {
      const found = CAREERS_DATA.find(c => c.name.toLowerCase().includes(careerName.toLowerCase()));
      if (found) {
        setSelectedCareer(found);
      }
    }
  };

  // Latest test result
  const latestTestResult = currentUser?.testHistory && currentUser.testHistory.length > 0 
    ? currentUser.testHistory[0] 
    : null;

  // Selected compared career objects
  const comparedCareerObjects = CAREERS_DATA.filter(c => comparedCareerIds.includes(c.id));

  // 1. Loading screen while Firebase Auth verifies existing session
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] p-4">
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 shadow-xl flex items-center justify-center text-white">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Voc<span className="text-pink-600">Acción</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 justify-center font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-pink-500" />
              <span>Verificando acceso a tu cuenta...</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Initial Gate: When unauthenticated, show the Welcome & Authentication Screen
  if (!currentUser) {
    return (
      <>
        <WelcomeAuthView
          onAuthSuccess={handleAuthSuccess}
          onShowToast={showToast}
        />
        <ToastContainer
          toasts={toasts}
          onDismiss={dismissToast}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 antialiased selection:bg-pink-200 selection:text-purple-900 pb-16 lg:pb-0">
      {/* Frosted Glass Ambient Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300/35 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-20 w-[480px] h-[480px] bg-indigo-200/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[560px] h-[560px] bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      {/* Top Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        savedCareersCount={currentUser?.savedCareers?.length || 0}
      />

      {/* Main Container Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentView === 'home' && (
          <HomeView
            currentUser={currentUser}
            onNavigate={setCurrentView}
            latestTestResult={latestTestResult}
            trendingCareers={CAREERS_DATA.filter(c => c.isTrending)}
            onSelectCareer={setSelectedCareer}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === 'test' && (
          <TestView
            currentUser={currentUser}
            onCompleteTest={handleCompleteTest}
            onShowToast={showToast}
            accessibilityPreferences={currentUser?.accessibilityPreferences || accessibilityPreferences}
            onUpdateAccessibilityPreferences={handleUpdateAccessibilityPreferences}
            onUpdateUserAge={handleUpdateUserAge}
          />
        )}

        {currentView === 'results' && (
          <ResultsView
            testResult={latestTestResult}
            currentUser={currentUser}
            onRetakeTest={() => setCurrentView('test')}
            onSelectCareer={setSelectedCareer}
            onToggleSaveCareer={handleToggleFavoriteCareer}
            savedCareers={currentUser?.savedCareers || []}
            onNavigateToView={setCurrentView}
            onCompareToggle={handleToggleCompareCareer}
            comparedCareers={comparedCareerIds}
            onShowToast={showToast}
          />
        )}

        {currentView === 'careers' && (
          <CareersView
            careers={CAREERS_DATA}
            onSelectCareer={setSelectedCareer}
            onToggleSaveCareer={handleToggleFavoriteCareer}
            savedCareers={currentUser?.savedCareers || []}
            onCompareToggle={handleToggleCompareCareer}
            comparedCareers={comparedCareerIds}
            latestTestResult={latestTestResult}
            onNavigateToView={setCurrentView}
          />
        )}

        {currentView === 'universities' && (
          <UniversitiesView
            universities={UNIVERSITIES_DATA}
            onSelectUniversity={setSelectedUniversity}
            onToggleSaveUniversity={handleToggleFavoriteUniversity}
            savedUniversities={currentUser?.savedUniversities || []}
            onNavigateToCareers={handleNavigateToCareersWithFilter}
          />
        )}

        {currentView === 'scholarships' && (
          <ScholarshipsView
            scholarships={SCHOLARSHIPS_DATA}
            onSelectScholarship={setSelectedScholarship}
            onToggleSaveScholarship={handleToggleFavoriteScholarship}
            savedScholarships={currentUser?.savedScholarships || []}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onUpdateUser={setCurrentUser}
            onLogout={handleLogout}
            onOpenAuth={handleOpenAuth}
            allCareers={CAREERS_DATA}
            allUniversities={UNIVERSITIES_DATA}
            allScholarships={SCHOLARSHIPS_DATA}
            onSelectCareer={setSelectedCareer}
            onSelectUniversity={setSelectedUniversity}
            onSelectScholarship={setSelectedScholarship}
            onNavigateToView={setCurrentView}
            onShowToast={showToast}
            onUpdatePreferences={handleUpdateAccessibilityPreferences}
            onUpdateAge={handleUpdateUserAge}
          />
        )}

        {currentView === 'compare' && (
          <div className="space-y-6">
            <CareerCompareModal
              isOpen={true}
              onClose={() => setCurrentView('careers')}
              selectedCareers={comparedCareerObjects}
              allCareers={CAREERS_DATA}
              onAddCareer={handleAddToCompare}
              onRemoveCareer={handleRemoveFromCompare}
              onSelectCareerDetail={setSelectedCareer}
              latestTestResult={latestTestResult}
            />
          </div>
        )}

        {currentView === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboardView
            currentUser={currentUser}
            onNavigate={setCurrentView}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer with Frosted Glass styling */}
      <footer className="relative z-10 mt-auto border-t border-white/60 bg-white/50 backdrop-blur-xl py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-600 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
          <button onClick={() => setCurrentView('home')} className="hover:text-purple-700 transition-colors">Inicio</button>
          <span className="text-slate-300">•</span>
          <button onClick={() => setCurrentView('test')} className="hover:text-purple-700 transition-colors">Test Vocacional</button>
          <span className="text-slate-300">•</span>
          <button onClick={() => setCurrentView('careers')} className="hover:text-purple-700 transition-colors">Carreras</button>
          <span className="text-slate-300">•</span>
          <button onClick={() => setCurrentView('universities')} className="hover:text-purple-700 transition-colors">Universidades</button>
          <span className="text-slate-300">•</span>
          <button onClick={() => setCurrentView('scholarships')} className="hover:text-purple-700 transition-colors">Becas</button>
        </div>
        <p className="text-slate-500">
          VocAcción © 2026 • Orientación Vocacional para Jóvenes y Estudiantes • Modelo Psicométrico RIASEC (Holland)
        </p>
      </footer>

      {/* Bottom Mobile Navigation for Phones */}
      <MobileNav
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        onShowToast={showToast}
        initialMode={authMode}
      />

      <CareerDetailModal
        career={selectedCareer}
        onClose={() => setSelectedCareer(null)}
        isSaved={!!selectedCareer && (currentUser?.savedCareers?.includes(selectedCareer.id) || false)}
        onToggleSave={handleToggleFavoriteCareer}
        onCompareToggle={handleToggleCompareCareer}
        isCompared={!!selectedCareer && comparedCareerIds.includes(selectedCareer.id)}
        onNavigateToView={setCurrentView}
        matchScore={
          selectedCareer
            ? latestTestResult?.recommendedCareers?.find(rc => rc.careerId === selectedCareer.id)?.matchPercentage
            : undefined
        }
      />

      <UniversityDetailModal
        university={selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
        isSaved={!!selectedUniversity && (currentUser?.savedUniversities?.includes(selectedUniversity.id) || false)}
        onToggleSave={handleToggleFavoriteUniversity}
        onNavigateToCareers={handleNavigateToCareersWithFilter}
      />

      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        isSaved={!!selectedScholarship && (currentUser?.savedScholarships?.includes(selectedScholarship.id) || false)}
        onToggleSave={handleToggleFavoriteScholarship}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
