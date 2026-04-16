// script.js - Guia do Inspetor Padrão - RUMO

// === HELPERS ===
const $ = id => document.getElementById(id);
const V = id => parseFloat($(id).value) || 0;

function hideAll(s) {
    document.querySelectorAll(s).forEach(e => e.classList.add('escondido'));
}

function showEl(id, t = 'block') {
    const e = $(id);
    if (e) {
        e.classList.remove('escondido');
        e.style.display = t;
    }
}

function hideEl(id) {
    const e = $(id);
    if (e) e.classList.add('escondido');
}

// === AUTH & NAV ===
function validarAcesso() {
    if ($('user-password').value.trim() === '1272') {
        hideEl('login-screen');
        showEl('main-layout', 'flex');
        if (innerWidth <= 768) {
            $('sidebar').classList.add('hidden');
            showEl('toggle-sidebar-btn', 'flex');
        }
    } else {
        showEl('error-msg');
    }
}

function fazerLogout() {
    if (confirm("Deseja realmente sair e limpar os dados locais?")) {
        localStorage.removeItem('rumoInspeccaoDados');
        location.reload();
    }
}

function navegar(el, sec) {
    document.querySelectorAll('.content-section, .menu-item').forEach(e => e.classList.remove('active'));
    $(sec).classList.add('active');
    el.classList.add('active');
    if (innerWidth <= 768) {
        $('sidebar').classList.add('hidden');
        showEl('toggle-sidebar-btn', 'flex');
    }
}

function toggleSidebar() {
    $('sidebar').classList.remove('hidden');
    hideEl('toggle-sidebar-btn');
}

// === REPORT GENERATORS ===
function mkStat(label, val, cls = '') {
    return `<div class="stat-card"><div class="stat-label">${label}</div><div class="stat-value${cls ? ' ' + cls : ''}">${val}</div></div>`;
}

function mkStats(items) {
    return '<div class="dashboard-grid">' + items.map(i => mkStat(i[0], i[1], i[2] || '')).join('') + '</div>';
}

function mkChart(title, bars) {
    let h = `<div class="chart-container"><h3 class="ct">${title}</h3>`;
    bars.forEach(b => {
        h += `<div class="chart-bar-row"><div class="chart-label">${b.l}</div><div class="chart-bar-bg">`;
        if (b.segs) {
            b.segs.forEach((seg, i, a) => {
                const r = i === 0 ? '8px 0 0 8px' : i === a.length - 1 ? '0 8px 8px 0' : '0';
                h += `<div class="chart-bar-fill ${seg[1]}" style="width:${seg[0]};float:left;border-radius:${r}"></div>`;
            });
        } else {
            h += `<div class="chart-bar-fill${b.c ? ' ' + b.c : ''}" style="width:${b.w}"></div>`;
        }
        h += `</div><div class="chart-value"${b.s ? ' style="' + b.s + '"' : ''}>${b.v}</div></div>`;
    });
    return h + '</div>';
}

function B(l, w, v, c, s) {
    return { l, w, v, c: c || '', s: s || '' };
}

function BM(l, segs, v, s) {
    return { l, segs, v, s: s || '' };
}

const R = {};

// SEMANA 15
R["15"] = {
    amv: () => mkStats([["Peças Inspecionadas", "11"], ["Solicitação de Ajustes", "9", "warning"], ["Reprovadas", "0", "danger"], ["Aderência de Inspeção", "100%", "success"]]) +
        mkChart("Peças Inspecionadas por Fornecedor", [B("Ibrafer", "81%", "9"), B("BR Parts", "19%", "2")]),

    concreto: () => mkStats([["Total Fabricado", "3687"], ["Aprovados", "3626", "success"], ["Reprovados", "61", "danger"], ["Tx Aprovação (Sem. 15)", "95.3%", "success"]]) +
        mkChart("Reprovas no Detalhado (Cavan)", [B("Vazios", "67.2%", "41", "danger"), B("Outros", "18%", "11", "danger"), B("Trincas", "11.4%", "7", "danger"), B("Quebras / USP", "3.2%", "2", "danger")]),

    madeira: () => mkStats([["Inspecionados", "1365"], ["Aprovados", "1294", "success"], ["Reprovados", "71", "danger"], ["Tx Aprovação (Sem. 15)", "95%", "success"]]) +
        mkChart("Peças Reprovadas por Fornecedor", [B("Pandolfi Madeiras", "67.6%", "48", "danger"), B("Tres Guri", "32.4%", "23", "danger")]),

    lastro: () => mkStats([["Ensaios Realizados", "52"], ["Ensaios Aprovados", "48", "success"], ["Reprovados", "4", "danger"], ["Tx Aprovação (Sem. 15)", "92%", "success"]]) +
        mkChart("Ensaios por Tipo (Aprovados vs Reprovados)", [BM("Granulometria", [["92.3%", "success"], ["7.7%", "danger"]], "39"), BM("F. Fragmentos", [["92.3%", "success"], ["7.7%", "danger"]], "13")]),

    sub: () => mkStats([["Total de Registros (RNCs)", "20"], ["Concluídos", "17", "success"], ["Em Andamento", "1", "warning"], ["Cancelados", "2", "danger"]]) +
        mkChart("Registros por Fornecedor (Top 1)", [B("Pandolfi", "100%", "19", "warning")]),

    rnc: () => R["15"].sub()
};

// SEMANA 14
R["14"] = {
    amv: () => mkStats([["Peças Inspecionadas", "40"], ["Solicitação de Ajustes", "7", "warning"], ["Reprovadas", "0", "danger"], ["Aderência de Inspeção", "100%", "success"]]) +
        mkChart("Peças Inspecionadas por Fornecedor", [B("BR Parts", "100%", "40")]),

    concreto: () => mkStats([["Total Fabricado", "4660"], ["Aprovados", "4452", "success"], ["Reprovados", "208", "danger"], ["Tx Aprovação (Sem. 14)", "95.54%", "success"]]) +
        mkChart("Reprovas no Detalhado (Cavan)", [B("Trincas", "87.5%", "182", "danger"), B("Quebras", "4.8%", "10", "danger"), B("Vazios", "4.8%", "10", "danger"), B("Ombreiras / Outros", "2.8%", "6", "danger")]),

    madeira: () => mkStats([["Inspecionados", "1782"], ["Aprovados", "1476", "success"], ["Reprovados", "306", "danger"], ["Tx Aprovação (Sem. 14)", "86%", "warning"]]) +
        mkChart("Peças Reprovadas por Fornecedor", [B("Pandolfi", "69.6%", "213", "danger"), B("Larssen", "20.6%", "63", "danger"), B("Ricken", "6.2%", "19", "danger"), B("Tres Guri", "3.6%", "11", "danger")]),

    lastro: () => mkStats([["Ensaios Realizados", "24"], ["Ensaios Aprovados", "24", "success"], ["Reprovados", "0", "danger"], ["Tx Aprovação (Sem. 14)", "100%", "success"]]) +
        mkChart("Ensaios por Tipo", [B("Granulometria", "100%", "18", "success"), B("F. Fragmentos", "100%", "6", "success")]),

    sub: () => {
        const s = mkStats([["Total de Registros (RNCs)", "78"], ["Concluídos", "63", "success"], ["Em Andamento", "10", "warning"], ["Cancelados", "5", "danger"]]);
        return s + mkChart("Registros Abertos por Fornecedor (Top 5)", [
            B("Pandolfi", "100%", "17", "warning"),
            B("Larssen", "88%", "15", "warning"),
            B("Ricken", "64%", "11", "warning"),
            B("F. Garcia", "47%", "8", "warning"),
            B("Tratanorte", "29%", "5", "warning")
        ]);
    },
    rnc: () => R["14"].sub()
};

// SEMANA 13
R["13"] = {
    amv: () => mkStats([["Peças Inspecionadas", "52"], ["Solicitação de Ajustes", "22", "warning"], ["Reprovadas", "0", "danger"], ["Aderência de Inspeção", "98%", "success"]]) +
        mkChart("Peças Inspecionadas por Fornecedor", [B("BR Parts", "71.1%", "37"), B("Ibrafer", "15.4%", "8"), B("Hewitt", "13.5%", "7")]) +
        mkChart("Solicitação de Ajustes por Fornecedor", [B("Ibrafer", "100%", "9", "warning"), B("Hewitt", "77.7%", "7", "warning"), B("BR Parts", "66.7%", "6", "warning")]) +
        mkChart("Peças Inspecionadas por Mês (2026)", [B("Janeiro", "100%", "301"), B("Fevereiro", "17.3%", "52"), B("Março", "44.5%", "134")]),

    concreto: () => mkStats([["Total Fabricado (Acum.)", "56.483"], ["Aprovados (Acum.)", "56.288", "success"], ["Reprovados (Acum.)", "195", "danger"], ["Tx Aprovação (Sem. 13)", "99,3%", "success"]]) +
        mkChart("Aprovação Semanal", [B("Sem. 2", "98.94%", "98,94%"), B("Sem. 4", "99.60%", "99,60%"), B("Sem. 6", "99.64%", "99,64%"), B("Sem. 8", "99.27%", "99,27%"), B("Sem. 10", "99.76%", "99,76%"), B("Sem. 12", "99.54%", "99,54%"), B("Sem. 13", "99.29%", "99,29%", "success", null, "font-weight:900")]) +
        mkChart("Reprovas no Detalhado (Acumulado)", [B("Vazios", "100%", "78", "danger"), B("Ombreiras", "35.9%", "28", "danger"), B("Trincas", "32%", "25", "danger"), B("Quebras", "30.8%", "24", "danger"), B("Falha de Produção", "10.2%", "8", "danger"), B("Outros", "9%", "7", "danger"), B("USP", "0%", "0", "danger")]) +
        mkChart("Produção por Mês (Fabricados)", [B("Janeiro", "100%", "19.751"), B("Fevereiro", "98.8%", "19.515"), B("Março", "87.2%", "17.217")]),

    madeira: () => mkStats([["Inspecionados", "1.064"], ["Aprovados", "955", "success"], ["Reprovados", "109", "danger"], ["Tx Aprovação (Sem. 13)", "91%", "success"]]) +
        mkChart("Peças por Fornecedor (Aprovados / Reprovados)", [
            BM("Ricken", [["93.15%", "success"], ["6.85%", "danger"]], "626 / 46"),
            BM("Pandolfi", [["82.74%", "success"], ["17.26%", "danger"]], "278 / 58"),
            BM("Tres Guri", [["91.07%", "success"], ["8.93%", "danger"]], "51 / 5")
        ]) +
        mkChart("Taxa de Aprovação por Fornecedor", [B("Ricken", "93.15%", "93,15%", "success"), B("Tres Guri", "91.07%", "91,07%", "success"), B("Pandolfi", "82.74%", "82,74%", "warning")]) +
        mkChart("Taxa de Aprovação por Semana", [B("Sem. 4", "84.14%", "84,14%"), B("Sem. 5", "93.55%", "93,55%"), B("Sem. 6", "86.58%", "86,58%"), B("Sem. 7", "96.09%", "96,09%"), B("Sem. 8", "89.99%", "89,99%"), B("Sem. 10", "89.15%", "89,15%"), B("Sem. 11", "91.16%", "91,16%"), B("Sem. 12", "89.35%", "89,35%"), B("Sem. 13", "91.07%", "91,07%", "success")]) +
        mkChart("Taxa de Aprovação por Mês", [B("Janeiro", "88.15%", "88,15%"), B("Fevereiro", "92.17%", "92,17%"), B("Março", "90.02%", "90,02%")]),

    lastro: () => mkStats([["Ensaios Realizados", "71"], ["Ensaios Aprovados", "62", "success"], ["Reprovados", "9", "danger"], ["Tx Aprovação (Sem. 13)", "87%", "warning"]]) +
        mkChart("Ensaios por Tipo (Aprovados vs Reprovados)", [
            BM("Granulometria", [["90.7%", "success"], ["9.3%", "danger"]], "54 (49/5)"),
            BM("F. Fragmentos", [["76.5%", "success"], ["23.5%", "danger"]], "17 (13/4)")
        ]) +
        mkChart("Ensaios por Pedreira", [
            BM("Basalto", [["80%", "success"], ["20%", "danger"]], "16 / 4"),
            B("Embu S A", "100%", "16 / 0", "success"),
            BM("Coplan", [["58.3%", "success"], ["41.7%", "danger"]], "7 / 5"),
            B("Minermix", "100%", "12 / 0", "success"),
            B("Petra", "100%", "11 / 0", "success")
        ]) +
        mkChart("Aprovação por Pedreira", [
            B("Coplan", "58%", "58%", "danger", null, "color:#C62828"),
            B("Basalto", "80%", "80%", "warning"),
            B("Embu S A", "100%", "100%", "success"),
            B("Minermix", "100%", "100%", "success"),
            B("Petra", "100%", "100%", "success")
        ]),

    sub: () => mkStats([["Lotes Inspecionados", "7"], ["Peças Liberadas", "71 Mil", "success"], ["Peças Não Conformes", "0", "success"], ["Lotes Reprovados", "--", "success"]]) +
        mkChart("Amostras Inspecionadas por Fornecedor", [B("Hipperfreios", "100%", "222")]) +
        mkChart("Inspeção por Material", [B("Ombreira FAST-CLIP HFOB08", "100%", "142"), B("Palmilha Branca TR68", "56.3%", "80")]) +
        mkChart("Inspeções por Mês (2026)", [B("Janeiro", "100%", "1,6 Mil"), B("Fevereiro", "87.5%", "1,4 Mil"), B("Março", "37.5%", "0,6 Mil")]),

    rnc: () => mkStats([["Total de Registros", "77"], ["Concluídos", "63", "success"], ["Em Andamento", "9", "warning"], ["Cancelados", "5", "danger"]]) +
        '<div class="dashboard-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:25px">' +
        mkStat("% Concluídos", '81,8%', 'success') +
        mkStat("% Em Andamento", '11,7%', 'warning') +
        mkStat("% Cancelados", '6,5%', 'danger') + '</div>' +
        mkChart("Registros Abertos por Fornecedor", [
            B("Pandolfi", "100%", "17", "warning"),
            B("Larssen", "88.2%", "15", "warning"),
            B("Ricken", "64.7%", "11", "warning"),
            B("F. Garcia", "47%", "8", "warning"),
            B("Tratanorte", "29.4%", "5", "warning"),
            B("Autem", "23.5%", "4", "warning")
        ]) +
        mkChart("Registros Abertos por Área", [
            BM("Manutenção", [["81%", "success"], ["7%", "warning"], ["12%", "danger"]], "81%"),
            BM("Modernização", [["84%", "success"], ["4%", "warning"], ["12%", "danger"]], "84%")
        ]) +
        mkChart("Registros Abertos por Material", [
            BM("Dormente Madeira", [["85%", "success"], ["6%", "warning"], ["9%", "danger"]], "85%"),
            BM("Lastro", [["75%", "success"], ["13%", "warning"], ["13%", "danger"]], "75%"),
            B("Dormente Concreto", "100%", "100%", "success"),
            B("Ombreira E-CLIP", "100%", "100%", "success")
        ])
};

function atualizarReport() {
    const s = $('report-semana').value;
    const a = $('report-area').value;
    const c = $('report-content');
    if (a) {
        c.innerHTML = R[s] && R[s][a] ? R[s][a]() : `<div class="stat-card" style="text-align:center;padding:40px"><h3 style="color:var(--text-title);margin-bottom:10px">Dados da Semana ${s} não disponíveis ainda.</h3><p style="color:var(--text-muted);font-size:.95rem">Envie as imagens atualizadas do dashboard para processamento.</p></div>`;
        showEl('report-content');
    } else {
        hideEl('report-content');
    }
}

// === AJUDA VISUAL ===
const ajudas = {
    agulha: ['Ponta da Agulha (Perfil 5100)', 'Meça a espessura da ponta da agulha a exatos 15mm do início da usinagem. O desgaste não pode exceder o estipulado na norma AREMA.'],
    jacare_canal: ['Jacaré - Canal', 'A profundidade do canal deve ser aferida no núcleo do jacaré de aço manganês, garantindo passagem segura do friso da roda.'],
    nao_cubica: ['Britas Não-Cúbicas', 'Britas lamelares ou alongadas reduzem o intertravamento do lastro. Separe as pedras que visivelmente têm uma dimensão muito maior que as outras para amostragem.'],
    loc_dormente: ['Localização do Defeito', 'Apoio: Área diretamente abaixo da chapa/trilho. Testeira: As extremidades do dormente. Fora de Apoio: Região central livre.'],
    def_madeira: ['Tipos de Fenda', 'Fenda de Topo: Inicia na face externa e entra na madeira. Rachadura de Centro: Abertura longitudinal no meio do dormente, não alcançando as bordas.']
};

function abrirAjuda(k) {
    if (ajudas[k]) {
        $('modal-titulo').innerText = ajudas[k][0];
        $('modal-desc').innerText = ajudas[k][1];
        showEl('modal-ajuda-visual', 'flex');
    }
}

function fecharAjuda() {
    hideEl('modal-ajuda-visual');
}

// === INTERFACE UPDATES ===
function atualizarInterface(mod) {
    const base = mod.split('_')[0];
    hideEl(`resultado-box-${base}`);
    hideEl(`botoes-acao-${base}`);

    if (mod === 'amv') {
        const c = $('amv-componente').value;
        hideAll('[id^="amv-inputs-"]');
        hideEl('btn-amv');
        if (c) {
            showEl(`amv-inputs-${c}`, 'grid');
            showEl('btn-amv');
        }
    }
    else if (mod === 'brita') {
        const c = $('brita-categoria').value;
        ['brita-check-visual', 'brita-inputs-lote', 'brita-inputs-granulometria', 'brita-inputs-lab', 'btn-brita'].forEach(hideEl);
        if (c === 'visual') {
            showEl('brita-check-visual', 'flex');
            showEl('btn-brita');
        } else if (c === 'forma_lote') {
            showEl('brita-inputs-lote', 'grid');
            showEl('btn-brita');
        } else if (c === 'granulometria') {
            showEl('brita-inputs-granulometria');
            showEl('btn-brita');
        } else if (c === 'laboratorio') {
            showEl('brita-inputs-lab');
            showEl('btn-brita');
        }
    }
    else if (mod === 'madeira') {
        const c = $('mad-categoria').value;
        hideEl('mad-inputs-fisico');
        hideEl('mad-inputs-defeito');
        hideEl('btn-madeira');
        if (c === 'fisico') {
            showEl('mad-inputs-fisico', 'grid');
            showEl('btn-madeira');
        } else if (c === 'defeito') {
            showEl('mad-inputs-defeito');
            atualizarInterface('madeira_sub');
        }
    }
    else if (mod === 'madeira_sub') {
        const t = $('mad-tipo-defeito').value;
        ['mad-check-fixacao', 'mad-dims-racha', 'mad-dims-furos', 'mad-dims-empenamento', 'mad-div-prof-racha', 'mad-dims-esmoado', 'mad-dims-dimensoes', 'btn-madeira'].forEach(hideEl);
        if (!t) return;
        showEl('btn-madeira');
        if (!['empenamento', 'podre', 'casca', 'anti_rachante', 'amarracao', 'dimensoes'].includes(t)) showEl('mad-check-fixacao', 'flex');
        if (t === 'racha_topo') showEl('mad-dims-racha', 'grid');
        else if (t === 'racha_centro') { showEl('mad-dims-racha', 'grid'); showEl('mad-div-prof-racha'); }
        else if (t === 'furos_nos') showEl('mad-dims-furos', 'grid');
        else if (t === 'empenamento') showEl('mad-dims-empenamento', 'grid');
        else if (t === 'esmoado') showEl('mad-dims-esmoado', 'grid');
        else if (t === 'dimensoes') showEl('mad-dims-dimensoes', 'block');
    }
    else if (mod === 'sub') {
        const c = $('sub-categoria').value;
        const ct = $('sub-inputs-container');
        ct.innerHTML = '';
        hideEl('sub-inputs-container');
        hideEl('btn-sub');
        if (c && subDados[c]) {
            subDados[c].m.forEach((m, i) => {
                ct.innerHTML += `<div class="form-group"><label>${m.l}:</label><input type="number" id="val-sub-m${i + 1}" step="0.01"></div>`;
            });
            showEl('sub-inputs-container', 'grid');
            showEl('btn-sub');
        }
    }
}

// === ANIMATION LAUDO ===
function animarTexto(boxId, texto, cls) {
    const box = $(boxId);
    box.className = `resultado-box ${cls}`;
    box.style.display = 'block';
    box.innerHTML = '';
    const sec = boxId.split('-')[2];
    hideEl(`botoes-acao-${sec}`);
    const aviso = box.parentElement.querySelector('.aviso-normativo');
    if (aviso) aviso.style.display = 'none';

    let i = 0;
    (function dig() {
        if (i < texto.length) {
            box.innerHTML += texto.charAt(i) === '\n' ? '<br>' : texto.charAt(i);
            i++;
            setTimeout(dig, 10);
        } else {
            showEl(`botoes-acao-${sec}`, 'grid');
            if (aviso) aviso.style.display = 'block';
        }
    })();
}

// === ANÁLISE CONCRETO ===
const optLocal = {
    vazio: [{ val: 'apoio', txt: 'Apoio do Trilho' }, { val: 'fora_apoio', txt: 'Fora da Região do Trilho' }, { val: 'testeira', txt: 'Testeira' }],
    quebra: [{ val: 'lat_sup', txt: 'Laterais / Superior (fora trilho)' }, { val: 'testeira', txt: 'Testeira' }],
    fissura: [{ val: 'ombreira', txt: 'Ombreira' }, { val: 'lateral', txt: 'Lateral' }, { val: 'transversal', txt: 'Transversal' }]
};

function atualizarOpcoes() {
    const t = $('tipo-defeito').value;
    const s = $('localizacao');
    s.innerHTML = '<option value="">Selecione a região...</option>';
    if (t && optLocal[t]) optLocal[t].forEach(o => s.innerHTML += `<option value="${o.val}">${o.txt}</option>`);
    atualizarCampos();
}

function atualizarCampos() {
    const t = $('tipo-defeito').value;
    const l = $('localizacao').value;
    hideEl('dimensoes-inputs');
    hideEl('container-aco');
    hideAll('#dimensoes-inputs .form-group');
    if (!l) return;
    showEl('dimensoes-inputs', 'grid');
    if (t === 'vazio') {
        showEl('div-profundidade'); showEl('div-comprimento'); showEl('div-largura');
        if (l === 'testeira') showEl('container-aco', 'flex');
    } else if (t === 'quebra') {
        showEl('div-profundidade'); showEl('div-comprimento'); showEl('div-largura');
        showEl('container-aco', 'flex');
    } else if (t === 'fissura') {
        if (l === 'lateral' || l === 'transversal') {
            showEl('div-espessura'); showEl('div-comprimento');
        } else hideEl('dimensoes-inputs');
    }
}

function analisarDefeito() {
    const t = $('tipo-defeito').value;
    const l = $('localizacao').value;
    const p = V('val-profundidade');
    const c = V('val-comprimento');
    const la = V('val-largura');
    const e = V('val-espessura');
    const aco = $('aco-exposto').checked;

    let s = 'aceitavel', ti = '✅ ACEITÁVEL', d = '', ref = '', ac = '✅ AÇÃO: Liberar lote para aplicação.';

    // (Todo o código de análise de concreto mantido exatamente como no original)
    if (t === 'vazio') {
        if (l === 'apoio') {
            ref = 'Tabela 1';
            if (p <= 2 && c <= 3 && la <= 3) d = 'Profundidade ≤2 mm | Comprimento ≤3 mm | Largura ≤3 mm';
            else if (p <= 5 && c <= 10 && la <= 10) { s = 'reparar'; ti = '🔧 REPARAR'; d = 'Profundidade 3-5 mm | Comprimento 4-10 mm | Largura 4-10 mm'; ac = '⚠️ AÇÃO: Executar reparo com argamassa epóxi antes da liberação.'; }
            else { s = 'refugo'; ti = '❌ REFUGO'; d = 'Profundidade >6 mm | Comprimento >11 mm | Largura >11 mm'; ac = '🚫 AÇÃO: Segregar dormente e preencher RNC imediata.'; }
        } else if (l === 'fora_apoio') {
            ref = 'Tabela 2';
            if (p <= 5 && c <= 5 && la <= 5) d = 'Profundidade ≤5 mm | Comprimento ≤5 mm | Altura ≤5 mm';
            else if (p <= 10 && c <= 20 && la <= 20) { s = 'reparar'; ti = '🔧 REPARAR'; d = 'Profundidade 6-10 mm | Comprimento 6-20 mm | Altura 6-20 mm'; ac = '⚠️ AÇÃO: Executar reparo na superfície.'; }
            else { s = 'refugo'; ti = '❌ REFUGO'; d = 'Profundidade >11 mm | Comprimento >21 mm | Altura >21 mm'; ac = '🚫 AÇÃO: Segregar dormente e preencher RNC imediata.'; }
        } else if (l === 'testeira') {
            ref = 'Página 15-16';
            if (aco && p >= 31) { s = 'refugo'; ti = '❌ REFUGO'; d = 'Exposição de armadura tolerável: até 30 mm'; ac = '🚫 AÇÃO: Risco estrutural. Sucatar peça.'; }
            else if (!aco && p <= 50) { s = 'reparar'; ti = '🔧 REPARAR'; d = 'Profundidade máxima reparável: 50 mm'; ac = '⚠️ AÇÃO: Necessário preenchimento da testeira.'; }
            else { s = 'refugo'; ti = '❌ REFUGO'; d = 'Profundidade >51 mm'; ac = '🚫 AÇÃO: Segregar dormente e preencher RNC.'; }
        }
    } else if (t === 'quebra') {
        ref = l === 'lat_sup' ? 'Tabela 3' : 'Tabela 4';
        if (aco) { s = 'refugo'; ti = '❌ REFUGO'; d = 'Qualquer exposição de armadura ativa = refugo'; ac = '🚫 AÇÃO: Armadura comprometida. Refugar.'; }
        else if (p <= 10 && c <= 49 && la <= 29) d = 'Prof. ≤10 mm | Comp. ≤49 mm | Alt. ≤29 mm';
        else if (p <= 20 && c <= 200 && la <= 150) { s = 'reparar'; ti = '🔧 REPARAR'; d = 'Prof. 11-20 mm | Comp. 50-200 mm | Alt. 30-150 mm'; ac = '⚠️ AÇÃO: Reparo mandatório da quebra.'; }
        else { s = 'refugo'; ti = '❌ REFUGO'; d = 'Prof. >21 mm | Comp. >201 mm | Alt. >151 mm'; ac = '🚫 AÇÃO: Quebra excessiva. Abrir RNC.'; }
    } else if (t === 'fissura') {
        ref = 'Tabela 5';
        if (l === 'ombreira') { s = 'refugo'; ti = '❌ REFUGO'; d = 'Fissura na ombreira = refugo'; ac = '🚫 AÇÃO: Refugo sumário.'; }
        else if (l === 'lateral' || l === 'transversal') {
            if (e <= 0.10 && c <= 10) d = 'Espessura ≤0,10 mm | Comprimento ≤10 mm';
            else if (e <= 0.50 && c <= 100) { s = 'reparar'; ti = '🔧 REPARAR'; d = 'Espessura 0,15-0,50 mm | Comprimento 11-100 mm'; ac = '⚠️ AÇÃO: Injeção de epóxi necessária.'; }
            else { s = 'refugo'; ti = '❌ REFUGO'; d = 'Espessura ≥0,55 mm | Comprimento >101 mm'; ac = '🚫 AÇÃO: Fissura estrutural grave. Refugar.'; }
        }
    }
    animarTexto('resultado-box-concreto', `${ti}\n\n📏 Análise:\n${d}\n\n${ac}\n\n📄 PO-SPE-160 (${ref})`, s);
}

// === ANÁLISE AMV ===
function analisarAMV() {
    const comp = $('amv-componente').value;
    let s = 'aceitavel', ti = '✅ CONFORME', d = '', ref = '', ac = '✅ AÇÃO: Componente liberado para montagem/operação.';

    if (comp === 'agulha') {
        const p = V('val-amv-ponta');
        ref = 'ETMs 0005, 0007, 0008, 0009';
        if (p <= 3.9) {
            d = 'Ponta de agulha dentro da tolerância.\n(Nominal AREMA: 3.1mm + Tol: 0.8mm)';
            if (p >= 3.7) { d += '\n⚠️ ALERTA DE TENDÊNCIA: Desgaste próximo ao limite crítico.'; ac = '⚠️ AÇÃO: Liberado, mas programar monitoramento.'; }
        } else { s = 'refugo'; ti = '❌ NÃO CONFORME'; d = 'Ponta de agulha acima da tolerância máxima (3.9mm). Desgaste excessivo.'; ac = '🚫 AÇÃO: Risco de descarrilamento. Bloquear e substituir.'; }
    } else if (comp === 'rolete') {
        const a = V('val-amv-altura-rolete');
        ref = 'EM-SPE-072 (Item 5.2)';
        if (a <= 2.0) d = 'Altura do rolete atende aos requisitos (≤ 2.0mm em relação à base da agulha).';
        else { s = 'reparar'; ti = '🔧 NECESSITA CALIBRAÇÃO'; d = 'Altura superior a 2.0 mm.'; ac = '⚠️ AÇÃO: Acionar equipe de via para recalibrar a altura.'; }
    } else if (comp === 'coxin') {
        const du = V('val-amv-coxin');
        ref = 'EM-SPE-072 (Item 5.3.1)';
        if (du >= 88 && du <= 92) d = 'Dureza Shore A do coxin atende aos requisitos (88 a 92).';
        else { s = 'refugo'; ti = '❌ NÃO CONFORME'; d = 'Dureza fora da tolerância exigida (Min: 88 | Max: 92).'; ac = '🚫 AÇÃO: Rejeitar lote de coxins. Retornar ao fornecedor.'; }
    } else if (comp === 'jacare_canal') {
        const p = V('val-amv-jacare-canal');
        ref = 'ETMs 0005, 0007, 0008, 0009';
        if (p >= 51 && p <= 55) d = 'Profundidade do canal conforme (53 ± 2 mm).';
        else { s = 'reparar'; ti = '🔧 NECESSITA REPARO'; d = 'Profundidade fora da tolerância (Min: 51 mm | Max: 55 mm).'; ac = '⚠️ AÇÃO: Solicitar esmerilhamento ou preenchimento de solda.'; }
    } else if (comp === 'jacare_dureza') {
        const du = V('val-amv-jacare-dureza');
        ref = 'ETMs 0008, 0009';
        if (du >= 352 && du <= 418) d = 'Dureza Brinell atende aos requisitos (352 a 418 HB).';
        else { s = 'refugo'; ti = '❌ NÃO CONFORME'; d = 'Dureza fora da tolerância exigida (Min: 352 HB | Max: 418 HB).'; ac = '🚫 AÇÃO: Bloquear lote do Jacaré e abrir RNC.'; }
    } else if (comp === 'fixacao_concreto') {
        const p = V('val-amv-fixacao');
        ref = 'ENG-DSV-VP-ETM-A0019';
        if (p >= 900 && p <= 1500) d = 'Pressão do grampo atende aos requisitos (Exigido: 1200 ± 300 kgf).';
        else { s = 'reparar'; ti = '🔧 VERIFICAR FIXAÇÃO'; d = 'Pressão do grampo fora da faixa (900 a 1500 kgf).'; ac = '⚠️ AÇÃO: Substituir grampos fadigados na região.'; }
    } else if (comp === 'cilindro') {
        const p = V('val-amv-pressao'), t = V('val-amv-tempo');
        ref = 'EM-SPE-026';
        if (p >= 500 && t >= 10 && t <= 12) d = 'Pressão e tempo de acionamento em conformidade (Mín 500kgf, 10-12s).';
        else { s = 'reparar'; ti = '🔧 REGULAR CILINDRO'; d = 'Parâmetros fora da norma estabelecida.'; ac = '⚠️ AÇÃO: Ajuste de válvula do cilindro pela manutenção.'; }
    } else if (comp === 'batefica') {
        const dl = V('val-amv-deslocamento');
        ref = 'EM-SPE-017';
        if (dl >= 100 && dl <= 121) d = 'Deslocamento da agulha operando adequadamente (100 a 121 mm).';
        else { s = 'reparar'; ti = '🔧 NECESSITA AJUSTE'; d = 'Deslocamento fora da tolerância (100 mm a 121 mm).'; ac = '⚠️ AÇÃO: Calibrar hastes do aparelho Bate-Fica.'; }
    }
    animarTexto('resultado-box-amv', `${ti}\n\n📏 Análise:\n${d}\n\n${ac}\n\n📄 Lote ETM-AMV (${ref})`, s);
}

// === ANÁLISE BRITA ===
function analisarBrita() {
    const cat = $('brita-categoria').value;
    const lito = $('brita-litologia').value;
    let s = 'aceitavel', ti = '✅ CONFORME', d = '', ac = '✅ AÇÃO: Lote de brita liberado para lastramento.';

    if (cat === 'visual') {
        if ($('brita-presenca-finos').checked) { s = 'refugo'; ti = '❌ NÃO ACEITAR (REFUGO)'; d = 'Lastro Contaminado: Presença visível de materiais finos.'; ac = '🚫 AÇÃO: Rejeitar vagão imediatamente.'; }
        else d = 'Inspeção visual em conformidade. Sem contaminantes.';
    } else if (cat === 'forma_lote') {
        const p = V('val-brita-nao-cubicas');
        if (p > 15) { s = 'refugo'; ti = '❌ NÃO ACEITAR (REFUGO)'; d = `Amostra possui ${p}% de britas não-cúbicas (Max: 15%).`; ac = '🚫 AÇÃO: Lote reprovado. Solicitar nova britagem.'; }
        else d = `Índice de britas não-cúbicas (${p}%) dentro da tolerância (≤ 15%).`;
    } else if (cat === 'granulometria') {
        const g3 = V('val-brita-g3'), g250 = V('val-brita-g250'), g150 = V('val-brita-g150'), g075 = V('val-brita-g075'), g050 = V('val-brita-g050');
        let er = [];
        if (g3 !== 0) er.push(`- 3": deve ser 0% (Atual: ${g3}%)`);
        if (g250 < 0 || g250 > 10) er.push(`- 2.1/2": 0% a 10% (Atual: ${g250}%)`);
        if (g150 < 40 || g150 > 75) er.push(`- 1.1/2": 40% a 75% (Atual: ${g150}%)`);
        if (g075 < 90 || g075 > 100) er.push(`- 3/4": 90% a 100% (Atual: ${g075}%)`);
        if (g050 < 95 || g050 > 100) er.push(`- 1/2": 95% a 100% (Atual: ${g050}%)`);
        if (er.length) { s = 'refugo'; ti = '❌ NÃO ACEITAR (REFUGO)'; d = 'Amostra fora da faixa granulométrica AREMA 24:\n' + er.join('\n'); ac = '🚫 AÇÃO: Lote reprovado.'; }
        else d = 'Percentuais retidos em conformidade com o Plano 24 da AREMA.';
    } else if (cat === 'laboratorio') {
        const la = V('val-brita-losangeles'), pu = V('val-brita-pulverulento'), ar = V('val-brita-argila');
        let er = [];
        const lim = lito === 'granito' ? 35 : 30;
        if (la > lim) er.push(`- Abrasão Los Angeles: ${la}% (Max p/ ${lito}: ${lim}%)`);
        if (pu > 1) er.push(`- Mat. Pulverulento: ${pu}% (Max: 1%)`);
        if (ar > 0.5) er.push(`- Torrões de Argila: ${ar}% (Max: 0.5%)`);
        if (er.length) { s = 'refugo'; ti = '❌ LAUDO REPROVADO'; d = 'Falha nos ensaios mecânicos/físicos:\n' + er.join('\n'); ac = '🚫 AÇÃO: Bloquear pedreira/veio para fornecimento.'; }
        else d = `Ensaios físicos em conformidade para Litologia: ${lito.toUpperCase()}.`;
    }
    animarTexto('resultado-box-brita', `${ti}\n\n📏 Análise:\n${d}\n\n${ac}\n\n📄 Procedimento: MAN-VP-T-ETM-ES-0006-05`, s);
}

// === ANÁLISE MADEIRA ===
function analisarMadeira() {
    const cat = $('mad-categoria').value;
    let s = 'aceitavel', ti = '✅ CONFORME', d = '', ac = '✅ AÇÃO: Lote liberado para via.';

    if (cat === 'fisico') {
        const cl = $('mad-classe').value, um = V('val-mad-umidade'), dn = V('val-mad-densidade'), rt = V('val-mad-retencao');
        let er = [];
        if (um > 30) er.push('Teor de umidade excede o máximo de 30%.');
        if (cl === '1' && dn > 0 && dn < 750) er.push('Densidade abaixo do mínimo p/ 1ª Classe (750 kg/m³).');
        if (cl === '2' && dn > 0 && dn < 600) er.push('Densidade abaixo do mínimo p/ 2ª Classe (600 kg/m³).');
        if (rt > 0 && rt < 9.6) er.push('Retenção CCA abaixo do mínimo (9.6 kg/m³).');
        if (er.length) { s = 'refugo'; ti = '❌ NÃO CONFORME'; d = er.join('\n'); ac = '🚫 AÇÃO: Recusar recebimento. Falha no tratamento.'; }
        else d = 'Propriedades físicas e de impregnação preservativa dentro dos limites normativos.';
    } else if (cat === 'defeito') {
        const tipo = $('mad-tipo-defeito').value;
        const fix = $('mad-zona-fixacao').checked;
        const refugoSumario = {
            podre: 'Dormente com aspecto de apodrecimento.',
            casca: 'Presença de casca na madeira.',
            anti_rachante: 'Proteção anti-rachante ausente ou menor que 70% na face do dormente.',
            amarracao: 'Amarração deficiente (menos de 3 fitas ou sem pontaletes).'
        };

        if (refugoSumario[tipo]) {
            s = 'refugo'; ti = '❌ REFUGO'; d = refugoSumario[tipo]; ac = '🚫 AÇÃO: Refugo Sumário (Defeito não aceitável).';
        } else if (tipo === 'dimensoes') {
            const c = V('val-mad-dim-comp'), l = V('val-mad-dim-larg'), a = V('val-mad-dim-alt');
            const nc = V('val-mad-nom-comp'), nl = V('val-mad-nom-larg'), na = V('val-mad-nom-alt');
            let e = [];
            if (c < nc || c > (nc + 0.05)) e.push(`Comprimento fora (Aferido: ${c}m | Nom: ${nc}m | Tol: +5cm / -0cm)`);
            if (l < (nl - 2) || l > (nl + 2)) e.push(`Largura fora (Aferido: ${l}cm | Nom: ${nl}cm | Tol: ±2cm)`);
            if (a < (na - 1) || a > (na + 1)) e.push(`Altura fora (Aferido: ${a}cm | Nom: ${na}cm | Tol: ±1cm)`);
            if (e.length) { s = 'refugo'; ti = '❌ NÃO CONFORME'; d = e.join('\n'); ac = '🚫 AÇÃO: Dormente dimensionalmente divergente. Refugo.'; }
            else d = 'Dimensões aferidas estão dentro da tolerância normativa.';
        } else if (tipo === 'esmoado') {
            const cd = $('val-mad-esmoado-comp').value, rt = V('val-mad-esmoado-reta'), tp = V('val-mad-esmoado-topo');
            let mr = 0, mt = 0;
            if (fix) { mr = cd === '2.00' ? 14 : 15; mt = cd === '2.00' ? 20 : 22; }
            else { mr = cd === '2.00' ? 9 : 10; mt = cd === '2.00' ? 15 : 17; }
            if (rt < mr || tp < mt) { s = 'refugo'; ti = '❌ REFUGO (ESMOADO)'; d = `Aferido: Face Reta ${rt}cm | Topo ${tp}cm\nMínimo Exigido: Face Reta ${mr}cm | Topo ${mt}cm`; ac = '🚫 AÇÃO: Esmoado (falta de canto) excessivo. Segregar dormente.'; }
            else d = `Aferido: Face Reta ${rt}cm | Topo ${tp}cm\n(Mínimos atendidos: ${mr} e ${mt} cm)`;
        } else if (fix && ['racha_topo', 'racha_centro', 'furos_nos'].includes(tipo)) {
            s = 'refugo'; ti = '❌ REFUGO'; d = 'Proibida presença de fendas, rachaduras ou furos na zona de fixação.'; ac = '🚫 AÇÃO: Segregar dormente.';
        } else if (tipo === 'racha_topo') {
            const c = V('val-mad-comp-racha'), a = V('val-mad-abert-racha');
            if (c > 15 || a > 2) { s = 'refugo'; ti = '❌ REFUGO'; d = 'Fenda excede limites (Comp. máx: 15cm | Abertura máx: 2mm).'; ac = '🚫 AÇÃO: Segregar dormente.'; }
            else d = 'Fenda de topo dentro das tolerâncias.';
        } else if (tipo === 'racha_centro') {
            const c = V('val-mad-comp-racha'), a = V('val-mad-abert-racha'), p = V('val-mad-prof-racha');
            if (c > 15 || a > 2 || p > 2) { s = 'refugo'; ti = '❌ REFUGO'; d = 'Rachadura central excede limites (Comp: 15cm | Abertura: 2mm | Prof: 2cm).'; ac = '🚫 AÇÃO: Segregar dormente.'; }
            else d = 'Rachadura central dentro das tolerâncias normativas.';
        } else if (tipo === 'furos_nos') {
            const dm = V('val-mad-diam-furo'), p = V('val-mad-prof-furo');
            if (dm > 2.5 || p >= 5) { s = 'refugo'; ti = '❌ REFUGO'; d = 'Dimensões excedem limite (Diâm máx: 2.5cm | Prof máx: < 5cm).'; ac = '🚫 AÇÃO: Segregar dormente.'; }
            else d = 'Furo de broca ou nó cariado dentro das tolerâncias.';
        } else if (tipo === 'empenamento') {
            const cd = parseFloat($('val-mad-comp-dormente').value), fl = V('val-mad-flecha'), mx = cd / 2;
            if (fl > mx) { s = 'refugo'; ti = '❌ REFUGO'; d = `Flecha (${fl} cm) excede o limite de ${mx.toFixed(1)} cm para viga de ${cd.toFixed(2)}m.`; ac = '🚫 AÇÃO: Segregar dormente para descarte.'; }
            else d = `Empenamento/Arqueamento dentro do limite aceitável (Máx: ${mx.toFixed(1)} cm).`;
        }
    }
    animarTexto('resultado-box-madeira', `${ti}\n\n📏 Análise:\n${d}\n\n${ac}\n\n📄 Procedimento: MAN DM T MTE DM 0001`, s);
}

// === SUBCOMPONENTES ===
const subDados = {
    pal_branca_tr68: { title: "Palmilha Branca TR68 FAST-CLIP", ref: "ENG-DVP-D183 / INF-FX-0003", m: [{ l: "Medida 1 (mm)", min: 187.5, max: 191.5 }, { l: "Medida 2 (mm)", min: 151, max: 155 }, { l: "Medida 3 (mm)", min: 111.5, max: 114.5 }, { l: "Medida 4 (mm)", min: 5.5, max: 7.5 }] },
    pal_verde_uic60: { title: "Palmilha Verde UIC60", ref: "ENG-DVP-D135 / INF-FX-0003", m: [{ l: "Medida 1 (mm)", min: 148.5, max: 150 }, { l: "Medida 2 (mm)", min: 113, max: 114 }, { l: "Medida 3 (mm)", min: 7.05, max: 7.55 }] },
    iso_verde_3510w: { title: "Isolador Lateral Verde 3510W", ref: "ENG-DVP-D136", m: [{ l: "Medida 1 (mm)", min: 61.5, max: 63 }, { l: "Medida 2 (mm)", min: 9.6, max: 10.2 }, { l: "Medida 3 (mm)", min: 7.4, max: 8 }] },
    iso_amarelo_3510w: { title: "Isolador Lateral Amarelo 3510W", ref: "ENG-DVP-D136", m: [{ l: "Medida 1 (mm)", min: 61.5, max: 63 }, { l: "Medida 2 (mm)", min: 9.6, max: 10.2 }, { l: "Medida 3 (mm)", min: 7.4, max: 8 }] },
    iso_preto_3502w: { title: "Isolador Lateral Preto 3502W", ref: "ENG-DVP-D084", m: [{ l: "Medida 1 (mm)", min: 61.5, max: 63 }, { l: "Medida 2 (mm)", min: 7.6, max: 8.2 }, { l: "Medida 3 (mm)", min: 7.4, max: 8 }] },
    iso_branco_pandrol: { title: "Isolador Lateral Branco 8mm (PANDROL)", ref: "ENG-DVP-D084", m: [{ l: "Medida 1 (mm)", min: 61.5, max: 63 }, { l: "Medida 2 (mm)", min: 7.6, max: 8.2 }, { l: "Medida 3 (mm)", min: 7.4, max: 8 }] },
    iso_branco_3502w: { title: "Isolador Lateral Branco 3502W", ref: "ENG-DVP-D084", m: [{ l: "Medida 1 (mm)", min: 61.5, max: 63 }, { l: "Medida 2 (mm)", min: 7.6, max: 8.2 }, { l: "Medida 3 (mm)", min: 7.4, max: 8 }] },
    usp_getzner: { title: "UNDER SLEEPER PAD - USP (GETZNER)", ref: "ENG-DVP-D131", m: [{ l: "Comprimento (mm)", min: 1360, max: 1390 }, { l: "Largura (mm)", min: 225, max: 245 }, { l: "Espessura (mm)", min: 7, max: 11 }] },
    grampo_capa_branca: { title: "Grampo W c/ isolador Capa Branca", ref: "ENG-DVP-T040", m: [{ l: "Medida 1 (mm)", min: 106.5, max: 111 }, { l: "Medida 2 (mm)", min: 15.75, max: 16.25 }, { l: "Medida 3 (mm)", min: 74.5, max: 79 }] },
    grampo_iso_frontal: { title: "Grampo W c/ isolador frontal", ref: "ENG-DVP-T040", m: [{ l: "Medida 1 (mm)", min: 106.5, max: 111 }, { l: "Medida 2 (mm)", min: 15.75, max: 16.25 }, { l: "Medida 3 (mm)", min: 74.5, max: 79 }] },
    ombreira_eclip: { title: "Ombreira E-CLIP HFOB02", ref: "ENG-DVP-D139", m: [{ l: "Medida 1 (mm)", min: 73.5, max: 76.5 }, { l: "Medida 2 (mm) [>= 24]", min: 24, max: 999999 }] },
    ombreira_fastclip: { title: "Ombreira FAST-CLIP HFOB08", ref: "ENG-DVP-D074", m: [{ l: "Medida 1 (mm)", min: 99.75, max: 102.25 }, { l: "Medida 2 (mm)", min: 58.7, max: 60.7 }, { l: "Medida 3 (mm)", min: 95.9, max: 98.1 }, { l: "Medida 4 (mm)", min: 70.3, max: 72.5 }, { l: "Medida 5 (mm)", min: 34.9, max: 36.7 }] },
    pal_verde_almofada: { title: "Palmilha Verde Almofada 6980", ref: "ENG-DVP-D135", m: [{ l: "Medida 1 (mm)", min: 148.5, max: 150 }, { l: "Medida 2 (mm)", min: 113, max: 114 }, { l: "Medida 3 (mm)", min: 7.05, max: 7.55 }] },
    pal_branca_almofada: { title: "Palmilha Branca Almofada 7552", ref: "ENG-DVP-D183", m: [{ l: "Medida 1 (mm)", min: 187.5, max: 191.5 }, { l: "Medida 2 (mm)", min: 151, max: 155 }, { l: "Medida 3 (mm)", min: 111.5, max: 114.5 }, { l: "Medida 4 (mm)", min: 5.5, max: 7.5 }] }
};

function analisarSub() {
    const cat = $('sub-categoria').value;
    if (!cat || !subDados[cat]) return;
    const item = subDados[cat];
    let s = 'aceitavel', ti = '✅ CONFORME', d = '', er = [], ac = '✅ AÇÃO: Subcomponente aprovado. Lote liberado.';

    item.m.forEach((m, i) => {
        const v = V(`val-sub-m${i + 1}`);
        if (v < m.min || v > m.max) er.push(m.max === 999999 ? `- ${m.l}: ${v}mm (Tol: Min ${m.min}mm)` : `- ${m.l}: ${v}mm (Tol: ${m.min} a ${m.max} mm)`);
    });

    if (er.length) {
        s = 'refugo'; ti = '❌ NÃO CONFORME'; d = 'Medidas fora das tolerâncias:\n' + er.join('\n'); ac = '🚫 AÇÃO: Lote dimensionalmente reprovado. Preencher RNC.';
    } else d = 'Todas as dimensões inspecionadas estão de acordo com o desenho técnico.';

    animarTexto('resultado-box-sub', `${ti}\n\n${item.title}\n\n📏 Análise:\n${d}\n\n${ac}\n\n📄 Desenho Técnico: ${item.ref}`, s);
}

// === CÂMERA ===
let currentStream = null, laudoAtualTexto = "", categoriaAtual = "", fotoDataUrl = "";

async function abrirCamera(boxId, cat) {
    const box = $(boxId);
    laudoAtualTexto = box.innerText;
    categoriaAtual = cat;
    const st = laudoAtualTexto.match(/✅|❌|🔧|⚠️|🚫/), icon = st ? st[0] : '';
    const dt = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
    $('overlay-texto-visual').innerHTML = `<strong>${icon} LAUDO RUMO - ${cat}</strong><br><span style="font-size:.7rem;opacity:.8">Data: ${dt}</span><br>${laudoAtualTexto.split('\n').slice(0, 3).join('<br>')}...`;

    showEl('camera-modal', 'flex');
    hideEl('foto-capturada');
    showEl('video-preview');
    showEl('controles-camera', 'flex');
    hideEl('controles-pos-captura');

    try {
        currentStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        $('video-preview').srcObject = currentStream;
    } catch (e) {
        alert("Erro ao acessar a câmera.");
        fecharCamera();
    }
}

function fecharCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
        currentStream = null;
    }
    hideEl('camera-modal');
}

function retomarCamera() {
    hideEl('foto-capturada');
    showEl('video-preview');
    showEl('controles-camera', 'flex');
    hideEl('controles-pos-captura');
    $('overlay-texto-visual').style.display = 'block';
}

function tirarFoto() {
    const v = $('video-preview'), c = $('canvas-render'), x = c.getContext('2d');
    c.width = v.videoWidth; c.height = v.videoHeight;
    x.drawImage(v, 0, 0, c.width, c.height);

    const u = c.width, ft = u * .028, fd = u * .0168, fb = u * .02016, pd = u * .02, lh = fb * 1.5;
    const dt = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
    const lines = laudoAtualTexto.split('\n').filter(l => l.trim()).slice(0, 10);
    const bh = lines.length * lh + ft + fd + pd * 4;
    const bw = u * .94, sx = u * .03, sy = c.height - bh - u * .03;

    x.fillStyle = "rgba(0,0,0,0.05)";
    x.beginPath(); x.roundRect(sx, sy, bw, bh, 15); x.fill();
    x.fillStyle = "#FFD600";
    x.beginPath(); x.roundRect(sx, sy, u * .01, bh, [15, 0, 0, 15]); x.fill();

    x.shadowColor = "rgba(0,0,0,1)"; x.shadowBlur = 6; x.shadowOffsetX = 2; x.shadowOffsetY = 2; x.textAlign = "center";
    const cx = c.width / 2, mw = bw - pd * 2;
    let ty = sy + pd + ft;

    x.fillStyle = "#fff"; x.font = `bold ${Math.floor(ft)}px sans-serif`;
    x.fillText(`INSPEÇÃO RUMO - ${categoriaAtual}`, cx, ty, mw);
    ty += ft + pd / 2;
    x.font = `${Math.floor(fd)}px sans-serif`; x.fillStyle = "#FFD600";
    x.fillText(dt, cx, ty, mw); ty += pd;
    x.fillStyle = "#fff"; x.font = `bold ${Math.floor(fb)}px sans-serif`;
    lines.forEach(l => { x.fillText(l, cx, ty, mw); ty += lh; });

    fotoDataUrl = c.toDataURL('image/jpeg', .85);
    $('foto-capturada').src = fotoDataUrl;
    showEl('foto-capturada'); hideEl('video-preview');
    $('overlay-texto-visual').style.display = 'none';
    hideEl('controles-camera'); showEl('controles-pos-captura', 'flex');
}

function baixarFotoCarimbada() {
    if (!fotoDataUrl) return;
    const a = document.createElement('a');
    a.href = fotoDataUrl;
    a.download = `Laudo_${categoriaAtual}_${Date.now()}.jpg`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    alert("✅ Foto salva na sua galeria!");
}

async function compartilharFotoCarimbada() {
    if (!fotoDataUrl) return;
    const r = await fetch(fotoDataUrl);
    const b = await r.blob();
    const f = new File([b], "laudo_inspecao.jpg", { type: "image/jpeg" });
    if (navigator.share && navigator.canShare({ files: [f] })) {
        try { await navigator.share({ files: [f], title: 'Laudo Rumo', text: `Evidência de Inspeção - ${categoriaAtual}` }); } catch (e) { }
    } else {
        alert("⚠️ Seu navegador não suporta envio direto de imagem. Clique em SALVAR e envie pelo WhatsApp.");
    }
}

function compartilharWhatsApp(boxId, cat) {
    const t = $(boxId).innerText;
    const d = new Date().toLocaleDateString('pt-BR');
    const h = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    window.open(`https://wa.me/?text=${encodeURIComponent(`*INSPEÇÃO DE QUALIDADE - RUMO*\n📍 *Categoria:* ${cat}\n📅 *Data:* ${d} às ${h}\n\n${t}`)}`, '_blank');
}

// === LOCAL STORAGE ===
function salvarDadosLocal() {
    const inputs = document.querySelectorAll('input:not([type="password"]),select');
    const d = {};
    inputs.forEach(i => {
        if (i.id) d[i.id] = i.type === 'checkbox' ? i.checked : i.value;
    });
    d.sessao_ativa = true;
    localStorage.setItem('rumoInspeccaoDados', JSON.stringify(d));
}

function carregarDadosLocal() {
    const s = localStorage.getItem('rumoInspeccaoDados');
    if (s) {
        const d = JSON.parse(s);
        for (const id in d) {
            const el = $(id);
            if (el) {
                if (el.type === 'checkbox') el.checked = d[id];
                else el.value = d[id];
            }
        }
        if (d['tipo-defeito']) atualizarOpcoes();
        ['amv-componente', 'mad-categoria', 'brita-categoria', 'sub-categoria', 'report-semana', 'report-area'].forEach(id => {
            if (d[id]) {
                const el = $(id);
                if (el) el.dispatchEvent(new Event('change'));
            }
        });
        if (d.sessao_ativa) {
            hideEl('login-screen');
            showEl('main-layout', 'flex');
            if (innerWidth <= 768) {
                $('sidebar').classList.add('hidden');
                showEl('toggle-sidebar-btn', 'flex');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosLocal();
    document.querySelectorAll('input:not([type="password"]),select').forEach(i => {
        i.addEventListener('change', salvarDadosLocal);
        i.addEventListener('input', salvarDadosLocal);
    });
    window.onclick = e => {
        if (e.target === $('modal-ajuda-visual')) fecharAjuda();
    };
});
