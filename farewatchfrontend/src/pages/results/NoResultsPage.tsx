import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { TopNav } from '../../components/TopNav';
import { Button } from '../../components/ui/Button';
import { SearchOffIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

export default function NoResultsPage() {
  const navigate = useNavigate();
  const { searchForm } = useAppState();

  return (
    <Screen wide>
      <div className="fw-mobile-only">
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
            <BackButton onClick={() => navigate('/results')} />
            <div style={{ flex: 1 }}>
              <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
                {searchForm.fromCode} → {searchForm.toCode}
              </div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
                {searchForm.departDate} – {searchForm.returnDate} · Direct only · Under CA$700
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/home')}>
              Modify
            </Button>
          </div>
        </div>
      </div>
      <div className="fw-desktop-only">
        <TopNav
          variant="task"
          context={{
            route: (
              <>
                {searchForm.fromCode} → {searchForm.toCode}
              </>
            ),
            dates: `${searchForm.departDate} – ${searchForm.returnDate}`,
            travelers: 'Direct only · Under CA$700',
            onEdit: () => navigate('/home'),
          }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="fw-mobile-only">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
            <SearchOffIcon size={28} />
          </div>
          <div style={{ font: '600 18px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 18 }}>No matching flights</div>
          <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8, maxWidth: 280 }}>
            Try changing your dates, filters, or nearby airports.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24, width: 240 }}>
            <Button fullWidth onClick={() => navigate('/results')}>
              Change filters
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/home')}>
              Modify search
            </Button>
          </div>
        </div>
        </div>

        {/* ---- Desktop: filter chips + empty card (per FareWatch Desktop UI D7) ---- */}
        <div className="fw-desktop-only">
        <div style={{ flex: 1 }}>
          <div className="fw-container" style={{ padding: '26px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: 640, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {['Direct', 'Under CA$700'].map((chip) => (
                <span
                  key={chip}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 'var(--r-pill)', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', font: '600 11.5px/1 var(--font-sans)', color: 'var(--blue-700)' }}
                >
                  {chip}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              ))}
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: 640,
                background: '#fff',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-xs)',
                padding: '56px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-100)', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchOffIcon size={26} />
              </div>
              <div style={{ font: '800 22px/1.3 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)', marginTop: 20 }}>No flights match these filters</div>
              <div style={{ font: '400 14px/1.6 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10, maxWidth: 420 }}>
                There are no direct fares under CA$700 on this route. The cheapest direct option we found is CA$1,340.
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <Button size="md" onClick={() => navigate('/results')}>
                  Allow 1 stop
                </Button>
                <Button variant="secondary" size="md" onClick={() => navigate('/results')}>
                  Clear all filters
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 28,
                  padding: '12px 16px',
                  borderRadius: 'var(--r-md)',
                  background: 'var(--purple-50)',
                  border: '1px solid var(--purple-100)',
                  font: '500 12.5px/1.5 var(--font-sans)',
                  color: 'var(--purple-700)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
                Or set a CA$700 target and we'll alert you if a direct fare reaches it.
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Screen>
  );
}
