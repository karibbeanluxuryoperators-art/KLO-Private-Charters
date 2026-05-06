/**
 * KLO Private Charters — Component Examples
 * Caribbean Luxury Operators Design System v1.0
 *
 * Production-ready React components using KLO design tokens.
 * All components require DESIGN-TOKENS.css to be imported globally.
 *
 * Dependencies: React 18+, TypeScript 5+
 */

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'outline';

const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ');

// ─────────────────────────────────────────────────────────────────────────────
// 1. BUTTON
// ─────────────────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-accent)',
    letterSpacing: 'var(--tracking-luxury)',
    textTransform: 'uppercase',
    fontWeight: 'var(--weight-medium)' as any,
    border: '1px solid transparent',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'var(--transition-normal)',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const sizeStyles: Record<Size, React.CSSProperties> = {
    sm: { padding: '10px 20px', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)' },
    md: { padding: '14px 32px', fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-sm)' },
    lg: { padding: '18px 48px', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-md)' },
  };

  const variantStyles: Record<Variant, React.CSSProperties> = {
    primary: {
      background: 'var(--color-deep-sea-800)',
      color: 'var(--color-pearl-100)',
      borderColor: 'var(--color-deep-sea-800)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-deep-sea-800)',
      borderColor: 'var(--color-deep-sea-800)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'transparent',
    },
    gold: {
      background: 'var(--color-gold-500)',
      color: 'var(--color-deep-sea-900)',
      borderColor: 'var(--color-gold-500)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-pearl-100)',
      borderColor: 'var(--color-gold-400)',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] }}
      disabled={disabled || loading}
      aria-busy={loading}
      className={className}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. INPUT FIELD
// ─────────────────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  required,
  id,
  className,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={inputId}
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: error ? 'var(--color-error-500)' : 'var(--text-secondary)',
        }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: 'var(--color-gold-500)', marginLeft: '4px' }}>
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        aria-invalid={!!error}
        aria-required={required}
        style={{
          height: '52px',
          padding: '0 16px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: `1px solid ${error ? 'var(--color-error-500)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          transition: 'var(--transition-normal)',
          width: '100%',
          boxSizing: 'border-box',
        }}
        className={className}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-error-500)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: 0,
          }}
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}

      {hint && !error && (
        <p
          id={`${inputId}-hint`}
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            margin: 0,
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. TEXTAREA
// ─────────────────────────────────────────────────────────────────────────────

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  hint,
  required,
  id,
  rows = 5,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={inputId}
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: error ? 'var(--color-error-500)' : 'var(--text-secondary)',
        }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: 'var(--color-gold-500)', marginLeft: '4px' }}>
            *
          </span>
        )}
      </label>

      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={!!error}
        aria-required={required}
        style={{
          padding: '16px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: `1px solid ${error ? 'var(--color-error-500)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          resize: 'vertical',
          transition: 'var(--transition-normal)',
          width: '100%',
          boxSizing: 'border-box',
          lineHeight: 'var(--leading-relaxed)',
        }}
        {...props}
      />

      {error && (
        <p
          role="alert"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-500)', margin: 0 }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. CARD
// ─────────────────────────────────────────────────────────────────────────────

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'glass' | 'dark';
  hoverable?: boolean;
  padding?: Size;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  padding = 'md',
  children,
  style,
  ...props
}) => {
  const paddingMap: Record<Size, string> = {
    sm: 'var(--space-4)',
    md: 'var(--space-8)',
    lg: 'var(--space-12)',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--bg-primary)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-md)',
    },
    featured: {
      background: 'var(--bg-primary)',
      border: '1px solid var(--color-gold-300)',
      boxShadow: 'var(--shadow-gold)',
    },
    glass: {
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-glass)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow-lg)',
    },
    dark: {
      background: 'var(--color-deep-sea-900)',
      border: '1px solid var(--color-deep-sea-700)',
      boxShadow: 'var(--shadow-deep-sea)',
      color: 'var(--color-pearl-100)',
    },
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-xl)',
        padding: paddingMap[padding],
        transition: hoverable ? 'var(--transition-normal)' : undefined,
        cursor: hoverable ? 'pointer' : undefined,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. BADGE
// ─────────────────────────────────────────────────────────────────────────────

interface BadgeProps {
  label: string;
  variant?: 'gold' | 'turquoise' | 'navy' | 'success' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'gold', size = 'md' }) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    gold:      { background: 'var(--color-gold-100)',      color: 'var(--color-gold-800)' },
    turquoise: { background: 'var(--color-turquoise-100)', color: 'var(--color-turquoise-800)' },
    navy:      { background: 'var(--color-deep-sea-100)',  color: 'var(--color-deep-sea-800)' },
    success:   { background: 'var(--color-success-100)',   color: 'var(--color-success-500)' },
    error:     { background: 'var(--color-error-100)',     color: 'var(--color-error-500)' },
    neutral:   { background: 'var(--color-obsidian-100)', color: 'var(--color-obsidian-600)' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)',
        fontFamily: 'var(--font-accent)',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-full)',
        fontWeight: 'var(--weight-medium)' as any,
        ...variantStyles[variant],
      }}
    >
      {label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. DIVIDER
// ─────────────────────────────────────────────────────────────────────────────

interface DividerProps {
  variant?: 'line' | 'gold' | 'ornamental';
  spacing?: 'sm' | 'md' | 'lg';
}

export const Divider: React.FC<DividerProps> = ({ variant = 'line', spacing = 'md' }) => {
  const spacingMap = { sm: '24px', md: '48px', lg: '80px' };

  if (variant === 'ornamental') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          margin: `${spacingMap[spacing]} 0`,
        }}
        aria-hidden="true"
      >
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span style={{ color: 'var(--color-gold-400)', fontSize: '18px' }}>✦</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>
    );
  }

  return (
    <hr
      style={{
        border: 'none',
        height: '1px',
        background: variant === 'gold' ? 'var(--color-gold-300)' : 'var(--border-subtle)',
        margin: `${spacingMap[spacing]} 0`,
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. MODAL
// ─────────────────────────────────────────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const maxWidths = { sm: '400px', md: '560px', lg: '720px', xl: '960px' };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    setTimeout(() => {
      const focusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)' as any,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--bg-overlay)',
          animation: 'klo-fade-in 250ms var(--ease-out) forwards',
        }}
      />

      {/* Panel */}
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: maxWidths[size],
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-2xl)',
          animation: 'modal-slide-up 400ms var(--ease-luxury) forwards',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {title && (
            <h2
              id="modal-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-light)' as any,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              fontSize: '20px',
              lineHeight: 1,
              padding: '8px',
              marginLeft: 'auto',
              transition: 'var(--transition-fast)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '32px' }}>{children}</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. CHARTER INQUIRY FORM
// ─────────────────────────────────────────────────────────────────────────────

interface CharterFormData {
  name: string;
  email: string;
  phone: string;
  departureDate: string;
  duration: string;
  guests: string;
  destination: string;
  message: string;
}

export const CharterInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<CharterFormData>({
    name: '',
    email: '',
    phone: '',
    departureDate: '',
    duration: '',
    guests: '',
    destination: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<CharterFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<CharterFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.email.trim()) newErrors.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.departureDate) newErrors.departureDate = 'Please select a departure date';
    if (!formData.guests) newErrors.guests = 'Please indicate the number of guests';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulated API call — replace with actual endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof CharterFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <Card variant="featured" padding="lg">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✦</div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-light)' as any,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            Your inquiry has been received.
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            A KLO charter specialist will be in touch within 24 hours to begin crafting
            your bespoke Caribbean voyage.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={handleChange('name')}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            autoComplete="email"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            hint="Including country code"
            autoComplete="tel"
          />
          <Input
            label="Preferred Destination"
            value={formData.destination}
            onChange={handleChange('destination')}
            hint="e.g. Grenadines, BVI, Martinique"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <Input
            label="Departure Date"
            type="date"
            required
            value={formData.departureDate}
            onChange={handleChange('departureDate')}
            error={errors.departureDate}
          />
          <Input
            label="Duration (days)"
            type="number"
            min="1"
            max="30"
            value={formData.duration}
            onChange={handleChange('duration')}
            hint="1–30 days"
          />
          <Input
            label="Number of Guests"
            type="number"
            min="1"
            max="20"
            required
            value={formData.guests}
            onChange={handleChange('guests')}
            error={errors.guests}
          />
        </div>

        <TextArea
          label="Special Requests & Notes"
          value={formData.message}
          onChange={handleChange('message')}
          rows={4}
          hint="Dietary requirements, special occasions, preferred activities…"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
        >
          {submitting ? 'Submitting…' : 'Request Charter'}
        </Button>

        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Your privacy is paramount. We never share your details with third parties.
        </p>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. VESSEL CARD
// ─────────────────────────────────────────────────────────────────────────────

interface VesselCardProps {
  name: string;
  type: string;
  length: string;
  capacity: number;
  imageUrl: string;
  pricePerDay: string;
  featured?: boolean;
  onInquire?: () => void;
}

export const VesselCard: React.FC<VesselCardProps> = ({
  name,
  type,
  length,
  capacity,
  imageUrl,
  pricePerDay,
  featured = false,
  onInquire,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: `1px solid ${featured ? 'var(--color-gold-300)' : 'var(--border-subtle)'}`,
        boxShadow: hovered
          ? featured ? 'var(--shadow-gold)' : 'var(--shadow-xl)'
          : featured ? 'var(--shadow-gold)' : 'var(--shadow-md)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'var(--transition-normal)',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={imageUrl}
          alt={`${name} — ${type}`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: `transform var(--duration-slower) var(--ease-luxury)`,
          }}
        />
        {featured && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <Badge label="Featured" variant="gold" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-8)' }}>
        <p
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-luxury)',
            textTransform: 'uppercase',
            color: 'var(--color-turquoise-600)',
            margin: '0 0 8px 0',
          }}
        >
          {type}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-light)' as any,
            color: 'var(--text-primary)',
            margin: '0 0 16px 0',
          }}
        >
          {name}
        </h3>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {[
            { label: 'Length', value: length },
            { label: 'Guests', value: `Up to ${capacity}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-accent)',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <Divider spacing="sm" />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'var(--space-6)',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                margin: '0 0 2px 0',
              }}
            >
              From
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                color: 'var(--text-accent)',
                margin: 0,
              }}
            >
              {pricePerDay}
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {' '}/ day
              </span>
            </p>
          </div>

          <Button variant={featured ? 'gold' : 'secondary'} size="sm" onClick={onInquire}>
            Inquire
          </Button>
        </div>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '640px' : undefined,
        margin: align === 'center' ? '0 auto' : undefined,
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-luxury)',
            textTransform: 'uppercase',
            color: 'var(--color-gold-500)',
            margin: '0 0 16px 0',
          }}
        >
          {eyebrow}
        </p>
      )}

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(var(--text-2xl), 5vw, var(--text-4xl))',
          fontWeight: 'var(--weight-light)' as any,
          lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-tight)',
          color: theme === 'dark' ? 'var(--color-pearl-100)' : 'var(--text-primary)',
          margin: '0 0 20px 0',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: 'var(--text-md)',
            lineHeight: 'var(--leading-relaxed)',
            color: theme === 'dark' ? 'var(--color-obsidian-300)' : 'var(--text-secondary)',
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
