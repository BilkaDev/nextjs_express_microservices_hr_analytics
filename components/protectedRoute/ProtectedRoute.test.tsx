import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';

import { render, screen } from 'tests';

import { tokenStorageKey } from '../../contex/tokenContext/TokenContextProvider';
import { server } from '../../tests/msw/server';

import { ProtectedRoute } from './ProtectedRoute';

describe('ProtectedRoute', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    queryClient.clear();
  });
  it('renders children on successful auth', async () => {
    localStorage.setItem(tokenStorageKey, 'test');
    render(<ProtectedRoute>test</ProtectedRoute>);

    const protectedElement = await screen.findByText(/test/);

    await expect(protectedElement).toBeInTheDocument();
  });

  it('renders children on fail auth', async () => {
    localStorage.setItem(tokenStorageKey, 'test');
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}/users/me`, (_req, res, ctx) =>
        res(ctx.status(401))
      )
    );
    render(
      <QueryClientProvider client={queryClient}>
        <ProtectedRoute>test</ProtectedRoute>
      </QueryClientProvider>
    );

    await expect(screen.findByText(/test/)).rejects.toBeTruthy();
  });
});
