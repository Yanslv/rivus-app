import React, { useState } from 'react';
import { AppView } from '../types';
import { ensureAuthenticated } from '../services/supabaseService';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    
    try {
      // Criar sessão anônima (login temporário)
      const userId = await ensureAuthenticated();
      if (userId) {
        // Login bem-sucedido
        onLoginSuccess();
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-primary/10 border-2 border-primary/20 mb-4">
            <span className="material-symbols-outlined text-5xl text-primary">lock</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main">
            Bem-vindo ao
            <span className="block text-primary">RIVUS</span>
          </h1>
          <p className="text-muted text-lg">
            Faça login para começar sua jornada de desenvolvimento pessoal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-3xl p-8 shadow-xl space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-background rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isLoggingIn ? (
                <>
                  <div className="size-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  <span>Entrar Anonimamente</span>
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-2 text-muted">Ou</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                disabled
                className="w-full py-3 bg-surface border border-border text-text-main rounded-xl font-bold text-sm transition-all opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">mail</span>
                <span>Entrar com Email</span>
              </button>
              <button
                disabled
                className="w-full py-3 bg-surface border border-border text-text-main rounded-xl font-bold text-sm transition-all opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">account_circle</span>
                <span>Entrar com Google</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted text-center leading-relaxed">
              Por enquanto, você pode entrar sem criar conta. Sua jornada será salva automaticamente e você poderá acessá-la novamente.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-3 bg-surface border border-border hover:border-primary/50 text-text-main rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Voltar para Landing</span>
        </button>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-xs text-muted">
            Ao entrar, você concorda com nossos{' '}
            <a href="#" className="text-primary hover:underline">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
