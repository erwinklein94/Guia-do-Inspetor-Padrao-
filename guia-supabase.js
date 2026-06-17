/* =========================================================
   GUIA DO INSPETOR PADRÃO — Camada Supabase (perfis + auditoria)
   Carregado DEPOIS do script principal do index.html.
   Depende de window.guiaSupabaseClient e window.guiaUserProfile
   (definidos em auth-main.js).

   Perfis:
     admin    -> página de Auditoria (todos os laudos + fotos)
     fiscal   -> emite laudo e tira foto; NÃO vê Auditoria
     consulta -> só consulta e compara medidas; sem laudo/foto
     editor   -> gerencia conteúdo; no campo, igual a consulta
   ========================================================= */
(function () {
  'use strict';

  var BUCKET = 'evidencias';
  var ultimaInspecaoId = null;     // id do laudo recém-enviado (para anexar foto)
  var ultimaFotoEnviada = '';      // evita upload duplicado da mesma foto
  var audCache = [];               // cache dos laudos carregados na Auditoria

  function client() { return window.guiaSupabaseClient || null; }
  function perfilObj() { return window.guiaUserProfile || null; }
  function perfil() { return (perfilObj() && perfilObj().perfil) || 'consulta'; }
  function podeEmitir() { return perfil() === 'admin' || perfil() === 'fiscal'; }
  function ehAdmin() { return perfil() === 'admin'; }

  // ---------------------------------------------------------
  // 1) Aplica as permissões do perfil na interface
  // ---------------------------------------------------------
  function aplicarPermissoesPerfil() {
    var p = perfil();
    document.body.classList.remove('role-admin', 'role-editor', 'role-fiscal', 'role-consulta');
    document.body.classList.add('role-' + p);

    // Preenche "Responsável" com o nome do perfil (fiscal/admin)
    var resp = document.getElementById('meta-responsavel');
    if (resp && podeEmitir() && perfilObj() && perfilObj().nome) {
      if (!resp.value) resp.value = perfilObj().nome;
    }

    // Etiqueta de perfil na sidebar
    pintarBadgePerfil(p);
  }

  function pintarBadgePerfil(p) {
    var rotulos = { admin: '🛡️ Administrador', editor: '✏️ Editor', fiscal: '🦺 Fiscalização', consulta: '🔎 Consulta' };
    var top = document.querySelector('#sidebar .sidebar-top');
    if (!top) return;
    var badge = document.getElementById('perfil-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'perfil-badge';
      badge.className = 'perfil-badge';
      var header = top.querySelector('.menu-header');
      if (header) top.insertBefore(badge, header);
      else top.appendChild(badge);
    }
    var nome = (perfilObj() && perfilObj().nome) ? perfilObj().nome : '';
    badge.textContent = (rotulos[p] || p) + (nome ? ' · ' + nome : '');
  }

  // ---------------------------------------------------------
  // 2) Envio do laudo para o Supabase (tabela inspecoes)
  //    Chamado a partir de salvarHistoricoLaudo() do index.html.
  // ---------------------------------------------------------
  function valDom(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function extrair(texto, marcador) {
    // valor pode estar na mesma linha do marcador ou na linha seguinte
    var linhas = String(texto || '').split('\n');
    for (var i = 0; i < linhas.length; i++) {
      var idx = linhas[i].indexOf(marcador);
      if (idx >= 0) {
        var resto = linhas[i].slice(idx + marcador.length).trim();
        if (resto) return resto;
        for (var j = i + 1; j < linhas.length; j++) {
          if (linhas[j].trim()) return linhas[j].trim();
        }
        return '';
      }
    }
    return '';
  }

  // Monta o registro do laudo a partir do formulário (lê os campos meta-*).
  // Retorna null se o usuário não pode emitir ou o status não é de conformidade.
  window.guiaMontarRegistroInspecao = function (categoria, texto, status) {
    if (!podeEmitir()) return null;
    if (['aceitavel', 'reparar', 'refugo'].indexOf(status) === -1) return null;
    var primeiraLinha = String(texto || '').split('\n').find(function (l) { return l.trim(); }) || '';
    return {
      user_id: perfilObj() ? perfilObj().id : null,
      fiscal_nome: valDom('meta-responsavel') || (perfilObj() && perfilObj().nome) || 'Não informado',
      fiscal_email: perfilObj() ? perfilObj().email : null,
      categoria: categoria || 'Inspeção',
      item: extrair(texto, '🔎 Item:') || null,
      status: status,
      veredito: primeiraLinha.trim() || null,
      local: valDom('meta-local') || extrair(texto, '📍 Local/Trecho:') || null,
      lote: valDom('meta-lote') || extrair(texto, '🏷️ Lote/NF/AMV:') || null,
      observacao: valDom('meta-observacao') || null,
      fonte: extrair(texto, '📄 Fonte normativa:') || null,
      laudo_texto: texto,
      origem: 'campo'
    };
  };

  // Insere um registro já montado em inspecoes. Retorna { ok, id }.
  window.guiaInserirInspecao = async function (registro) {
    try {
      var c = client();
      if (!c || !registro || !registro.user_id) return { ok: false };
      var res = await c.from('inspecoes').insert(registro).select('id').single();
      if (res.error) { console.warn('Falha ao enviar laudo p/ auditoria:', res.error.message); return { ok: false }; }
      return { ok: true, id: res.data ? res.data.id : null };
    } catch (e) { console.warn('guiaInserirInspecao:', e); return { ok: false }; }
  };

  // Define qual laudo recém-criado receberá a próxima foto carimbada.
  window.guiaSetUltimaInspecao = function (id) { ultimaInspecaoId = id || null; ultimaFotoEnviada = ''; };

  // Carrega os laudos do PRÓPRIO usuário direto do Supabase (fonte durável do histórico).
  window.guiaHistoricoDoUsuario = async function () {
    try {
      var c = client();
      var uid = perfilObj() ? perfilObj().id : null;
      if (!c || !uid) return { ok: false, registros: [] };
      var res = await c.from('inspecoes')
        .select('id,categoria,status,laudo_texto,created_at')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(300);
      if (res.error) { console.warn('guiaHistoricoDoUsuario:', res.error.message); return { ok: false, registros: [] }; }
      var regs = (res.data || []).map(function (d) {
        return {
          key: 'db_' + d.id,
          remote_id: d.id,
          data: new Date(d.created_at).toLocaleString('pt-BR'),
          categoria: d.categoria,
          status: d.status,
          texto: d.laudo_texto || '',
          sincronizado: true
        };
      });
      return { ok: true, registros: regs };
    } catch (e) { console.warn('guiaHistoricoDoUsuario:', e); return { ok: false, registros: [] }; }
  };

  // ---------------------------------------------------------
  // 3) Upload da foto carimbada para o Storage + vínculo ao laudo
  //    Chamado a partir de baixarFotoCarimbada/compartilharFotoCarimbada.
  // ---------------------------------------------------------
  function dataUrlParaBlob(dataUrl) {
    var partes = dataUrl.split(',');
    var mime = (partes[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
    var bin = atob(partes[1]);
    var n = bin.length, arr = new Uint8Array(n);
    while (n--) arr[n] = bin.charCodeAt(n);
    return new Blob([arr], { type: mime });
  }

  window.guiaUploadEvidencia = async function (dataUrl, categoria) {
    try {
      if (!podeEmitir() || !dataUrl) return;
      if (dataUrl === ultimaFotoEnviada) return;          // já enviada
      var c = client();
      if (!c) return;
      var uid = perfilObj() ? perfilObj().id : null;
      if (!uid) return;

      var nome = (categoria || 'laudo').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      var path = uid + '/' + nome + '_' + Date.now() + '.jpg';

      var up = await c.storage.from(BUCKET).upload(path, dataUrlParaBlob(dataUrl), {
        contentType: 'image/jpeg', upsert: true
      });
      if (up.error) { console.warn('Falha no upload da foto:', up.error.message); return; }
      ultimaFotoEnviada = dataUrl;

      // vincula a foto ao laudo recém-enviado
      if (ultimaInspecaoId) {
        var pat = await c.from('inspecoes').update({ foto_path: path }).eq('id', ultimaInspecaoId);
        if (pat.error) console.warn('Falha ao vincular foto ao laudo:', pat.error.message);
      }
    } catch (e) {
      console.warn('guiaUploadEvidencia:', e);
    }
  };

  // ---------------------------------------------------------
  // 4) Procedimentos a partir do Supabase (com fallback offline)
  // ---------------------------------------------------------
  window.guiaCarregarProcedimentos = async function () {
    try {
      var c = client();
      if (!c) return;
      var res = await c.from('procedimentos')
        .select('area_key,area_nome,area_icone,item_key,titulo,codigo,descricao,ordem,ativo')
        .eq('ativo', true)
        .order('area_key', { ascending: true })
        .order('ordem', { ascending: true });
      if (res.error || !res.data || !res.data.length) return; // mantém o embutido (offline)

      var novo = {};
      res.data.forEach(function (r) {
        if (!novo[r.area_key]) novo[r.area_key] = { nome: r.area_nome, icone: r.area_icone || '📄', itens: {} };
        novo[r.area_key].itens[r.item_key] = { titulo: r.titulo, codigo: r.codigo || '', desc: r.descricao };
      });
      window.PROCEDIMENTOS = novo;        // substitui o banco embutido
      repopularAreasProc(novo);
    } catch (e) {
      console.warn('guiaCarregarProcedimentos:', e);
    }
  };

  function repopularAreasProc(proc) {
    var sel = document.getElementById('proc-area');
    if (!sel) return;
    var atual = sel.value;
    sel.innerHTML = '<option value="">Selecione...</option>';
    Object.keys(proc).forEach(function (k) {
      sel.innerHTML += '<option value="' + k + '">' + (proc[k].icone || '') + ' ' + proc[k].nome + '</option>';
    });
    if (atual && proc[atual]) sel.value = atual;
  }

  // ---------------------------------------------------------
  // 5) Página de Auditoria (somente admin)
  // ---------------------------------------------------------
  window.carregarAuditoria = async function () {
    if (!ehAdmin()) return;
    var lista = document.getElementById('aud-lista');
    var resumo = document.getElementById('aud-resumo');
    if (!lista) return;
    lista.innerHTML = '<div class="proc-empty">Carregando laudos do campo…</div>';
    if (resumo) resumo.innerHTML = '';
    try {
      var c = client();
      if (!c) { lista.innerHTML = '<div class="proc-empty">Supabase indisponível.</div>'; return; }
      var res = await c.from('inspecoes').select('*').order('created_at', { ascending: false }).limit(500);
      if (res.error) { lista.innerHTML = '<div class="proc-empty">Erro: ' + res.error.message + '</div>'; return; }
      audCache = res.data || [];
      preencherFiltroCategorias(audCache);
      await renderAuditoria();
    } catch (e) {
      lista.innerHTML = '<div class="proc-empty">Erro ao carregar auditoria.</div>';
      console.warn(e);
    }
  };

  function preencherFiltroCategorias(dados) {
    var sel = document.getElementById('aud-f-categoria');
    if (!sel) return;
    var atual = sel.value;
    var cats = Array.from(new Set(dados.map(function (d) { return d.categoria; }).filter(Boolean))).sort();
    sel.innerHTML = '<option value="">Todas as categorias</option>';
    cats.forEach(function (cat) { sel.innerHTML += '<option value="' + cat + '">' + cat + '</option>'; });
    if (atual) sel.value = atual;
  }

  function filtrarAud() {
    var fc = (document.getElementById('aud-f-categoria') || {}).value || '';
    var fs = (document.getElementById('aud-f-status') || {}).value || '';
    var ff = ((document.getElementById('aud-f-fiscal') || {}).value || '').toLowerCase().trim();
    var fb = ((document.getElementById('aud-f-busca') || {}).value || '').toLowerCase().trim();
    return audCache.filter(function (d) {
      if (fc && d.categoria !== fc) return false;
      if (fs && d.status !== fs) return false;
      if (ff && !((d.fiscal_nome || '').toLowerCase().indexOf(ff) >= 0)) return false;
      if (fb) {
        var alvo = ((d.local || '') + ' ' + (d.lote || '') + ' ' + (d.item || '') + ' ' + (d.laudo_texto || '')).toLowerCase();
        if (alvo.indexOf(fb) < 0) return false;
      }
      return true;
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }

  async function assinarFotos(dados) {
    var paths = dados.map(function (d) { return d.foto_path; }).filter(Boolean);
    var mapa = {};
    if (!paths.length) return mapa;
    try {
      var c = client();
      var res = await c.storage.from(BUCKET).createSignedUrls(paths, 3600);
      if (res.data) res.data.forEach(function (o) { if (o && o.path && o.signedUrl) mapa[o.path] = o.signedUrl; });
    } catch (e) { console.warn('assinarFotos:', e); }
    return mapa;
  }

  window.renderAuditoria = async function () {
    var lista = document.getElementById('aud-lista');
    var resumo = document.getElementById('aud-resumo');
    if (!lista) return;
    var dados = filtrarAud();

    if (resumo) {
      var n = dados.length;
      var refugo = dados.filter(function (d) { return d.status === 'refugo'; }).length;
      var reparar = dados.filter(function (d) { return d.status === 'reparar'; }).length;
      var ok = dados.filter(function (d) { return d.status === 'aceitavel'; }).length;
      var taxa = n ? Math.round((refugo / n) * 100) : 0;
      resumo.innerHTML =
        '<span class="aud-kpi">📄 ' + n + ' laudos</span>' +
        '<span class="aud-kpi ok">✅ ' + ok + ' aceitáveis</span>' +
        '<span class="aud-kpi rep">🔧 ' + reparar + ' reparar</span>' +
        '<span class="aud-kpi ref">❌ ' + refugo + ' refugo</span>' +
        '<span class="aud-kpi">📉 ' + taxa + '% de refugo</span>';
    }

    if (!dados.length) {
      lista.innerHTML = '<div class="proc-empty">Nenhum laudo encontrado para os filtros atuais.</div>';
      return;
    }

    var fotos = await assinarFotos(dados);
    lista.innerHTML = dados.map(function (d) {
      var foto = d.foto_path && fotos[d.foto_path]
        ? '<a href="' + fotos[d.foto_path] + '" target="_blank" rel="noopener"><img class="aud-thumb" src="' + fotos[d.foto_path] + '" alt="evidência"></a>'
        : '<div class="aud-thumb aud-sem-foto">sem foto</div>';
      return '' +
        '<div class="hist-item ' + esc(d.status) + '">' +
          '<div class="hist-head"><span>' + esc(d.categoria) + (d.item ? ' · ' + esc(d.item) : '') + '</span>' +
          '<span>' + esc(new Date(d.created_at).toLocaleString('pt-BR')) + '</span></div>' +
          '<div class="aud-meta">' +
            '<span>🦺 ' + esc(d.fiscal_nome || '—') + '</span>' +
            (d.local ? '<span>📍 ' + esc(d.local) + '</span>' : '') +
            (d.lote ? '<span>🏷️ ' + esc(d.lote) + '</span>' : '') +
            '<span class="aud-status ' + esc(d.status) + '">' + esc((d.veredito || d.status)) + '</span>' +
          '</div>' +
          '<div class="aud-corpo">' + foto +
            '<div class="hist-body">' + esc(d.laudo_texto).replace(/\n/g, '<br>') + '</div>' +
          '</div>' +
        '</div>';
    }).join('');
  };

  window.exportarAuditoriaCSV = function () {
    var dados = filtrarAud();
    if (!dados.length) { alert('Não há laudos para exportar.'); return; }
    var col = ['data', 'fiscal', 'categoria', 'item', 'status', 'veredito', 'local', 'lote', 'observacao', 'fonte', 'tem_foto'];
    var q = function (v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; };
    var linhas = dados.map(function (d) {
      return [
        new Date(d.created_at).toLocaleString('pt-BR'), d.fiscal_nome, d.categoria, d.item, d.status,
        d.veredito, d.local, d.lote, d.observacao, d.fonte, d.foto_path ? 'sim' : 'não'
      ].map(q).join(',');
    });
    var csv = col.join(',') + '\n' + linhas.join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'auditoria_laudos_' + Date.now() + '.csv';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); document.body.removeChild(a); }, 0);
  };

  // ---------------------------------------------------------
  // 5b) Meu Perfil + Gerenciamento de usuários
  // ---------------------------------------------------------

  // 'signup' = cria pelo navegador (precisa de cadastro habilitado no projeto);
  // 'funcao' = cria pela Edge Function "criar-usuario" (mais seguro, sem habilitar cadastro público).
  var CRIAR_USUARIO_VIA = 'funcao';

  var ROTULO_PERFIL = {
    admin: '🛡️ Administrador', editor: '✏️ Editor',
    fiscal: '🦺 Fiscalização', consulta: '🔎 Consulta'
  };
  var DESC_PERFIL = {
    admin: 'Vê a Auditoria, gerencia usuários e conteúdo.',
    editor: 'Gerencia procedimentos e flashcards. No campo, só consulta.',
    fiscal: 'Emite laudos e tira fotos (enviados para a Auditoria).',
    consulta: 'Consulta e compara medidas. Não emite laudo nem foto.'
  };
  var usuariosCache = [];

  // ----- Meu Perfil (todos os perfis) -----
  window.carregarMeuPerfil = async function () {
    var box = document.getElementById('perfil-detalhe');
    if (!box) return;
    box.innerHTML = '<div class="proc-empty">Carregando seu perfil…</div>';
    try {
      var c = client();
      var uid = perfilObj() ? perfilObj().id : null;
      if (!c || !uid) { box.innerHTML = '<div class="proc-empty">Sessão não encontrada.</div>'; return; }
      var res = await c.from('profiles').select('id,nome,email,perfil,ativo').eq('id', uid).single();
      if (res.error) { box.innerHTML = '<div class="proc-empty">Erro: ' + res.error.message + '</div>'; return; }
      var p = res.data;
      // mantém a interface em dia caso o perfil tenha mudado no banco
      if (perfilObj()) { perfilObj().perfil = p.perfil; perfilObj().nome = p.nome; perfilObj().ativo = p.ativo; }
      aplicarPermissoesPerfil();
      box.innerHTML =
        '<div class="perfil-grande ' + esc(p.perfil) + '">' + esc(ROTULO_PERFIL[p.perfil] || p.perfil) + '</div>' +
        '<p class="perfil-desc">' + esc(DESC_PERFIL[p.perfil] || '') + '</p>' +
        '<div class="perfil-linha"><span>Nome</span><strong>' + esc(p.nome || '—') + '</strong></div>' +
        '<div class="perfil-linha"><span>E-mail</span><strong>' + esc(p.email || '—') + '</strong></div>' +
        '<div class="perfil-linha"><span>Perfil</span><strong>' + esc(p.perfil) + '</strong></div>' +
        '<div class="perfil-linha"><span>Status</span><strong>' + (p.ativo ? '✅ Ativo' : '⛔ Desativado') + '</strong></div>' +
        '<div class="perfil-linha"><span>ID da conta</span><code>' + esc(p.id) + '</code></div>';
    } catch (e) {
      box.innerHTML = '<div class="proc-empty">Erro ao carregar perfil.</div>';
      console.warn(e);
    }
  };

  // ----- Gerenciar usuários (somente admin) -----
  window.carregarUsuarios = async function () {
    if (!ehAdmin()) return;
    var lista = document.getElementById('usuarios-lista');
    if (!lista) return;
    lista.innerHTML = '<div class="proc-empty">Carregando usuários…</div>';
    try {
      var c = client();
      var res = await c.from('profiles').select('id,nome,email,perfil,ativo').order('perfil', { ascending: true }).order('nome', { ascending: true });
      if (res.error) { lista.innerHTML = '<div class="proc-empty">Erro: ' + res.error.message + '</div>'; return; }
      usuariosCache = res.data || [];
      renderUsuarios();
    } catch (e) {
      lista.innerHTML = '<div class="proc-empty">Erro ao carregar usuários.</div>';
      console.warn(e);
    }
  };

  function opcoesPerfil(sel) {
    return ['admin', 'fiscal', 'consulta', 'editor'].map(function (r) {
      return '<option value="' + r + '"' + (r === sel ? ' selected' : '') + '>' + ROTULO_PERFIL[r] + '</option>';
    }).join('');
  }

  function renderUsuarios() {
    var lista = document.getElementById('usuarios-lista');
    if (!lista) return;
    if (!usuariosCache.length) { lista.innerHTML = '<div class="proc-empty">Nenhum usuário cadastrado.</div>'; return; }
    var meu = perfilObj() ? perfilObj().id : null;
    lista.innerHTML = usuariosCache.map(function (u) {
      var euMesmo = (u.id === meu) ? ' <span class="u-voce">(você)</span>' : '';
      return '' +
        '<div class="u-card">' +
          '<div class="u-info"><strong>' + esc(u.nome || '—') + euMesmo + '</strong><span>' + esc(u.email || '') + '</span></div>' +
          '<div class="u-controles">' +
            '<select id="u-perfil-' + u.id + '">' + opcoesPerfil(u.perfil) + '</select>' +
            '<label class="u-ativo"><input type="checkbox" id="u-ativo-' + u.id + '"' + (u.ativo ? ' checked' : '') + '> Ativo</label>' +
            '<button class="btn-small" onclick="salvarPerfilUsuario(\'' + u.id + '\')">Salvar</button>' +
            '<span class="u-status" id="u-status-' + u.id + '"></span>' +
          '</div>' +
        '</div>';
    }).join('');
  }

  window.salvarPerfilUsuario = async function (id) {
    var c = client();
    var sel = document.getElementById('u-perfil-' + id);
    var chk = document.getElementById('u-ativo-' + id);
    var st = document.getElementById('u-status-' + id);
    if (!sel) return;
    if (st) { st.textContent = 'Salvando…'; st.className = 'u-status'; }
    var up = await c.from('profiles').update({ perfil: sel.value, ativo: chk ? chk.checked : true }).eq('id', id);
    if (up.error) { if (st) { st.textContent = 'Erro: ' + up.error.message; st.className = 'u-status erro'; } return; }
    if (st) { st.textContent = 'Salvo ✓'; st.className = 'u-status ok'; setTimeout(function () { st.textContent = ''; }, 2500); }
    // atualiza o cache local
    usuariosCache.forEach(function (u) { if (u.id === id) { u.perfil = sel.value; u.ativo = chk ? chk.checked : true; } });
    // se o admin mudou o PRÓPRIO perfil, reaplica permissões na hora
    if (perfilObj() && id === perfilObj().id) { perfilObj().perfil = sel.value; aplicarPermissoesPerfil(); }
  };

  function clienteSecundario() {
    var cfg = window.SUPABASE_CONFIG || {};
    if (!window.supabase || !window.supabase.createClient) return null;
    return window.supabase.createClient(cfg.url, cfg.publishableKey || cfg.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, storageKey: 'guia-admin-signup' }
    });
  }

  async function criarViaSignup(nome, email, senha, perfilNovo) {
    var tmp = clienteSecundario();
    if (!tmp) return { ok: false, msg: 'Supabase indisponível.' };
    var r = await tmp.auth.signUp({ email: email, password: senha, options: { data: { nome: nome } } });
    if (r.error) {
      var m = r.error.message || '';
      if (/signup|disabled|not allowed/i.test(m)) {
        return { ok: false, msg: 'O cadastro automático está desativado no projeto. Ative em Authentication → Sign In / Providers (Email) ou use a Edge Function (veja o README).' };
      }
      return { ok: false, msg: m };
    }
    var novoId = (r.data && r.data.user) ? r.data.user.id : null;
    if (!novoId) return { ok: false, msg: 'Usuário criado, mas sem ID retornado.' };
    var c = client();
    var up = await c.from('profiles').update({ nome: nome, email: email, perfil: perfilNovo, ativo: true }).eq('id', novoId);
    if (up.error) return { ok: false, msg: 'Usuário criado, mas falhou ao definir o perfil: ' + up.error.message };
    return { ok: true, precisaConfirmar: !(r.data && r.data.session) };
  }

  async function criarViaFuncao(nome, email, senha, perfilNovo) {
    var c = client();
    try {
      var r = await c.functions.invoke('criar-usuario', { body: { nome: nome, email: email, password: senha, perfil: perfilNovo } });
      if (r.error) {
        // Em respostas non-2xx, o supabase-js NÃO coloca o corpo em r.data:
        // a Response real fica em r.error.context. É de lá que tiramos a mensagem
        // de verdade que a função enviou (ex.: "Legacy API keys are disabled").
        var detalhe = '';
        var status = '';
        var ctx = r.error.context;
        if (ctx) {
          if (typeof ctx.status === 'number') status = ' [HTTP ' + ctx.status + ']';
          try {
            if (typeof ctx.clone === 'function') {
              var corpo = await ctx.clone().json();
              detalhe = (corpo && corpo.error) ? corpo.error : '';
            }
          } catch (eJson) {
            try { if (typeof ctx.text === 'function') detalhe = (await ctx.text()).slice(0, 300); } catch (eTxt) { /* ignora */ }
          }
        }
        return { ok: false, msg: (detalhe || r.error.message || 'Falha ao chamar a função criar-usuario.') + status };
      }
      if (r.data && r.data.error) return { ok: false, msg: r.data.error };
      return { ok: true, precisaConfirmar: false };
    } catch (e) { return { ok: false, msg: String((e && e.message) || e) }; }
  }

  window.criarUsuario = async function () {
    if (!ehAdmin()) return;
    var nome = (document.getElementById('novo-nome') || {}).value || '';
    var email = (document.getElementById('novo-email') || {}).value || '';
    var senha = (document.getElementById('novo-senha') || {}).value || '';
    var perfilNovo = (document.getElementById('novo-perfil') || {}).value || 'consulta';
    var msg = document.getElementById('novo-msg');
    var btn = document.getElementById('btn-criar-usuario');
    nome = nome.trim(); email = email.trim().toLowerCase();

    function aviso(txt, tipo) { if (msg) { msg.textContent = txt; msg.className = 'novo-msg ' + (tipo || ''); } }

    if (!nome) return aviso('Informe o nome.', 'erro');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return aviso('E-mail inválido.', 'erro');
    if (senha.length < 6) return aviso('A senha precisa ter ao menos 6 caracteres.', 'erro');
    if (usuariosCache.some(function (u) { return (u.email || '').toLowerCase() === email; })) {
      return aviso('Já existe um usuário com esse e-mail.', 'erro');
    }

    if (btn) btn.disabled = true;
    aviso('Criando usuário…', '');
    var res = (CRIAR_USUARIO_VIA === 'funcao')
      ? await criarViaFuncao(nome, email, senha, perfilNovo)
      : await criarViaSignup(nome, email, senha, perfilNovo);
    if (btn) btn.disabled = false;

    if (!res.ok) return aviso(res.msg, 'erro');
    aviso(res.precisaConfirmar
      ? '✅ Usuário criado como ' + (ROTULO_PERFIL[perfilNovo] || perfilNovo) + '. Ele precisa confirmar o e-mail antes do primeiro acesso.'
      : '✅ Usuário criado como ' + (ROTULO_PERFIL[perfilNovo] || perfilNovo) + '. Já pode entrar.', 'ok');
    ['novo-nome', 'novo-email', 'novo-senha'].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });
    carregarUsuarios();
  };

  // ---------------------------------------------------------
  // 6) Inicialização (após o perfil estar disponível)
  // ---------------------------------------------------------
  function iniciar() {
    if (!perfilObj()) return;          // ainda não logado
    aplicarPermissoesPerfil();
    window.guiaCarregarProcedimentos();
  }

  document.addEventListener('guia:perfil', iniciar);
  document.addEventListener('DOMContentLoaded', function () { if (perfilObj()) iniciar(); });
  // se este script carregar após o login já resolvido:
  if (document.readyState !== 'loading' && perfilObj()) iniciar();
})();
