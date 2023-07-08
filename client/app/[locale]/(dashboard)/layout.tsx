import { AppRoute } from '@/AppRoute';
import { buildClient } from '@/api/axios';
import {
  PROFILE_URL,
  Profile,
  ProfileAuthResponse
} from '@/api/request/profile';
import { DashboardLayout } from '@/components/dashboardLayout/DashboardLayout';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function localeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookie = headers().get('cookie');
  const host = headers().get('host');

  let currentUser: Profile | null;
  try {
    const { data } = await buildClient({
      host,
      cookie
    }).get<ProfileAuthResponse>(PROFILE_URL);
    currentUser = data.currentUser;
  } catch (error) {
    currentUser = null;
  }

  if (!currentUser) redirect(AppRoute.home);

  return <DashboardLayout profile={currentUser}>{children}</DashboardLayout>;
}
