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

  window.guiaEnviarInspecao = async function (categoria, texto, status) {
    try {
      if (!podeEmitir()) return;                         // consulta/editor não emitem laudo
      if (['aceitavel', 'reparar', 'refugo'].indexOf(status) === -1) return; // só laudos de conformidade
      var c = client();
      if (!c) return;

      var primeiraLinha = String(texto || '').split('\n').find(function (l) { return l.trim(); }) || '';
      var registro = {
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

      var res = await c.from('inspecoes').insert(registro).select('id').single();
      if (res.error) { console.warn('Falha ao enviar laudo p/ auditoria:', res.error.message); return; }
      ultimaInspecaoId = res.data ? res.data.id : null;
      ultimaFotoEnviada = '';
    } catch (e) {
      console.warn('guiaEnviarInspecao:', e);
    }
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
