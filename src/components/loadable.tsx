import React from "react";
import HashLoader from "react-spinners/HashLoader";
export const Loadable = (Component: any) => (props: any) => (
  <React.Suspense fallback={<LoaderComponent />}>
    <Component {...props} />
  </React.Suspense>
);

export const MainLoader = (Component: any) => (props: any) => (
  <React.Suspense fallback={<MainLoaderComponent />}>
    <Component {...props} />
  </React.Suspense>
);

export const MainLoaderComponent = () => (
  <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
    <HashLoader color="#b249f8" size={60} speedMultiplier={2} />
  </div>
);
export const LoaderComponent = () => (
  <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
    <HashLoader color="#b249f8" size={60} speedMultiplier={2} />
  </div>
);

export default Loadable;
