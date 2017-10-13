import * as React from 'react';
import { Route } from 'react-router-dom';

interface PropTypes {
  code: Number;
  children: Element;
}

const Status: React.SFC<PropTypes> = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code;
      }

      return children;
    }}
  />
);

Status.defaultProps = {
  code: 200
};
export default Status;
