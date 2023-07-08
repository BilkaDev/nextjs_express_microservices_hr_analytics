import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from 'tests/msw/server';
import { render, screen } from 'tests';

import { AppRoute } from '../../AppRoute';

import { SignIn } from './page';

const mockNavigation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigation
}));

describe('SignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders emailField', () => {
    render(<SignIn />);

    const emailField = screen.getByLabelText(/Email/);

    expect(emailField).toBeInTheDocument();
  });

  it('renders passwordField', () => {
    render(<SignIn />);

    const passwordField = screen.getByLabelText(/Password/);

    expect(passwordField).toBeInTheDocument();
  });

  it('redirects to home on login', async () => {
    render(<SignIn />);
    const emailField = screen.getByLabelText(/Email/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, '123456');
    await userEvent.click(submitButton);

    expect(mockNavigation).toHaveBeenCalled();
    expect(mockNavigation).toHaveBeenCalledWith(AppRoute.dashboard);
  });

  it('doesnt redirect on error', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        async (_req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<SignIn />);
    const emailField = screen.getByLabelText(/Email/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, '123456');
    await userEvent.click(submitButton);

    expect(mockNavigation).not.toHaveBeenCalled();
  });

  it('shows error message', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL}/app/auth/login`,
        async (_req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<SignIn />);
    const emailField = screen.getByLabelText(/Email/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, 'password123');
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      /Something went wrong. Please try again./
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
