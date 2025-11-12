import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface ErrorProps {
  title?: string;
  message: string;
  showHomeButton?: boolean;
  onRetry?: () => void;
}

export function Error({
  title,
  message,
  onRetry,
  showHomeButton = false,
}: ErrorProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const defaultTitle = title ?? t("error.title");

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-label={t("error.error")}
      className="flex flex-col items-center justify-center h-dvh gap-8 px-4"
    >
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="relative bg-surface-elevated rounded-full">
          <AlertCircle className="w-16 h-16 text-accent-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-text-primary text-3xl md:text-4xl font-bold">
            {defaultTitle}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
              aria-label={t("error.retry")}
            >
              <RefreshCw
                className={`w-5 h-5`}
              />
              {t("error.retry")}
            </button>
          )}
          {showHomeButton && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-surface-card hover:bg-surface-elevated text-text-primary border border-border-soft px-6 py-3 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
            >
              <Home className="w-5 h-5" />
              {t("error.goHome")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
