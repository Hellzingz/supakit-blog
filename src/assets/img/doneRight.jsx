
export const DoneRight = ({width = 32, height = 28, className = "", color = "green"}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 19L10.2331 24.4248C10.6618 24.7463 11.2677 24.6728 11.607 24.2581L29 3"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};
