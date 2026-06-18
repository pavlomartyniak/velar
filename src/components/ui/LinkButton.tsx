"use client";

import { Link } from "@/i18n/navigation";
import Button, { type ButtonProps } from "@mui/material/Button";

type LinkButtonProps = ButtonProps & { href: string };

/** MUI Button з навігацією next/link — придатний для використання в серверних компонентах. */
export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button component={Link} href={href} {...props} />;
}
