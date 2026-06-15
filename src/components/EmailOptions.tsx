import { useEffect, useRef, useState } from 'react';
import { Mail, ChevronDown, Copy, Check, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/profile';

const PILL_STYLE = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid #FFFFFF',
  outlineOffset: '-3px',
} as const;

/**
 * Email call-to-action that opens a menu of mailing options (Gmail, Outlook,
 * default mail app, or copy) instead of forcing a single mailto handler.
 */
export default function EmailOptions() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const email = PROFILE.email;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const providers = [
    { label: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, external: true },
    { label: 'Outlook', href: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`, external: true },
    { label: 'Default mail app', href: `mailto:${email}`, external: false },
  ];

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-3 rounded-full text-white font-medium lowercase tracking-wide px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base transition-[filter] duration-200 hover:brightness-110"
        style={PILL_STYLE}
      >
        <Mail size={18} />
        {email}
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-50 rounded-2xl border border-white/10 bg-[#161619] p-1.5 shadow-2xl"
        >
          {providers.map((p) => (
            <a
              key={p.label}
              role="menuitem"
              href={p.href}
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[#D7E2EA] hover:bg-white/[0.06] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Mail size={15} className="opacity-60" />
                Compose in {p.label}
              </span>
              {p.external && <ExternalLink size={14} className="opacity-40" />}
            </a>
          ))}

          <button
            type="button"
            role="menuitem"
            onClick={copy}
            className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-[#D7E2EA] hover:bg-white/[0.06] transition-colors"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} className="opacity-60" />}
            {copied ? 'Copied!' : 'Copy address'}
          </button>
        </div>
      )}
    </div>
  );
}
