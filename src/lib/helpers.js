import React from "react";
import {Route} from "react-router-dom";
import {css} from "styled-components";
import qs from "qs";

export const dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const media = Object.entries(dimensionMap).reduce(
  (accumulate, [key, value]) => (
    Object.assign(accumulate, {
      [key]: (...args) => (
        css`
          @media (max-width: ${value}) {
            ${css(...args)}
          }
        `
      ),
    })
  ),
  {},
);

export const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export const fillField = {
  labelCol: {
    xs: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

export const formHasError = fieldsError => fieldsError.some(field => field.errors.length);

export const getQuery = (location) => qs.parse((location.search || "").substring(1), {allowDots: true}) || {};
