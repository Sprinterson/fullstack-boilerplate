// app/root.tsx
import React from 'react';
import { Outlet } from '@remix-run/react';

import '../styles/tailwind.css';
import Layout from './components/layout/Layout';

export default function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
