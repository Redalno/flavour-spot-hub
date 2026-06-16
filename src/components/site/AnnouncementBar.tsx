import { useLanguage } from "@/i18n/LanguageProvider";

export function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-primary text-primary-foreground text-xs">
      <div className="container-rosanne flex h-9 items-center justify-center text-center tracking-wide">
        {t("announce.text")}
      </div>
    </div>
  );
}
