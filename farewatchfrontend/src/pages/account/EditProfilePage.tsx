import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ChevronRightIcon } from '../../components/icons';
import { currentUser } from '../../data/mock';

const AVATAR_OPTIONS = ['/avatars/male2.png', '/avatars/male1.png', '/avatars/male7.png', 'initials', '/avatars/icon-default.png'];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <span style={{ font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Edit profile</span>
      </div>
      <div className="fw-scroll" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {avatar === 'initials' ? (
            <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue-600)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 22px/1 var(--font-sans)', outline: '2px solid var(--blue-600)', outlineOffset: 2 }}>
              PS
            </span>
          ) : (
            <img src={avatar} alt="Current avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', outline: '2px solid var(--blue-600)', outlineOffset: 2 }} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Profile avatar</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              {AVATAR_OPTIONS.map((opt) =>
                opt === 'initials' ? (
                  <span
                    key={opt}
                    onClick={() => setAvatar(opt)}
                    style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue-600)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 13px/1 var(--font-sans)', cursor: 'pointer' }}
                  >
                    PS
                  </span>
                ) : (
                  <img key={opt} src={opt} alt="Avatar option" onClick={() => setAvatar(opt)} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
                ),
              )}
              <span style={{ font: '600 12px/1 var(--font-sans)', color: 'var(--action)', marginLeft: 2, cursor: 'pointer' }}>Upload</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 18, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Home airport</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '700 13px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
              {currentUser.homeAirport}
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Preferred currency</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
              CAD
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Timezone</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
              {currentUser.timezone}
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border-default)', background: '#fff', flexShrink: 0, boxShadow: '0 -4px 12px rgba(10,37,64,.04)' }}>
        <Button size="lg" fullWidth onClick={() => navigate('/profile')}>
          Save changes
        </Button>
      </div>
    </Screen>
  );
}
