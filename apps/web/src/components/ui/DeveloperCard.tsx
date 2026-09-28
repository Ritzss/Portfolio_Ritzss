"use client";

import type { ReactNode } from "react";

export interface DeveloperCardItem {
  number?: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

interface DeveloperCardProps {
  label: string;
  title: string;
  subtitle?: string;
  items?: DeveloperCardItem[];
  accentColor?: string;
}

export default function DeveloperCard({
  label,
  title,
  subtitle,
  items = [],
  accentColor = "#F97316",
}: DeveloperCardProps) {
  return (
    <>
      <div className="developer-card" style={{ "--accent": accentColor } as React.CSSProperties}>
        <div className="developer-card__dots">
          <span className="developer-card__dot developer-card__dot--red" />
          <span className="developer-card__dot developer-card__dot--yellow" />
          <span className="developer-card__dot developer-card__dot--green" />
        </div>

        <div className="developer-card__content">
          <span className="developer-card__label">{label}</span>

          <h3>{title}</h3>

          {subtitle && <p className="developer-card__subtitle">{subtitle}</p>}

          {items.length > 0 && (
            <div className="developer-card__details">
              {items.map((item) => (
                <div key={`${item.number}-${item.title}`} className="developer-card__item">
                  {item.number && <span className="developer-card__number">{item.number}</span>}

                  {item.icon && <span className="developer-card__icon">{item.icon}</span>}

                  <div>
                    <span className="developer-card__item-title">{item.title}</span>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .developer-card {
          --accent: #f97316;
          position: relative;
          width: 100%;
          max-width: 420px;
          min-height: 240px;
          padding: 10px;
          overflow: hidden;
          color: #fff;
          background: rgba(198, 198, 198, 0.08);
          border-radius: 12px;
          border-bottom: 3px solid rgba(255, 255, 255, 0.18);
          border-left: 2px outset rgba(255, 255, 255, 0.22);
          box-shadow: -30px 40px 30px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(8px);
          transform: skewX(4deg);
          transition: min-height 0.5s ease, transform 0.5s ease, background 0.5s ease;
        }

        .developer-card:hover {
          min-height: 430px;
          transform: skewX(0deg);
          background: rgba(198, 198, 198, 0.12);
        }

        .developer-card__dots {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 14px;
        }

        .developer-card__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .developer-card__dot--red {
          background: #ff5f57;
        }

        .developer-card__dot--yellow {
          background: #febc2e;
        }

        .developer-card__dot--green {
          background: #28c840;
        }

        .developer-card__content {
          padding: 22px 18px;
        }

        .developer-card__label {
          display: block;
          margin-bottom: 14px;
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
        }

        .developer-card h3 {
          margin: 0;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          text-transform: uppercase;
        }

        .developer-card__subtitle {
          margin: 7px 0 0;
          color: var(--accent);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .developer-card__details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 28px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
        }

        .developer-card:hover .developer-card__details {
          opacity: 1;
          transform: translateY(0);
        }

        .developer-card__item {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
        }

        .developer-card__number {
          color: var(--accent);
          font-family: monospace;
          font-size: 9px;
        }

        .developer-card__icon {
          color: var(--accent);
        }

        .developer-card__item-title {
          display: block;
          color: #e4e4e7;
          font-size: 13px;
          font-weight: 600;
        }

        .developer-card__item p {
          margin: 4px 0 0;
          color: #71717a;
          font-size: 11px;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .developer-card {
            transform: none;
          }

          .developer-card:hover {
            transform: none;
          }

          .developer-card__details {
            opacity: 1;
            transform: none;
          }

          .developer-card {
            min-height: 0;
          }

          .developer-card:hover {
            min-height: 0;
          }
        }
      `}</style>
    </>
  );
}