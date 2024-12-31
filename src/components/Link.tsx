import Link from "next/link";
import React from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";

interface PrimLinkProps {
  className?: string;
  text?: string;
  href: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const PrimLink: React.FC<PrimLinkProps> = ({
  className,
  href,
  icon,
  children,
  text,
}) => {
  return (
    <Link href={href} className={`_link flex items-center hover:text-blue-700 w-fit ${className}`}>
      {children ?? text}
      <span>{icon || <LiaAngleDoubleRightSolid />}</span>
    </Link>
  );
};

export default PrimLink;
