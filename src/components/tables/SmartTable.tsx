"use client";

import DeleteButton from "@/components/buttons/DelClearRemove";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FcAddColumn, FcAddRow } from "react-icons/fc";
import { RiDeleteColumn, RiDeleteRow } from "react-icons/ri";

/**
 * @param {*} importTable Data variable that holds imported data to this table.
 * @param {*} setExportTable Function that sets data on external variable.
 * @param readOnly Boolean value to lock/unlock table edit.
 * @returns
 */

interface TableData {
  headers: string[];
  body: string[][];
}

interface SmartTableProps {
  importTable?: TableData;
  setExportTable?: (data: TableData) => void;
}

export default function SmartTable({
  importTable = {
    headers: [],
    body: [],
  },
  setExportTable,
}: SmartTableProps) {
  const [tableData, setTableData] = useState<TableData>(importTable);
  const isTable = () => {
    return tableData?.headers?.length > 0;
  };

  //Table-----------------------------------------
  const handleDeleteTable = async () => {
    //Empty headers mean no table
    setTableData(() => ({
      body: [],
      headers: [],
    }));
  };
  const handleCreateTable = () => {
    //Empty headers mean no table
    setTableData(() => ({
      body: [["", "", "", ""]],
      headers: ["Name", "Age", "Contact", "Gender"],
    }));
  };

  //Column-----------------------------------------
  const handleAddCol = () => {
    setTableData((prev) => {
      return {
        ...prev,
        headers: [...prev.headers, "col" + (prev.headers.length + 1)],
        body: [...prev.body.map((row) => [...row, ""])],
      };
    });
  };

  const handleRenameCol = (colIndex: number, newValue: string) => {
    setTableData((prevState) => ({
      ...prevState,
      headers: prevState.headers.map((oldValue, valIndex) => {
        if (valIndex === colIndex) return newValue;
        return oldValue;
      }),
    }));
  };

  //Row----------------------------------------------------
  const handleAddRow = () => {
    setTableData((prev) => ({
      ...prev,
      body: [...prev.body, [...prev.headers.map((h) => "")]],
    }));
  };

  // OnChangeEvent
  const handleOnChangeBody = (
    rowIndex: number,
    itemIndex: number,
    newValue: string
  ) => {
    setTableData((prev) => ({
      ...prev,
      body: prev.body.map((row, curRowIndex) => {
        if (curRowIndex !== rowIndex) return row;
        return row.map((rData, rdIndex) => {
          if (rdIndex !== itemIndex) return rData;
          return newValue;
        });
      }),
    }));
  };

  //Export table data
  useEffect(() => {
    if (typeof setExportTable === "function") {
      setExportTable(tableData);
    }
  }, [tableData]);

  return (
    <>
      <button
        type="button"
        onClick={handleCreateTable}
        title="Create new table"
        className={`text-3xl font-extralight text-teal-300 flex gap-1 items-center ${
          isTable() ? " hidden" : ""
        }`}
      >
        <FaPlus className="max-sm:hidden" />
        <span className="text-sm">Create Table</span>
      </button>
      <div className="max-w-full overflow-auto">
        <div className="flex items-center justify-center gap-2 w-fit my-2 bg-[#7e7a7a] text-teal-100 px-2 drop-shadow-md">
          <button
            type="button"
            onClick={handleAddCol}
            title="Add row"
            className={` text-xs gap-2 rounded px-1 shadow hover:bg-gray-700 my-1 ${
              isTable() ? " flex" : "hidden"
            }`}
          >
            <FcAddColumn className="max-sm:hidden" /> Add col
          </button>
          <button
            type="button"
            onClick={handleAddRow}
            title="Add row"
            className={` text-xs gap-2 rounded px-1 shadow hover:bg-gray-700 my-1 ${
              isTable() ? " flex" : "hidden"
            }`}
          >
            <FcAddRow className="max-sm:hidden" /> Add row
          </button>
          <DeleteButton
            className={`prim__delete__btn h-fit flex items-center gap-2 text-xs text-red-300 ${
              isTable() ? " " : "hidden"
            }`}
            buttonText="Delete table"
            handleDelete={handleDeleteTable}
          />
        </div>

        <div
          className={`w-full overflow-auto ${isTable() ? "block" : "hidden"}`}
        >
          {
            <table className="  text-sm">
              <tbody>
                <tr className="relative bg-slate-100">
                  <th className=" sticky left-0 z-10 bg-slate-50">S/N</th>
                  {tableData?.headers?.map((colName, colIndex) => (
                    <th
                      key={colIndex}
                      className="border focus-within:ring sticky top-0 "
                    >
                      <DeleteCol
                        colIndex={colIndex}
                        setTableData={setTableData}
                      />
                      <input
                        onChange={(e) =>
                          handleRenameCol(colIndex, e.target.value)
                        }
                        className="w-20 p-2 outline-none"
                        type="text"
                        value={colName}
                      />
                    </th>
                  ))}
                </tr>
                {tableData?.body?.map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="shadow bg-gray-50 group text-xs min-w-[40px] p-1 sticky left-0">
                      {rowIndex + 1}
                      <DeleteRow
                        rowToRemoveIndex={rowIndex}
                        setTableData={setTableData}
                      />
                    </td>
                    {rowData.map((colValue, colIndex) => (
                      <td
                        key={colIndex}
                        className="border outline-[1px] focus-within:outline"
                      >
                        <input
                          onChange={(e) =>
                            handleOnChangeBody(
                              rowIndex,
                              colIndex,
                              e.target.value
                            )
                          }
                          className="w-20 p-1 outline-none"
                          type="text"
                          value={colValue}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
}

export function DeleteCol({ colIndex, setTableData }: { colIndex: number; setTableData: React.Dispatch<React.SetStateAction<TableData>> }) {
  const handleDeleteCol = () => {
    setTableData((prev) => {
      const body = [];
      for (let row of prev.body) {
        let newRow = row.filter((_, rcIndex) => rcIndex !== colIndex);
        body.push(newRow);
      }
      return {
        headers: prev.headers.filter((_, hIndex) => hIndex !== colIndex),
        body: body,
      };
    });
  };

  return (
    <div className=" divide-x-2 text-lg group flex justify-around">
      <span className="flex text-xs">C {colIndex + 1}</span>
      <button
        type="button"
        onClick={handleDeleteCol}
        title="Delete column"
        className="hidden text-xs remove__btn  group-hover:block transition-transform delay-300 duration-300"
      >
        <RiDeleteColumn />
      </button>
    </div>
  );
}
export function DeleteRow({ rowToRemoveIndex, setTableData }: { rowToRemoveIndex: number; setTableData: React.Dispatch<React.SetStateAction<TableData>> }) {
  const handleDeleteCol = () => {
    setTableData((prev) => ({
      ...prev,
      body: prev.body.filter((_, rIndex) => rIndex !== rowToRemoveIndex),
    }));
  };
  return (
    <div className="divide-y-2 absolute right-[2px] top-0 text-lg hidden group-hover:block transition-transform delay-300 duration-300">
      <button type="button" onClick={handleDeleteCol} title="Delete row">
        <RiDeleteRow
          size={14}
          className="text-red-400 p-[2px] rounded shadow hover:bg-orange-300"
        />
      </button>
    </div>
  );
}
