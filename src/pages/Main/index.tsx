import React from 'react';
import { useEffect } from 'react';
import useGetToken from '../../hooks/api/service/useGetToken';
import useLogger from '../..//hooks/useLogger';
import useCsrfToken from '../../hooks/useCsrfToken';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  const [, setCsrfToken] = useCsrfToken(); 
  const getToken = useGetToken();
  const logger = useLogger();

  useEffect(() => {
    (async () => {
      const res = await getToken();
      const data = res.data.data;  
      logger.bgGreen('data:', data);
      setCsrfToken(data.csrfToken ?? '');
    })();
  }, [
    logger,
    getToken,
    setCsrfToken,
  ]);

  return (
    <div className="main-layout">
      <Link to="/csrf">Go to Csrf</Link>
      <p>this is main</p>
    </div>
  );
}

export default Main;