import { cn } from "@/lib/utils";

export const Logo = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground h-8 w-auto", className)}
    >
      {/* Logo Icon - Spike + Flow */}
      <path
        d="M8 32L14 12L20 28L26 8L32 24L38 16"
        stroke={uniColor ? "currentColor" : "url(#logo-gradient)"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Text - Spikeflow */}
      <text
        x="50"
        y="28"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        spike
        <tspan fill={uniColor ? "currentColor" : "url(#logo-gradient)"}>
          flow
        </tspan>
      </text>

      <defs>
        <linearGradient
          id="logo-gradient"
          x1="8"
          y1="8"
          x2="38"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCD34D" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoIcon = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
    >
      {/* Spike + Flow Icon */}
      <path
        d="M6 32L12 12L18 28L24 8L30 24L36 16"
        stroke={uniColor ? "currentColor" : "url(#icon-gradient)"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient
          id="icon-gradient"
          x1="6"
          y1="8"
          x2="36"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCD34D" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-10 w-10", className)}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated wave pattern */}
      <path
        d="M5 35L11 15L17 31L23 11L29 27L35 19L41 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M5 35L11 15L17 31L23 11L29 27L35 19"
        stroke="url(#stroke-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient
          id="stroke-gradient"
          x1="5"
          y1="11"
          x2="35"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCD34D" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
