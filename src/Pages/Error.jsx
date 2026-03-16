import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error  = useRouteError();
  const is404  = error?.status === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-base-200">
      <div className="text-8xl mb-6">{is404 ? '🐾' : '⚠️'}</div>
      <h1 className="text-6xl font-extrabold text-primary mb-3">
        {is404 ? '404' : 'Oops'}
      </h1>
      <h2 className="text-2xl font-bold mb-3">
        {is404 ? 'Page Not Found' : 'Something went wrong'}
      </h2>
      <p className="text-base-content/60 max-w-md mb-8">
        {is404
          ? 'This paw trail leads nowhere. The page you are looking for does not exist.'
          : 'An unexpected error occurred. Our team has been notified.'
        }
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link to="/">
          <button className="btn btn-primary">🏠 Go Home</button>
        </Link>
        <Link to="/explore">
          <button className="btn btn-outline">🔍 Explore Listings</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;