import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const KEYS: TranslationKey[] = ["announce.1", "announce.2", "announce.3"];

export function AnnouncementBar() {
  const { t } = useLanguage();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % KEYS.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground text-xs">
      <div className="container-rosanne flex h-9 items-center justify-center gap-2 text-center tracking-wide overflow-hidden">
        <span className="inline-block h-1 w-1 rounded-full bg-clay" />
        <div className="relative h-4 overflow-hidden">
          {KEYS.map((k, idx) => (
            <div
              key={k}
              className="absolute inset-0 whitespace-nowrap transition-all duration-700"
              style={{
                transform: `translateY(${(idx - i) * 100}%)`,
                opacity: idx === i ? 1 : 0,
              }}
            >
              {t(k)}
            </div>
          ))}
          {/* sizing ghost */}
          <span className="invisible whitespace-nowrap">{t(KEYS[i])}</span>
        </div>
        <span className="inline-block h-1 w-1 rounded-full bg-clay" />
      </div>
    </div>
  );
}
