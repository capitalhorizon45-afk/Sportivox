import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  type?: "generic" | "network" | "empty";
  className?: string;
}

export default function ErrorState({
  title,
  message,
  onRetry,
  type = "generic",
  className,
}: ErrorStateProps) {
  const config = {
    generic: {
      icon: AlertCircle,
      defaultTitle: "Something went wrong",
      defaultMessage:
        "We couldn't load this content. This might be due to a missing API key.",
      iconColor: "text-red-400",
      iconBg: "bg-red-400/10",
    },
    network: {
      icon: WifiOff,
      defaultTitle: "Connection issue",
      defaultMessage:
        "Check your internet connection and try again.",
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
    },
    empty: {
      icon: AlertCircle,
      defaultTitle: "No data found",
      defaultMessage: "There's nothing here yet. Check back later.",
      iconColor: "text-muted",
      iconBg: "bg-surface-alt",
    },
  };

  const { icon: Icon, defaultTitle, defaultMessage, iconColor, iconBg } =
    config[type];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        className
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
          iconBg
        )}
      >
        <Icon className={cn("w-7 h-7", iconColor)} />
      </div>
      <h3 className="text-white font-semibold text-base mb-1.5">
        {title ?? defaultTitle}
      </h3>
      <p className="text-muted text-sm max-w-xs leading-relaxed">
        {message ?? defaultMessage}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 flex items-center gap-2 px-4 py-2 bg-surface-alt border border-border rounded-xl text-sm font-medium text-white hover:border-primary/40 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
}

export function ApiKeyNotice({ service }: { service: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl">
      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-yellow-400">
          API key not configured
        </p>
        <p className="text-xs text-muted mt-0.5">
          Add your <strong>{service}</strong> key to{" "}
          <code className="px-1 py-0.5 bg-surface-alt rounded text-primary text-[11px]">
            .env.local
          </code>{" "}
          to enable live data.
        </p>
      </div>
    </div>
  );
}
