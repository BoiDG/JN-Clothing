import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


const AppPagination = ({page,curr,setCurr}) => {
  return (
  <div style={{width :'100%',display:'flex',justifyContent:'center',marginTop:'3em'}}>
    <Pagination style={{
        margin:'auto',display:'flex',justifyContent:'center'
        }} count={page} onChange={(e)=>setCurr(e.target.textContent)} />
  </div>)
};

export default AppPagination;