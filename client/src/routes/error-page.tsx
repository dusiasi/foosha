import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './error-page.css';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.data}</i>
      </p>
    </div>
  );
}
