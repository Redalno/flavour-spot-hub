import type { ElementType, HTMLAttributes } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  delayMs?: number;
}

export function Reveal({ as: Tag = "div", delayMs = 0, className = "", style, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delayMs}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
