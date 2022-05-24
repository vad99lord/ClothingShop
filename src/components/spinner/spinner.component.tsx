import { FC } from 'react';
import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const Spinner : FC = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;