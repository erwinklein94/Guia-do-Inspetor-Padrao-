(function () {
  let client = null;

  const getEl = (id) => document.getElementById(id);

  function setMessage(message, type) {
    const box = getEl('auth-main-message');
    if (!box) return;
    box.textContent = message || '';
    box.classList.remove('error', 'success');
    if (type) box.classList.add(type);
  }

  function unlock() {
    getEl('auth-gate')?.classList.add('auth-hidden');
    getEl('main-layout')?.classList.remove('auth-locked');
  }

  function lock(message, type) {
    getEl('auth-gate')?.classList.remove('auth-hidden');
    getEl('main-layout')?.classList.add('auth-locked');
    setMessage(message, type);
  }

  function setupClient() {
    const cfg = window.SUPABASE_CONFIG || {};
    const url = cfg.url;
    const key = cfg.publishableKey || cfg.anonKey;

    if (!window.supabase?.createClient) {
      throw new Error('Biblioteca Supabase não carregou.');
    }
    if (!url || !key || url.includes('COLE_AQUI') || key.includes('COLE_AQUI')) {
      throw new Error('Configure o arquivo supabase-config.js com o Project URL e a Publishable/anon key.');
    }

    client = window.supabase.createClient(url, key);
    window.guiaSupabaseClient = client;
  }

  async function validateProfile(user) {
    const { data, error } = await client
      .from('profiles')
      .select('id,nome,email,perfil,ativo')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Usuário autenticado, mas sem profile. Rode o SQL de schema ou crie o profile.');
    if (!data.ativo) throw new Error('Usuário desativado.');
    window.guiaUserProfile = data;
    return data;
  }

  async function restoreSession() {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (!data?.session?.user) {
      lock('Informe e-mail e senha para acessar.', null);
      return;
    }
    await validateProfile(data.session.user);
    unlock();
  }

  async function handleLogin(event) {
    event.preventDefault();
    const btn = getEl('auth-main-btn');
    const email = getEl('auth-main-email')?.value.trim();
    const password = getEl('auth-main-password')?.value;

    if (!email || !password) {
      setMessage('Preencha e-mail e senha.', 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Entrando...';
    setMessage('Validando acesso...', null);

    try {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await validateProfile(data.user);
      setMessage('Acesso liberado.', 'success');
      unlock();
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Falha no login.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  }

  function clearAuthStorage() {
    const appKeys = [
      'rumoInspeccaoDados',
      'rumo_flashcards_quality_registration_v1',
      'rumo_flashcards_quality_progress_v1'
    ];

    appKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    const shouldRemoveKey = (key) => {
      const normalized = String(key || '').toLowerCase();
      return (
        normalized.startsWith('sb-') ||
        normalized.includes('supabase') ||
        normalized.includes('auth-token') ||
        normalized.includes('owegcqrlxbdjhkfxprfx')
      );
    };

    [localStorage, sessionStorage].forEach((storage) => {
      Object.keys(storage).forEach((key) => {
        if (shouldRemoveKey(key)) storage.removeItem(key);
      });
    });
  }

  window.guiaAuthLogout = async function guiaAuthLogout() {
    if (!confirm('Deseja realmente sair e encerrar a sessão neste navegador?')) return;

    setMessage('Encerrando sessão...', null);

    try {
      if (!client) setupClient();
      if (client) {
        const { error } = await client.auth.signOut({ scope: 'global' });
        if (error) throw error;
      }
    } catch (error) {
      console.warn('Falha ao encerrar sessão no servidor. Limpando sessão local mesmo assim.', error);
    } finally {
      window.guiaUserProfile = null;
      clearAuthStorage();
      lock('Sessão encerrada. Entre novamente para acessar.', 'success');
      getEl('auth-main-password') && (getEl('auth-main-password').value = '');
      const cleanUrl = `${window.location.origin}${window.location.pathname}`;
      window.location.replace(`${cleanUrl}?logout=${Date.now()}`);
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    getEl('auth-main-form')?.addEventListener('submit', handleLogin);
    try {
      setupClient();
      await restoreSession();
    } catch (error) {
      console.error(error);
      lock(error.message || 'Erro ao iniciar Supabase Auth.', 'error');
    }
  });
})();
