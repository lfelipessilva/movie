import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { SearchInput } from "../../search-input";
import { LanguageSwitcher } from "../../language-switcher";

export function Header() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
      <section className="flex w-full items-center justify-between sm:justify-start  gap-8">
        <img src="/logo.svg" alt="Movie" className="w-10 h-10" />
        <nav aria-label={t("nav.ariaLabel")}>
          <ul className="flex gap-4">
            <li>
              <Link
                to="/"
                className={`text-lg sm:text-2xl font-bold hover:opacity-80 ${
                  pathname === "/" ? "text-accent-primary" : "text-text-primary"
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className={`text-lg sm:text-2xl font-bold hover:opacity-80 ${
                  pathname === "/favorites"
                    ? "text-accent-primary"
                    : "text-text-primary"
                }`}
                aria-current={pathname === "/favorites" ? "page" : undefined}
              >
                {t("nav.favorites")}
              </Link>
            </li>
          </ul>
        </nav>
        <LanguageSwitcher />
      </section>
      <SearchInput pathname={pathname} />
    </header>
  );
}
