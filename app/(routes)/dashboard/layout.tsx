import React from 'react';
type ReadonlyChildren = Readonly<{ children: React.ReactNode }>;

const DashboardLayout = ({ children }: ReadonlyChildren) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
