const variants = {
  primary:   'badge-primary',
  secondary: 'badge-secondary',
  success:   'badge-success',
  error:     'badge-error',
  warning:   'badge-warning',
  info:      'badge-info',
  ghost:     'badge-ghost',
};

const Badge = ({ children, variant = 'primary', className = '' }) => (
  <span className={`badge ${variants[variant]} ${className}`}>
    {children}
  </span>
);

export default Badge;