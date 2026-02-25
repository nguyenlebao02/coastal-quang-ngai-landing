import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'outline';

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type AsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = AsButton | AsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-cta-orange text-white font-semibold hover:brightness-110 shadow-md hover:shadow-lg',
  outline:
    'bg-transparent border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white',
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-block px-8 py-3 text-sm font-heading uppercase tracking-wider transition-all duration-200 text-center rounded';
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...rest } = props as AsLink;
    return <a href={href} className={styles} {...rest} />;
  }

  return <button className={styles} {...(props as AsButton)} />;
}
