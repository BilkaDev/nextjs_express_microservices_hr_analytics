import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { CenteredLayout } from '@/client/components/uiElements/centeredLayout/CenteredLayout';
import { AppRoute } from '@/AppRoute';

export default async function localeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const authSession = cookies().get('session');

  if (authSession) redirect(AppRoute.dashboard);
  return <CenteredLayout>{children}</CenteredLayout>;
}
