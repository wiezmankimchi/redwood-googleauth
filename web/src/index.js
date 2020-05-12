import ReactDOM from 'react-dom';
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import {
  GoogleAuthProvider,
  useGoogleAuth,
} from 'src/contexts/GoogleAuthContext';

import Routes from 'src/Routes';

import 'src/styles/index.scss';

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <GoogleAuthProvider>
      <RedwoodProvider useAuth={useGoogleAuth}>
        <Routes />
      </RedwoodProvider>
    </GoogleAuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
);
