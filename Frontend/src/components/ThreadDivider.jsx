export default function ThreadDivider({ variant = "gold" }) {
  const variantClass =
    variant === "oxblood"
      ? "thread-border--oxblood"
      : variant === "teal"
      ? "thread-border--teal"
      : "";
  return <div className={`thread-border ${variantClass}`} role="presentation" />;
}
