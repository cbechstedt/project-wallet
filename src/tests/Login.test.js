import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Ao entrar na página Login', () => {
  test('testa se existem os campos de input email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const senha = screen.getByPlaceholderText(/senha/i);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('testa se ao clicar no botão Entrar, página é redirecionada para /carteira', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const senha = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, 'tryber@teste.com');
    userEvent.type(senha, 'abcdefg');
    userEvent.click(btn);
    const brl = screen.getByText(/brl/i);
    expect(brl).toBeInTheDocument();
  });
});
