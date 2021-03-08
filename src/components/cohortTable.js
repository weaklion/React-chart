import { useMemo,Fragment } from "react";
import { useTable, usePagination, useSortBy, useFilters, useExpanded } from "react-table";
import { DefaultColumnFilter } from "../utils/filter";


const CohortTable = ({ columns : userColumns, data, renderRowSubComponent }) => {

  const defaultColumn = useMemo( () => ({
    Filter : DefaultColumnFilter
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state : { pageIndex, pageSize },
  } = useTable ({
    columns : userColumns,
    data,
    defaultColumn,
    initialState : { pageIndex : 0 },
  },
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
  );


  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''
                    }
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Fragment {...row.getRowProps} key={i}>
                <tr>
                  {row.cells.map(cell => {
                    return (
                      <td 
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                    
                      {renderRowSubComponent(row.original)}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button> {' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          {pageIndex + 1} of {pageOptions.length} 
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>

  )
}

export default CohortTable;