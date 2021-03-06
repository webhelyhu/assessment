import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table'
import { getUsers, updateUserStatus } from '../../actions/user'
import matchSorter from 'match-sorter'   // react-table is using it for global filter
import moment from 'moment'

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <span className="global-filter">
      Filter the table:{' '}
      <input
        className="global-filter-input"
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
      />
    </span>
  )
}


const UsersTable = function ({ getUsers, updateUserStatus, user: { users, loading } }) {


  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val


  const FirstNameDisplay = (values) => {
    // the user id is: values.values.row.original.id
    const editLink = `/edit/${values.values.row.original.id}`
    // return '<a href="/users/' + values.values.row.original.id + '">' + values.values.cell.value + '</a>'
    return (
      <a href={editLink}>
        {values.values.cell.value}
      </a>
    )
  }


  const DateDisplay = (values) => {
    return (
      <span>
        {moment(values.values.cell.value).format('YYYY-MM-DD HH:ss Z')}
      </span>
    )
  }

  const StatusDisplay = (values) => {
    // displaying icon instead of "active" and "locked"
    const id = values.values.row.original.id
    const currentStatus = values.values.cell.value
    const newStatus = currentStatus === 'active' ? 'locked' : 'active'
    return (
      <span onClick={() => updateUserStatus({ id, status: newStatus })}>
        {(currentStatus === 'active' ?
          (<img className="user-status" alt="active user" src="/user-check.png" />)
          : (<img className="user-status" alt="locked user" src="/user-denied.png" />))}
      </span>
    )
  }


  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'first_name',
      Cell: cellInfo => <FirstNameDisplay values={cellInfo} />
    },
    {
      Header: 'Last Name',
      accessor: 'last_name' // accessor is the "key" in the data
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
      Cell: cellInfo => <DateDisplay values={cellInfo} />
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: cellInfo => <StatusDisplay values={cellInfo} />
    },
  ], [])

  const data = useMemo(() => [...users], [users])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    // state: { pageIndex, pageSize, sortBy, filters, globalFilter },
    // visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 10 },
    filterTypes
  },
    useGlobalFilter,
    useSortBy,
    usePagination)

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (

          <div className="user-table">
            {users.length < 1 && <h4>No users found...</h4>}

            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />

            <table {...getTableProps()} id="main-table" className="greenTable">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ' ↕️'}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} className={`status-${row.cells[3].value}`}>
                      {
                        row.cells.map(cell => {
                          return <td {...cell.getCellProps()} className={`data-${cell.column.id}`}>{cell.render('Cell')}</td>
                        })
                      }
                    </tr>
                  )
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="4">
                    <div className="pagination">
                      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                      </button>{' '}
                      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                      </button>{' '}
                      <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                      </button>{' '}
                      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                      </button>{' '}
                      <span>
                        Page{' '}
                        <strong>
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                      </span>
                      <span>
                        | Go to page:{' '}
                        <input
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                          }}
                          style={{ width: '100px' }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      }
    </Fragment>
  )
}


UsersTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers, updateUserStatus }
)(UsersTable);
