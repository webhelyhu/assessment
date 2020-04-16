import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import UserItem from './UserItem';
import { useTable, usePagination } from 'react-table'
import { getUsers } from '../../actions/user';

const Usersgrid = ({ getUsers, user: { users, loading } }) => {
  console.log("Usersgrid. Users are: ", users.length, "  loading is:", loading)
  //
  // building for react-table
  // data needs to be defined by React.useMemo
  const data = useMemo(() => [...users], [users])
  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'first_name', // accessor is the "key" in the data
    },
    {
      Header: 'Last Name',
      accessor: 'last_name', // accessor is the "key" in the data
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ], [])

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
    state: { pageIndex, pageSize, sortBy, filters }
  } = useTable({ columns, data, initialState: { pageSize: 10 } }, usePagination)

  const refreshUsers = () => {
    console.log("refreshing users list.")
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, [getUsers, pageIndex, pageSize, sortBy, filters]);


  console.log('returning.')
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <h1 className='large text-primary'>Users</h1>
            <p className='lead'>
              <i className='fab fa-users' /> See the list of users
          </p>
            <div className='profiles'>  {/* fixme  pagination*/}

              <button onClick={refreshUsers}>Refresh users</button>

              {users.length > 0 ? (
                <>
                  <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map(row => {
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                          </tr>
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
                </>

              ) : (
                  <h4>No users found...</h4>
                )}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

Usersgrid.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Usersgrid);
