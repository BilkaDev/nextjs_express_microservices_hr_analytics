'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';

import { AppRoute } from '@/AppRoute';
import { useTranslate } from '@/contex/translations/useTranslate';

const Dashboard = () => {
  const translate = useTranslate();
  return <h1>Dashboard..</h1>;
};

export default Dashboard;
