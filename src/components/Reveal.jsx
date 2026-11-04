import { useInView } from '../lib/useInView';

export default function Reveal({ as: Tag = 'div', delay = 0, zoom = false, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${zoom ? 'reveal-zoom' : 'reveal'} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
