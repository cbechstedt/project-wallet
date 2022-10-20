import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('Ao entrar na página /carteira', () => {
  test('testa se o email correto aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const senha = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, 'tryber@teste.com');
    userEvent.type(senha, 'abcdefg');
    userEvent.click(btn);

    const emailConfirmed = screen.getByText(/tryber@teste\.com/i);
    expect(emailConfirmed).toBeInTheDocument();
  });

  test('testa se o campo Valor é limpo após adicionar despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const inputValor = screen.getByTestId('value-input');
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputValor, '5');
    userEvent.click(btn);

    expect(inputValor.value).toBe('');
  });

  test('testa se o valor correto é adicionado à tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValor = screen.getByTestId('value-input');
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(inputValor, '5');
    userEvent.click(btn);

    const valor = await screen.findByText('5.00');
    expect(valor).toBeInTheDocument();
  });
});
