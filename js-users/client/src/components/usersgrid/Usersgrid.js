import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import UserItem from './UserItem';
import { useTable } from 'react-table'
import { getUsers } from '../../actions/user';

const Usersgrid = ({ getUsers, user: { users, loading } }) => {
  //
  // building for react-table
  // data needs to be defined by React.useMemo

  console.log("Users are: ", users.length, "  loading is:", loading)

  const data = useMemo(() => [...users
    // {
    //   col_firstname: "Egyes",
    //   col_lastname: "Elemér",
    //   col_createdat: "333",
    //   col_status: "active"
    // },
    // {
    //   col_firstname: "Egyes",
    //   col_lastname: "Elemér",
    //   col_createdat: "333",
    //   col_status: "active"
    // }
  ], [users])

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
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy, filters }
  } = useTable({ columns, data })

  const refreshUsers = () => {
    console.log("refreshing users list.")
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, [getUsers, pageIndex, pageSize, sortBy, filters]);



  console.log('useTable done.')

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
                    {rows.map(row => {
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
