"use client";

import { setMultiSearchParams } from "@/lib/searchParams";
import { useRouter } from "next/navigation";
import { Button } from "./buttons/SubmitAndClick";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

export interface IPagination {
  page: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
interface PaginationProps {
  pagination: IPagination;
  className?: string;
  buttonStyles?: string;
}

export const PaginationCP = ({
  pagination,
  className = "",
  buttonStyles = "",
}: PaginationProps) => {
  const router = useRouter();
  const handlePrevious = () => {
    const pp = pagination.page - 1;
    console.log({ pp });
    if (pp > 0) {
      setMultiSearchParams({ page: String(pp), limit: "10" }, router);
    }
  };

  const handleNext = () => {
    const np = pagination.page + 1;
    console.log({ np });
    if (np < pagination.total) {
      setMultiSearchParams({ page: String(np), limit: "10" }, router);
    }
  };

  if (!pagination?.total) return null;

  return (
    <div
      className={`flex justify-between items-center w-fit gap-4 px-1 py-2 mx-auto ${className}`}
    >
      <Button
        primaryText=""
        disabled={!pagination?.hasPreviousPage}
        className={`flex items-center p-1 hover:text-gray-900 hover:bg-slate-200 slowTrans disabled:text-slate-400 disabled:hover:text-slate-400 ${buttonStyles}`}
        handleClickEvent={handlePrevious}
      >
        <LiaAngleLeftSolid />
      </Button>

      <div className="flex items-center justify-center min-w-0">
        {`${pagination?.page}/${pagination?.totalPages}`}
      </div>

      <Button
        primaryText=""
        disabled={!pagination?.hasNextPage}
        className={`flex items-center p-1 hover:text-gray-900 hover:bg-slate-200 slowTrans disabled:text-slate-400 disabled:hover:text-slate-400 ${buttonStyles}`}
        handleClickEvent={handleNext}
      >
        <LiaAngleRightSolid />
      </Button>
    </div>
  );
};

export const _pagination: IPagination = {
  page: 1,
  total: 10,
  totalPages: 3,
  hasNextPage: true,
  hasPreviousPage: true,
};
