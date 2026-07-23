import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobRequestTable from '../component/jobRequests/JobRequestTable';
import JobRequestForm from '../component/jobRequests/JobRequestForm';

const JobRequests = () => {
  const location = useLocation();
  const [view, setView] = useState(location.state?.view || 'table'); // 'table' or 'form'

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
  }, [location.state]);

  return (
    <div className="h-full w-full">
      {view === 'table' ? (
        <JobRequestTable onCreateNew={() => setView('form')} />
      ) : (
        <JobRequestForm onCancel={() => setView('table')} />
      )}
    </div>
  );
};

export default JobRequests;
