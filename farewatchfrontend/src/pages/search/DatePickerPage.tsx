import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { CloseIcon } from '../../components/icons';
import { Button } from '../../components/ui/Button';
import { useAppState } from '../../state/AppState';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function MonthGrid({
  year,
  monthIndex,
  start,
  end,
  onPick,
}: {
  year: number;
  monthIndex: number;
  start: Date | null;
  end: Date | null;
  onPick: (d: Date) => void;
}) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndex, d));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cells.map((date, i) => {
        if (!date) return <div key={i} style={{ width: '14.28%', height: 42 }} />;
        const isStart = start && sameDay(date, start);
        const isEnd = end && sameDay(date, end);
        const inRange = start && end && date > start && date < end;
        return (
          <div
            key={i}
            onClick={() => onPick(date)}
            style={{
              width: '14.28%',
              height: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              cursor: 'pointer',
              font: `${isStart || isEnd ? 600 : 400} 14px/1 var(--font-sans)`,
              color: isStart || isEnd ? '#fff' : inRange ? 'var(--navy-900)' : 'var(--text-body)',
              background: isStart || isEnd ? 'var(--blue-600)' : inRange ? 'var(--blue-50)' : 'transparent',
              borderRadius: isStart || isEnd ? '50%' : 0,
            }}
          >
            {date.getDate()}
          </div>
        );
      })}
    </div>
  );
}

export default function DatePickerPage() {
  const navigate = useNavigate();
  const { setSearchForm } = useAppState();
  const [start, setStart] = useState<Date | null>(new Date(2026, 9, 15));
  const [end, setEnd] = useState<Date | null>(new Date(2026, 10, 10));

  const pick = (date: Date) => {
    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
    } else if (date > start) {
      setEnd(date);
    } else {
      setStart(date);
      setEnd(null);
    }
  };

  const nights = useMemo(() => {
    if (!start || !end) return null;
    return Math.round((end.getTime() - start.getTime()) / 86400000);
  }, [start, end]);

  return (
    <Screen background="#fff">
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <button className="fw-reset-btn" onClick={() => navigate(-1)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)' }}>
          <CloseIcon size={18} />
        </button>
        <span style={{ flex: 1, textAlign: 'center', font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Select dates</span>
        <span style={{ width: 40 }} />
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', flexShrink: 0 }}>
        <div style={{ flex: 1, border: '1.5px solid var(--border-selected)', background: 'var(--surface-selected)', borderRadius: 'var(--r-md)', padding: '8px 12px' }}>
          <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--blue-700)' }}>Departure</div>
          <div style={{ font: '600 14px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{start ? fmt(start) : 'Select'}</div>
        </div>
        <div style={{ flex: 1, border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '8px 12px' }}>
          <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Return</div>
          <div style={{ font: '600 14px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{end ? fmt(end) : 'Select'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', padding: '0 16px', flexShrink: 0 }}>
        {WEEKDAYS.map((w, i) => (
          <span key={i} style={{ width: '14.28%', textAlign: 'center', font: '500 11px/24px var(--font-sans)', color: 'var(--text-faint)' }}>
            {w}
          </span>
        ))}
      </div>

      <div className="fw-scroll" style={{ padding: '4px 16px 0' }}>
        <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)', margin: '8px 0 6px' }}>October 2026</div>
        <MonthGrid year={2026} monthIndex={9} start={start} end={end} onPick={pick} />
        <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)', margin: '14px 0 6px' }}>November 2026</div>
        <MonthGrid year={2026} monthIndex={10} start={start} end={end} onPick={pick} />
        <div style={{ height: 16 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px 16px', borderTop: '1px solid var(--border-default)', background: '#fff', flexShrink: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
            {start ? fmt(start) : '—'} → {end ? fmt(end) : '—'}
          </div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
            {nights != null ? `${nights} nights · Round trip` : 'Choose your return date'}
          </div>
        </div>
        <Button
          size="lg"
          disabled={!start || !end}
          onClick={() => {
            if (!start || !end) return;
            setSearchForm({ departDate: fmt(start), returnDate: fmt(end) });
            navigate(-1);
          }}
        >
          Done
        </Button>
      </div>
    </Screen>
  );
}
