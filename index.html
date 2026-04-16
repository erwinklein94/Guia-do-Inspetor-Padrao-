// === FUNÇÕES AUXILIARES ===
function getVal(id) { return parseFloat(document.getElementById(id).value) || 0; }
function hideAll(selector) { document.querySelectorAll(selector).forEach(el => el.classList.add('escondido')); }
function showEl(id, type = 'block') { const el = document.getElementById(id); if(el) { el.classList.remove('escondido'); el.style.display = type; } }
function hideEl(id) { const el = document.getElementById(id); if(el) { el.classList.add('escondido'); } }

// === AUTENTICAÇÃO E NAVEGAÇÃO ===
function validarAcesso() {
    if (document.getElementById('user-password').value.trim() === '1272') {
        hideEl('login-screen'); showEl('main-layout', 'flex');
        if (window.innerWidth <= 768) { document.getElementById('sidebar').classList.add('hidden'); showEl('toggle-sidebar-btn', 'flex'); }
    } else { showEl('error-msg'); }
}

function fazerLogout() { 
    if (confirm("Deseja realmente sair e limpar os dados locais?")) {
        localStorage.removeItem('rumoInspeccaoDados');
        window.location.reload();
    }
}

function navegar(elemento, idSecao) {
    document.querySelectorAll('.content-section, .menu-item').forEach(el => el.classList.remove('active'));
    document.getElementById(idSecao).classList.add('active');
    elemento.classList.add('active');
    if (window.innerWidth <= 768) { document.getElementById('sidebar').classList.add('hidden'); showEl('toggle-sidebar-btn', 'flex'); }
}
function toggleSidebar() { document.getElementById('sidebar').classList.remove('hidden'); hideEl('toggle-sidebar-btn'); }

// === REPORT SEMANAL (DADOS DOS DASHBOARDS) ===
const dadosReport = {
    "15": {
        "amv": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Peças Inspecionadas</div><div class="stat-value">11</div></div>
                <div class="stat-card"><div class="stat-label">Solicitação de Ajustes</div><div class="stat-value warning">9</div></div>
                <div class="stat-card"><div class="stat-label">Reprovadas</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Aderência de Inspeção</div><div class="stat-value success">100%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Inspecionadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Ibrafer</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 81%;"></div></div>
                    <div class="chart-value">9</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">BR Parts</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 19%;"></div></div>
                    <div class="chart-value">2</div>
                </div>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado</div><div class="stat-value">3687</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">3626</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">61</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 15)</div><div class="stat-value success">95.3%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Reprovas no Detalhado (Cavan)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Vazios</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 67.2%;"></div></div>
                    <div class="chart-value">41</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Outros</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 18%;"></div></div>
                    <div class="chart-value">11</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Trincas</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 11.4%;"></div></div>
                    <div class="chart-value">7</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Quebras / USP</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 3.2%;"></div></div>
                    <div class="chart-value">2</div>
                </div>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Inspecionados</div><div class="stat-value">1365</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">1294</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">71</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 15)</div><div class="stat-value success">95%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Reprovadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi Madeiras</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 67.6%;"></div></div>
                    <div class="chart-value">48</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Tres Guri</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 32.4%;"></div></div>
                    <div class="chart-value">23</div>
                </div>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">52</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">48</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">4</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 15)</div><div class="stat-value success">92%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo (Aprovados vs Reprovados)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 92.3%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 7.7%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">39</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 92.3%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 7.7%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">13</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total de Registros (RNCs)</div><div class="stat-value">20</div></div>
                <div class="stat-card"><div class="stat-label">Concluídos</div><div class="stat-value success">17</div></div>
                <div class="stat-card"><div class="stat-label">Em Andamento</div><div class="stat-value warning">1</div></div>
                <div class="stat-card"><div class="stat-label">Cancelados</div><div class="stat-value danger">2</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Registros por Fornecedor (Top 1)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 100%;"></div></div>
                    <div class="chart-value">19</div>
                </div>
            </div>
        `
    },
    "14": {
        "amv": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Peças Inspecionadas</div><div class="stat-value">40</div></div>
                <div class="stat-card"><div class="stat-label">Solicitação de Ajustes</div><div class="stat-value warning">7</div></div>
                <div class="stat-card"><div class="stat-label">Reprovadas</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Aderência de Inspeção</div><div class="stat-value success">100%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Inspecionadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">BR Parts</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 100%;"></div></div>
                    <div class="chart-value">40</div>
                </div>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado</div><div class="stat-value">4.660</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">4.452</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">208</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 14)</div><div class="stat-value success">95,54%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Reprovas no Detalhado (Cavan)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Trincas</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 88.7%;"></div></div>
                    <div class="chart-value">182</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Vazios</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 4.9%;"></div></div>
                    <div class="chart-value">10</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Quebras</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 4.9%;"></div></div>
                    <div class="chart-value">10</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Outros</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 1.5%;"></div></div>
                    <div class="chart-value">3</div>
                </div>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Inspecionados</div><div class="stat-value">1.782</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">1.476</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">306</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 14)</div><div class="stat-value warning">86%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Reprovadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 69.6%;"></div></div>
                    <div class="chart-value">213</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Larssen</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 20.6%;"></div></div>
                    <div class="chart-value">63</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ricken</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 6.2%;"></div></div>
                    <div class="chart-value">19</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Tres Guri</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 3.6%;"></div></div>
                    <div class="chart-value">11</div>
                </div>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">24</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">24</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 14)</div><div class="stat-value success">100%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill success" style="width: 100%;"></div></div>
                    <div class="chart-value">18</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill success" style="width: 100%;"></div></div>
                    <div class="chart-value">6</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total de Registros (RNCs)</div><div class="stat-value">78</div></div>
                <div class="stat-card"><div class="stat-label">Concluídos</div><div class="stat-value success">63</div></div>
                <div class="stat-card"><div class="stat-label">Em Andamento</div><div class="stat-value warning">10</div></div>
                <div class="stat-card"><div class="stat-label">Cancelados</div><div class="stat-value danger">5</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Registros por Fornecedor (Top 5)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 100%;"></div></div>
                    <div class="chart-value">17</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Larssen</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 88%;"></div></div>
                    <div class="chart-value">15</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ricken</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 64%;"></div></div>
                    <div class="chart-value">11</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Garcia</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 47%;"></div></div>
                    <div class="chart-value">8</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Tratanorte</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 29%;"></div></div>
                    <div class="chart-value">5</div>
                </div>
            </div>
        `
    },
    "13": {
        "amv": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Peças Inspecionadas</div><div class="stat-value">52</div></div>
                <div class="stat-card"><div class="stat-label">Solicitação de Ajustes</div><div class="stat-value warning">22</div></div>
                <div class="stat-card"><div class="stat-label">Reprovadas</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Aderência de Inspeção</div><div class="stat-value success">98%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Inspecionadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">BR Parts</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 71.1%;"></div></div>
                    <div class="chart-value">37</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ibrafer</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 15.3%;"></div></div>
                    <div class="chart-value">8</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Hewitt</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 13.6%;"></div></div>
                    <div class="chart-value">7</div>
                </div>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado</div><div class="stat-value">-</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">-</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados (Cavan)</div><div class="stat-value danger">33</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 13)</div><div class="stat-value success">99,3%</div></div>
            </div>
            <div class="stat-card" style="text-align:center; padding: 20px; grid-column: 1 / -1; margin-bottom: 15px;">
                <p style="color:var(--text-muted); font-size: 0.95rem;">Detalhamento por defeito (Vazios, Trincas, etc.) não apresentado isoladamente nas imagens fonte da Semana 13.</p>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Inspecionados</div><div class="stat-value">1.064</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">955</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">109</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 13)</div><div class="stat-value success">91%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Reprovadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 53.2%;"></div></div>
                    <div class="chart-value">58</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ricken</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 42.2%;"></div></div>
                    <div class="chart-value">46</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Tres Guri</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 4.6%;"></div></div>
                    <div class="chart-value">5</div>
                </div>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">71</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">62</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">9</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 13)</div><div class="stat-value warning">87%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo (Aprovados vs Reprovados)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 90.7%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 9.3%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">54</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 76.5%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 23.5%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">17</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total de Registros (RNCs)</div><div class="stat-value">77</div></div>
                <div class="stat-card"><div class="stat-label">Concluídos</div><div class="stat-value success">63</div></div>
                <div class="stat-card"><div class="stat-label">Em Andamento</div><div class="stat-value warning">9</div></div>
                <div class="stat-card"><div class="stat-label">Cancelados</div><div class="stat-value danger">5</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Registros por Fornecedor (Top 1)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 100%;"></div></div>
                    <div class="chart-value">17</div>
                </div>
            </div>
        `
    },
    "12": {
        "amv": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Peças Inspecionadas</div><div class="stat-value">26</div></div>
                <div class="stat-card"><div class="stat-label">Solicitação de Ajustes</div><div class="stat-value warning">10</div></div>
                <div class="stat-card"><div class="stat-label">Reprovadas</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Aderência de Inspeção</div><div class="stat-value success">100%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Inspecionadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Tempo</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 42.3%;"></div></div>
                    <div class="chart-value">11</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">BR Parts</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 26.9%;"></div></div>
                    <div class="chart-value">7</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Panfer</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 23.1%;"></div></div>
                    <div class="chart-value">6</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ibrafer</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 7.7%;"></div></div>
                    <div class="chart-value">2</div>
                </div>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado</div><div class="stat-value">5.177</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">5.153</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">24</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 12)</div><div class="stat-value success">99,54%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Reprovas no Detalhado (Cavan)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Vazios</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 100%;"></div></div>
                    <div class="chart-value">21</div>
                </div>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Inspecionados</div><div class="stat-value">2.664</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">2.370</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">294</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 12)</div><div class="stat-value success">90%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Reprovadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 43.2%;"></div></div>
                    <div class="chart-value">127</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">J. Maier</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 33%;"></div></div>
                    <div class="chart-value">97</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ricken</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 21.4%;"></div></div>
                    <div class="chart-value">63</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Granoski</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 2.4%;"></div></div>
                    <div class="chart-value">7</div>
                </div>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">36</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">36</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 12)</div><div class="stat-value success">100%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill success" style="width: 100%;"></div></div>
                    <div class="chart-value">27</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill success" style="width: 100%;"></div></div>
                    <div class="chart-value">9</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total de Registros (RNCs)</div><div class="stat-value">77</div></div>
                <div class="stat-card"><div class="stat-label">Concluídos</div><div class="stat-value success">63</div></div>
                <div class="stat-card"><div class="stat-label">Em Andamento</div><div class="stat-value warning">9</div></div>
                <div class="stat-card"><div class="stat-label">Cancelados</div><div class="stat-value danger">5</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Registros por Fornecedor (Top 1)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 100%;"></div></div>
                    <div class="chart-value">17</div>
                </div>
            </div>
        `
    },
    "11": {
        "amv": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Dados Não Disponibilizados</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Painel AMV não disponibilizado nas fontes desta semana.</p>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado (Cavan)</div><div class="stat-value">4.092</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">4.081</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">11</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 11)</div><div class="stat-value success">99,73%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Reprovas no Detalhado (Cavan)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Vazios</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 40%;"></div></div>
                    <div class="chart-value">4</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Trincas</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 30%;"></div></div>
                    <div class="chart-value">3</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Outros</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 20%;"></div></div>
                    <div class="chart-value">2</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Quebras</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 10%;"></div></div>
                    <div class="chart-value">1</div>
                </div>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 11)</div><div class="stat-value success">91%</div></div>
            </div>
            <div class="stat-card" style="text-align:center; padding: 20px; grid-column: 1 / -1; margin-bottom: 15px;">
                <p style="color:var(--text-muted); font-size: 0.95rem;">Painel detalhado com volume de inspecionados/aprovados e quebra por fornecedor não disponibilizado.</p>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">40</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">37</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">3</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 11)</div><div class="stat-value success">92,5%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo (Aprovados vs Reprovados)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 96.6%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 3.3%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">30</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 80%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 20%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">10</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total de Registros (RNCs)</div><div class="stat-value">76</div></div>
                <div class="stat-card"><div class="stat-label">Concluídos</div><div class="stat-value success">63</div></div>
                <div class="stat-card"><div class="stat-label">Em Andamento</div><div class="stat-value warning">8</div></div>
                <div class="stat-card"><div class="stat-label">Cancelados</div><div class="stat-value danger">5</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Registros por Fornecedor (Top 1)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill warning" style="width: 100%;"></div></div>
                    <div class="chart-value">17</div>
                </div>
            </div>
        `
    },
    "10": {
        "amv": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Peças Inspecionadas</div><div class="stat-value">11</div></div>
                <div class="stat-card"><div class="stat-label">Solicitação de Ajustes</div><div class="stat-value warning">3</div></div>
                <div class="stat-card"><div class="stat-label">Reprovadas</div><div class="stat-value danger">0</div></div>
                <div class="stat-card"><div class="stat-label">Aderência de Inspeção</div><div class="stat-value danger">69%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Inspecionadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">BR Parts</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: 100%;"></div></div>
                    <div class="chart-value">11</div>
                </div>
            </div>
        `,
        "concreto": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Total Fabricado (Cavan)</div><div class="stat-value">3.288</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">3.280</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">8</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 10)</div><div class="stat-value success">99,75%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Reprovas no Detalhado (Cavan)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Vazios</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 66.6%;"></div></div>
                    <div class="chart-value">2</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Quebras</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 33.3%;"></div></div>
                    <div class="chart-value">1</div>
                </div>
            </div>
        `,
        "madeira": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Inspecionados</div><div class="stat-value">3.332</div></div>
                <div class="stat-card"><div class="stat-label">Aprovados</div><div class="stat-value success">2.891</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">441</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 10)</div><div class="stat-value warning">89%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Peças Reprovadas por Fornecedor</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Larssen</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 49.2%;"></div></div>
                    <div class="chart-value">217</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Pandolfi</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 32.4%;"></div></div>
                    <div class="chart-value">143</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ricken</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 12.9%;"></div></div>
                    <div class="chart-value">57</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">Ecoline</div>
                    <div class="chart-bar-bg"><div class="chart-bar-fill danger" style="width: 5.4%;"></div></div>
                    <div class="chart-value">24</div>
                </div>
            </div>
        `,
        "lastro": `
            <div class="dashboard-grid">
                <div class="stat-card"><div class="stat-label">Ensaios Realizados</div><div class="stat-value">64</div></div>
                <div class="stat-card"><div class="stat-label">Ensaios Aprovados</div><div class="stat-value success">61</div></div>
                <div class="stat-card"><div class="stat-label">Reprovados</div><div class="stat-value danger">3</div></div>
                <div class="stat-card"><div class="stat-label">Tx Aprovação (Sem. 10)</div><div class="stat-value success">95,31%</div></div>
            </div>
            <div class="chart-container">
                <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-title); text-align: center;">Quantidade de Ensaios por Tipo (Aprovados vs Reprovados)</h3>
                <div class="chart-bar-row">
                    <div class="chart-label">Granulometria</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 97.9%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 2.1%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">48</div>
                </div>
                <div class="chart-bar-row">
                    <div class="chart-label">F. Fragmentos</div>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill success" style="width: 87.5%; float: left; border-radius: 8px 0 0 8px;"></div>
                        <div class="chart-bar-fill danger" style="width: 12.5%; float: left; border-radius: 0 8px 8px 0;"></div>
                    </div>
                    <div class="chart-value">16</div>
                </div>
            </div>
        `,
        "sub": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Sem Dados de Subcomponentes</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Nenhum dado de inspeção de Subcomponentes Metálicos/Plásticos disponível por enquanto.</p>
            </div>
        `,
        "rnc": `
            <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                <h3 style="color:var(--text-title); margin-bottom: 10px;">Dados Não Disponibilizados</h3>
                <p style="color:var(--text-muted); font-size: 0.95rem;">Painel de RNC acumulativo não especificado/disponível para a semana 10.</p>
            </div>
        `
    }
};

function atualizarReport() {
    const semana = document.getElementById('report-semana').value;
    const area = document.getElementById('report-area').value;
    const container = document.getElementById('report-content');
    
    if (area) {
        if (dadosReport[semana] && dadosReport[semana][area]) {
            container.innerHTML = dadosReport[semana][area];
        } else {
            container.innerHTML = `
                <div class="stat-card" style="text-align:center; padding: 40px; grid-column: 1 / -1;">
                    <h3 style="color:var(--text-title); margin-bottom: 10px;">Dados da Semana ${semana} não disponíveis ainda.</h3>
                    <p style="color:var(--text-muted); font-size: 0.95rem;">Por favor, selecione outra área ou semana para visualização.</p>
                </div>
            `;
        }
        showEl('report-content');
    } else {
        hideEl('report-content');
    }
}

// === AJUDA VISUAL ===
const descricoesAjuda = {
    'agulha': { titulo: 'Ponta da Agulha (Perfil 5100)', desc: 'Meça a espessura da ponta da agulha a exatos 15mm do início da usinagem. O desgaste não pode exceder o estipulado na norma AREMA.' },
    'jacare_canal': { titulo: 'Jacaré - Canal', desc: 'A profundidade do canal deve ser aferida no núcleo do jacaré de aço manganês, garantindo passagem segura do friso da roda.' },
    'nao_cubica': { titulo: 'Britas Não-Cúbicas', desc: 'Britas lamelares ou alongadas reduzem o intertravamento do lastro. Separe as pedras que visivelmente têm uma dimensão muito maior que as outras para amostragem.' },
    'loc_dormente': { titulo: 'Localização do Defeito', desc: 'Apoio: Área diretamente abaixo da chapa/trilho. Testeira: As extremidades do dormente. Fora de Apoio: Região central livre.' },
    'def_madeira': { titulo: 'Tipos de Fenda', desc: 'Fenda de Topo: Inicia na face externa e entra na madeira. Rachadura de Centro: Abertura longitudinal no meio do dormente, não alcançando as bordas.' }
};
function abrirAjuda(chave) {
    if(descricoesAjuda[chave]) {
        document.getElementById('modal-titulo').innerText = descricoesAjuda[chave].titulo;
        document.getElementById('modal-desc').innerText = descricoesAjuda[chave].desc;
        showEl('modal-ajuda-visual', 'flex');
    }
}
function fecharAjuda() { hideEl('modal-ajuda-visual'); }

// === INTERFACE GERAL ===
function atualizarInterface(modulo) {
    hideEl(`resultado-box-${modulo.split('_')[0]}`);
    hideEl(`botoes-acao-${modulo.split('_')[0]}`);
    
    if (modulo === 'amv') {
        const comp = document.getElementById('amv-componente').value;
        hideAll('[id^="amv-inputs-"]'); hideEl('btn-amv');
        if(comp) { showEl(`amv-inputs-${comp}`, 'grid'); showEl('btn-amv'); }
    } 
    else if (modulo === 'brita') {
        const cat = document.getElementById('brita-categoria').value;
        hideEl('brita-check-visual'); hideEl('brita-inputs-lote'); hideEl('brita-inputs-granulometria'); hideEl('brita-inputs-lab'); hideEl('btn-brita');
        
        if(cat === 'visual') { showEl('brita-check-visual', 'flex'); showEl('btn-brita'); }
        else if (cat === 'forma_lote') { showEl('brita-inputs-lote', 'grid'); showEl('btn-brita'); }
        else if (cat === 'granulometria') { showEl('brita-inputs-granulometria'); showEl('btn-brita'); }
        else if (cat === 'laboratorio') { showEl('brita-inputs-lab'); showEl('btn-brita'); }
    }
    else if (modulo === 'madeira') {
        const cat = document.getElementById('mad-categoria').value;
        hideEl('mad-inputs-fisico'); hideEl('mad-inputs-defeito'); hideEl('btn-madeira');
        if(cat === 'fisico') { showEl('mad-inputs-fisico', 'grid'); showEl('btn-madeira'); }
        else if(cat === 'defeito') { showEl('mad-inputs-defeito'); atualizarInterface('madeira_sub'); }
    }
    else if (modulo === 'madeira_sub') {
        const tipo = document.getElementById('mad-tipo-defeito').value;
        hideEl('mad-check-fixacao'); hideEl('mad-dims-racha'); hideEl('mad-dims-furos'); hideEl('mad-dims-empenamento'); hideEl('mad-div-prof-racha');
        hideEl('mad-dims-esmoado'); hideEl('mad-dims-dimensoes'); hideEl('btn-madeira');
        
        if(!tipo) return;
        
        showEl('btn-madeira');
        if(tipo !== 'empenamento' && tipo !== 'podre' && tipo !== 'casca' && tipo !== 'anti_rachante' && tipo !== 'amarracao' && tipo !== 'dimensoes') {
            showEl('mad-check-fixacao', 'flex');
        }
        
        if(tipo === 'racha_topo') showEl('mad-dims-racha', 'grid');
        else if(tipo === 'racha_centro') { showEl('mad-dims-racha', 'grid'); showEl('mad-div-prof-racha'); }
        else if(tipo === 'furos_nos') showEl('mad-dims-furos', 'grid');
        else if(tipo === 'empenamento') showEl('mad-dims-empenamento', 'grid');
        else if(tipo === 'esmoado') showEl('mad-dims-esmoado', 'grid');
        else if(tipo === 'dimensoes') showEl('mad-dims-dimensoes', 'block');
    }
    else if (modulo === 'sub') {
        const cat = document.getElementById('sub-categoria').value;
        const container = document.getElementById('sub-inputs-container');
        container.innerHTML = ''; hideEl('sub-inputs-container'); hideEl('btn-sub');
        if(cat && subDados[cat]) {
            subDados[cat].m.forEach((medida, index) => {
                container.innerHTML += `<div class="form-group"><label>${medida.l}:</label><input type="number" id="val-sub-m${index+1}" step="0.01"></div>`;
            });
            showEl('sub-inputs-container', 'grid'); showEl('btn-sub');
        }
    }
}

// === ANIMAÇÃO DO LAUDO ===
function animarTexto(boxId, textoFinal, statusClass) {
    const box = document.getElementById(boxId);
    box.className = `resultado-box ${statusClass}`;
    box.style.display = 'block';
    box.innerHTML = '';
    
    const secaoAtual = boxId.split('-')[2];
    hideEl(`botoes-acao-${secaoAtual}`);
    
    const aviso = box.parentElement.querySelector('.aviso-normativo');
    if(aviso) aviso.style.display = 'none';
    
    let i = 0; const speed = 10;
    function digitar() {
        if (i < textoFinal.length) {
            box.innerHTML += textoFinal.charAt(i) === '\n' ? '<br>' : textoFinal.charAt(i);
            i++; setTimeout(digitar, speed);
        } else {
            showEl(`botoes-acao-${secaoAtual}`, 'grid');
            if(aviso) aviso.style.display = 'block';
        }
    }
    digitar();
}

// === LÓGICAS DE ANÁLISE DETALHADA ===

// 1. CONCRETO
const optLocal = {
    vazio: [{val: 'apoio', txt: 'Apoio do Trilho'}, {val: 'fora_apoio', txt: 'Fora da Região do Trilho'}, {val: 'testeira', txt: 'Testeira'}],
    quebra: [{val: 'lat_sup', txt: 'Laterais / Superior (fora trilho)'}, {val: 'testeira', txt: 'Testeira'}],
    fissura: [{val: 'ombreira', txt: 'Ombreira'}, {val: 'lateral', txt: 'Lateral'}, {val: 'transversal', txt: 'Transversal'}]
};

function atualizarOpcoes() {
    const tipo = document.getElementById('tipo-defeito').value;
    const selLocal = document.getElementById('localizacao');
    selLocal.innerHTML = '<option value="">Selecione a região...</option>';
    if (tipo && optLocal[tipo]) optLocal[tipo].forEach(opt => selLocal.innerHTML += `<option value="${opt.val}">${opt.txt}</option>`);
    atualizarCampos();
}

function atualizarCampos() {
    const tipo = document.getElementById('tipo-defeito').value;
    const local = document.getElementById('localizacao').value;
    hideEl('dimensoes-inputs'); hideEl('container-aco');
    hideAll('#dimensoes-inputs .form-group');
    if (!local) return;
    
    showEl('dimensoes-inputs', 'grid');
    if (tipo === 'vazio') {
        showEl('div-profundidade'); showEl('div-comprimento'); showEl('div-largura');
        if (local === 'testeira') showEl('container-aco', 'flex');
    } else if (tipo === 'quebra') {
        showEl('div-profundidade'); showEl('div-comprimento'); showEl('div-largura'); showEl('container-aco', 'flex');
    } else if (tipo === 'fissura') {
        if (local === 'lateral' || local === 'transversal') { showEl('div-espessura'); showEl('div-comprimento'); } 
        else hideEl('dimensoes-inputs');
    }
}

function analisarDefeito() {
    const tipo = document.getElementById('tipo-defeito').value;
    const local = document.getElementById('localizacao').value;
    const prof = getVal('val-profundidade'); const comp = getVal('val-comprimento'); const larg = getVal('val-largura'); const esp = getVal('val-espessura');
    const acoExposto = document.getElementById('aco-exposto').checked;
    
    let status = 'aceitavel', titulo = '✅ ACEITÁVEL', dim = '', ref = '', acao = '✅ AÇÃO: Liberar lote para aplicação.';
    
    if (tipo === 'vazio') {
        if (local === 'apoio') {
            ref = 'Tabela 1';
            if (prof <= 2 && comp <= 3 && larg <= 3) dim = 'Profundidade ≤2 mm | Comprimento ≤3 mm | Largura ≤3 mm';
            else if (prof <= 5 && comp <= 10 && larg <= 10) { status = 'reparar'; titulo = '🔧 REPARAR'; dim = 'Profundidade 3-5 mm | Comprimento 4-10 mm | Largura 4-10 mm'; acao = '⚠️ AÇÃO: Executar reparo com argamassa epóxi antes da liberação.'; }
            else { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Profundidade >6 mm | Comprimento >11 mm | Largura >11 mm'; acao = '🚫 AÇÃO: Segregar dormente e preencher RNC imediata.'; }
        } else if (local === 'fora_apoio') {
            ref = 'Tabela 2';
            if (prof <= 5 && comp <= 5 && larg <= 5) dim = 'Profundidade ≤5 mm | Comprimento ≤5 mm | Altura ≤5 mm';
            else if (prof <= 10 && comp <= 20 && larg <= 20) { status = 'reparar'; titulo = '🔧 REPARAR'; dim = 'Profundidade 6-10 mm | Comprimento 6-20 mm | Altura 6-20 mm'; acao = '⚠️ AÇÃO: Executar reparo na superfície.'; }
            else { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Profundidade >11 mm | Comprimento >21 mm | Altura >21 mm'; acao = '🚫 AÇÃO: Segregar dormente e preencher RNC imediata.'; }
        } else if (local === 'testeira') {
            ref = 'Página 15-16';
            if (acoExposto && prof >= 31) { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Exposição de armadura tolerável: até 30 mm'; acao = '🚫 AÇÃO: Risco estrutural. Sucatar peça.'; }
            else if (!acoExposto && prof <= 50) { status = 'reparar'; titulo = '🔧 REPARAR'; dim = 'Profundidade máxima reparável: 50 mm'; acao = '⚠️ AÇÃO: Necessário preenchimento da testeira.'; }
            else { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Profundidade >51 mm'; acao = '🚫 AÇÃO: Segregar dormente e preencher RNC.'; }
        }
    } else if (tipo === 'quebra') {
        ref = local === 'lat_sup' ? 'Tabela 3' : 'Tabela 4';
        if (acoExposto) { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Qualquer exposição de armadura ativa = refugo'; acao = '🚫 AÇÃO: Armadura comprometida. Refugar.'; }
        else if (prof <= 10 && comp <= 49 && larg <= 29) dim = 'Prof. ≤10 mm | Comp. ≤49 mm | Alt. ≤29 mm';
        else if (prof <= 20 && comp <= 200 && larg <= 150) { status = 'reparar'; titulo = '🔧 REPARAR'; dim = 'Prof. 11-20 mm | Comp. 50-200 mm | Alt. 30-150 mm'; acao = '⚠️ AÇÃO: Reparo mandatório da quebra.'; }
        else { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Prof. >21 mm | Comp. >201 mm | Alt. >151 mm'; acao = '🚫 AÇÃO: Quebra excessiva. Abrir RNC.'; }
    } else if (tipo === 'fissura') {
        ref = 'Tabela 5';
        if (local === 'ombreira') { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Fissura na ombreira = refugo'; acao = '🚫 AÇÃO: Refugo sumário.'; }
        else if (local === 'lateral' || local === 'transversal') {
            if (esp <= 0.10 && comp <= 10) dim = 'Espessura ≤0,10 mm | Comprimento ≤10 mm';
            else if (esp <= 0.50 && comp <= 100) { status = 'reparar'; titulo = '🔧 REPARAR'; dim = 'Espessura 0,15-0,50 mm | Comprimento 11-100 mm'; acao = '⚠️ AÇÃO: Injeção de epóxi necessária.'; }
            else { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Espessura ≥0,55 mm | Comprimento >101 mm'; acao = '🚫 AÇÃO: Fissura estrutural grave. Refugar.'; }
        }
    }
    animarTexto('resultado-box-concreto', `${titulo}\n\n📏 Análise:\n${dim}\n\n${acao}\n\n📄 PO-SPE-160 (${ref})`, status);
}

// 2. AMV
function analisarAMV() {
    const comp = document.getElementById('amv-componente').value;
    let status = 'aceitavel', titulo = '✅ CONFORME', dim = '', ref = '', acao = '✅ AÇÃO: Componente liberado para montagem/operação.';
    
    if (comp === 'agulha') {
        const ponta = getVal('val-amv-ponta'); ref = 'ETMs 0005, 0007, 0008, 0009';
        if (ponta <= 3.9) { 
            dim = 'Ponta de agulha dentro da tolerância.\n(Nominal AREMA: 3.1mm + Tol: 0.8mm)';
            if (ponta >= 3.7) { dim += '\n⚠️ ALERTA DE TENDÊNCIA: Desgaste próximo ao limite crítico.'; acao = '⚠️ AÇÃO: Liberado, mas programar monitoramento.'; }
        }
        else { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = 'Ponta de agulha acima da tolerância máxima (3.9mm). Desgaste excessivo.'; acao = '🚫 AÇÃO: Risco de descarrilamento. Bloquear e substituir.'; }
    } else if (comp === 'rolete') {
        const altura = getVal('val-amv-altura-rolete'); ref = 'EM-SPE-072 (Item 5.2)';
        if (altura <= 2.0) dim = 'Altura do rolete atende aos requisitos (≤ 2.0mm em relação à base da agulha).';
        else { status = 'reparar'; titulo = '🔧 NECESSITA CALIBRAÇÃO'; dim = 'Altura superior a 2.0 mm.'; acao = '⚠️ AÇÃO: Acionar equipe de via para recalibrar a altura.'; }
    } else if (comp === 'coxin') {
        const dureza = getVal('val-amv-coxin'); ref = 'EM-SPE-072 (Item 5.3.1)';
        if (dureza >= 88 && dureza <= 92) dim = 'Dureza Shore A do coxin atende aos requisitos (88 a 92).';
        else { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = 'Dureza fora da tolerância exigida (Min: 88 | Max: 92).'; acao = '🚫 AÇÃO: Rejeitar lote de coxins. Retornar ao fornecedor.'; }
    } else if (comp === 'jacare_canal') {
        const prof = getVal('val-amv-jacare-canal'); ref = 'ETMs 0005, 0007, 0008, 0009';
        if (prof >= 51.0 && prof <= 55.0) dim = 'Profundidade do canal conforme (53 ± 2 mm).';
        else { status = 'reparar'; titulo = '🔧 NECESSITA REPARO'; dim = 'Profundidade fora da tolerância (Min: 51 mm | Max: 55 mm).'; acao = '⚠️ AÇÃO: Solicitar esmerilhamento ou preenchimento de solda.'; }
    } else if (comp === 'jacare_dureza') {
        const dureza = getVal('val-amv-jacare-dureza'); ref = 'ETMs 0008, 0009';
        if (dureza >= 352 && dureza <= 418) dim = 'Dureza Brinell atende aos requisitos (352 a 418 HB).';
        else { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = 'Dureza fora da tolerância exigida (Min: 352 HB | Max: 418 HB).'; acao = '🚫 AÇÃO: Bloquear lote do Jacaré e abrir RNC.'; }
    } else if (comp === 'fixacao_concreto') {
        const pressao = getVal('val-amv-fixacao'); ref = 'ENG-DSV-VP-ETM-A0019';
        if (pressao >= 900 && pressao <= 1500) dim = 'Pressão do grampo atende aos requisitos (Exigido: 1200 ± 300 kgf).';
        else { status = 'reparar'; titulo = '🔧 VERIFICAR FIXAÇÃO'; dim = 'Pressão do grampo fora da faixa (900 a 1500 kgf).'; acao = '⚠️ AÇÃO: Substituir grampos fadigados na região.'; }
    } else if (comp === 'cilindro') {
        const pressao = getVal('val-amv-pressao'), tempo = getVal('val-amv-tempo'); ref = 'EM-SPE-026';
        if (pressao >= 500 && tempo >= 10 && tempo <= 12) dim = 'Pressão e tempo de acionamento em conformidade (Mín 500kgf, 10-12s).';
        else { status = 'reparar'; titulo = '🔧 REGULAR CILINDRO'; dim = 'Parâmetros fora da norma estabelecida.'; acao = '⚠️ AÇÃO: Ajuste de válvula do cilindro pela manutenção.'; }
    } else if (comp === 'batefica') {
        const deslocamento = getVal('val-amv-deslocamento'); ref = 'EM-SPE-017';
        if (deslocamento >= 100 && deslocamento <= 121) dim = 'Deslocamento da agulha operando adequadamente (100 a 121 mm).';
        else { status = 'reparar'; titulo = '🔧 NECESSITA AJUSTE'; dim = 'Deslocamento fora da tolerância (100 mm a 121 mm).'; acao = '⚠️ AÇÃO: Calibrar hastes do aparelho Bate-Fica.'; }
    }
    animarTexto('resultado-box-amv', `${titulo}\n\n📏 Análise:\n${dim}\n\n${acao}\n\n📄 Lote ETM-AMV (${ref})`, status);
}

// 3. BRITA
function analisarBrita() {
    const cat = document.getElementById('brita-categoria').value;
    const lito = document.getElementById('brita-litologia').value;
    let status = 'aceitavel', titulo = '✅ CONFORME', dim = '', acao = '✅ AÇÃO: Lote de brita liberado para lastramento.';

    if (cat === 'visual') {
        if (document.getElementById('brita-presenca-finos').checked) { status = 'refugo'; titulo = '❌ NÃO ACEITAR (REFUGO)'; dim = 'Lastro Contaminado: Presença visível de materiais finos.'; acao = '🚫 AÇÃO: Rejeitar vagão imediatamente.'; }
        else dim = 'Inspeção visual em conformidade. Sem contaminantes.';
    } else if (cat === 'forma_lote') {
        const perc = getVal('val-brita-nao-cubicas');
        const limitNaoCubica = 15; 
        if (perc > limitNaoCubica) { status = 'refugo'; titulo = '❌ NÃO ACEITAR (REFUGO)'; dim = `Amostra possui ${perc}% de britas não-cúbicas (Max: ${limitNaoCubica}%).`; acao = '🚫 AÇÃO: Lote reprovado. Solicitar nova britagem.'; }
        else dim = `Índice de britas não-cúbicas (${perc}%) dentro da tolerância (≤ ${limitNaoCubica}%).`;
    } else if (cat === 'granulometria') {
        const g3 = getVal('val-brita-g3'), g250 = getVal('val-brita-g250'), g150 = getVal('val-brita-g150'), g075 = getVal('val-brita-g075'), g050 = getVal('val-brita-g050');
        let erros = [];
        if (g3 !== 0) erros.push(`- 3": deve ser 0% (Atual: ${g3}%)`);
        if (g250 < 0 || g250 > 10) erros.push(`- 2.1/2": 0% a 10% (Atual: ${g250}%)`);
        if (g150 < 40 || g150 > 75) erros.push(`- 1.1/2": 40% a 75% (Atual: ${g150}%)`);
        if (g075 < 90 || g075 > 100) erros.push(`- 3/4": 90% a 100% (Atual: ${g075}%)`);
        if (g050 < 95 || g050 > 100) erros.push(`- 1/2": 95% a 100% (Atual: ${g050}%)`);
        
        if (erros.length > 0) { status = 'refugo'; titulo = '❌ NÃO ACEITAR (REFUGO)'; dim = 'Amostra fora da faixa granulométrica AREMA 24:\n' + erros.join('\n'); acao = '🚫 AÇÃO: Lote reprovado.'; }
        else dim = 'Percentuais retidos em conformidade com o Plano 24 da AREMA.';
    } else if (cat === 'laboratorio') {
        const la = getVal('val-brita-losangeles'), pulv = getVal('val-brita-pulverulento'), arg = getVal('val-brita-argila');
        let erros = [];
        const limitLA = (lito === 'granito') ? 35 : 30;
        
        if (la > limitLA) erros.push(`- Abrasão Los Angeles: ${la}% (Max p/ ${lito}: ${limitLA}%)`);
        if (pulv > 1) erros.push(`- Mat. Pulverulento: ${pulv}% (Max: 1%)`);
        if (arg > 0.5) erros.push(`- Torrões de Argila: ${arg}% (Max: 0.5%)`);
        
        if (erros.length > 0) { status = 'refugo'; titulo = '❌ LAUDO REPROVADO'; dim = 'Falha nos ensaios mecânicos/físicos:\n' + erros.join('\n'); acao = '🚫 AÇÃO: Bloquear pedreira/veio para fornecimento.'; }
        else dim = `Ensaios físicos em conformidade para Litologia: ${lito.toUpperCase()}.`;
    }
    animarTexto('resultado-box-brita', `${titulo}\n\n📏 Análise:\n${dim}\n\n${acao}\n\n📄 Procedimento: MAN-VP-T-ETM-ES-0006-05`, status);
}

// 4. MADEIRA
function analisarMadeira() {
    const cat = document.getElementById('mad-categoria').value;
    let status = 'aceitavel', titulo = '✅ CONFORME', dim = '', acao = '✅ AÇÃO: Lote liberado para via.';

    if (cat === 'fisico') {
        const classe = document.getElementById('mad-classe').value;
        const umidade = getVal('val-mad-umidade'), densidade = getVal('val-mad-densidade'), retencao = getVal('val-mad-retencao');
        let erros = [];
        if (umidade > 30) erros.push('Teor de umidade excede o máximo de 30%.');
        if (classe === '1' && densidade > 0 && densidade < 750) erros.push('Densidade abaixo do mínimo p/ 1ª Classe (750 kg/m³).');
        if (classe === '2' && densidade > 0 && densidade < 600) erros.push('Densidade abaixo do mínimo p/ 2ª Classe (600 kg/m³).');
        if (retencao > 0 && retencao < 9.6) erros.push('Retenção CCA abaixo do mínimo (9.6 kg/m³).');
        
        if (erros.length > 0) { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = erros.join('\n'); acao = '🚫 AÇÃO: Recusar recebimento. Falha no tratamento.'; }
        else dim = 'Propriedades físicas e de impregnação preservativa dentro dos limites normativos.';
    } else if (cat === 'defeito') {
        const tipo = document.getElementById('mad-tipo-defeito').value;
        const naFixacao = document.getElementById('mad-zona-fixacao').checked;

        if (tipo === 'podre') { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Dormente com aspecto de apodrecimento.'; acao = '🚫 AÇÃO: Refugo Sumário (Defeito não aceitável).'; }
        else if (tipo === 'casca') { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Presença de casca na madeira.'; acao = '🚫 AÇÃO: Refugo Sumário (Defeito não aceitável).'; }
        else if (tipo === 'anti_rachante') { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Proteção anti-rachante ausente ou menor que 70% na face do dormente.'; acao = '🚫 AÇÃO: Retornar ao fornecedor (Defeito não aceitável).'; }
        else if (tipo === 'amarracao') { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Amarração deficiente (menos de 3 fitas ou sem pontaletes).'; acao = '🚫 AÇÃO: Recusar descarga do fardo (Defeito não aceitável).'; }
        else if (tipo === 'dimensoes') {
            const c = getVal('val-mad-dim-comp'), l = getVal('val-mad-dim-larg'), a = getVal('val-mad-dim-alt');
            const nc = getVal('val-mad-nom-comp'), nl = getVal('val-mad-nom-larg'), na = getVal('val-mad-nom-alt');
            let e = [];
            if (c < nc || c > (nc + 0.05)) e.push(`Comprimento fora (Aferido: ${c}m | Nom: ${nc}m | Tol: +5cm / -0cm)`);
            if (l < (nl - 2) || l > (nl + 2)) e.push(`Largura fora (Aferido: ${l}cm | Nom: ${nl}cm | Tol: ±2cm)`);
            if (a < (na - 1) || a > (na + 1)) e.push(`Altura fora (Aferido: ${a}cm | Nom: ${na}cm | Tol: ±1cm)`);
            
            if (e.length > 0) { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = e.join('\n'); acao = '🚫 AÇÃO: Dormente dimensionalmente divergente. Refugo.'; }
            else dim = 'Dimensões aferidas estão dentro da tolerância normativa.';
        }
        else if (tipo === 'esmoado') {
            const compDorm = document.getElementById('val-mad-esmoado-comp').value;
            const reta = getVal('val-mad-esmoado-reta'), topo = getVal('val-mad-esmoado-topo');
            let minReta = 0, minTopo = 0;
            
            if (naFixacao) {
                if (compDorm === '2.00') { minReta = 14; minTopo = 20; } else { minReta = 15; minTopo = 22; }
            } else {
                if (compDorm === '2.00') { minReta = 9; minTopo = 15; } else { minReta = 10; minTopo = 17; }
            }
            
            if (reta < minReta || topo < minTopo) {
                status = 'refugo'; titulo = '❌ REFUGO (ESMOADO)';
                dim = `Aferido: Face Reta ${reta}cm | Topo ${topo}cm\nMínimo Exigido: Face Reta ${minReta}cm | Topo ${minTopo}cm`;
                acao = '🚫 AÇÃO: Esmoado (falta de canto) excessivo. Segregar dormente.';
            } else {
                dim = `Aferido: Face Reta ${reta}cm | Topo ${topo}cm\n(Mínimos atendidos: ${minReta} e ${minTopo} cm)`;
            }
        }
        else if (naFixacao && (tipo === 'racha_topo' || tipo === 'racha_centro' || tipo === 'furos_nos')) {
            status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Proibida presença de fendas, rachaduras ou furos na zona de fixação.'; acao = '🚫 AÇÃO: Segregar dormente.';
        } else {
            if (tipo === 'racha_topo') {
                const comp = getVal('val-mad-comp-racha'), abert = getVal('val-mad-abert-racha');
                if (comp > 15 || abert > 2) { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Fenda excede limites (Comp. máx: 15cm | Abertura máx: 2mm).'; acao = '🚫 AÇÃO: Segregar dormente.'; }
                else dim = 'Fenda de topo dentro das tolerâncias.';
            } else if (tipo === 'racha_centro') {
                const comp = getVal('val-mad-comp-racha'), abert = getVal('val-mad-abert-racha'), prof = getVal('val-mad-prof-racha');
                if (comp > 15 || abert > 2 || prof > 2) { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Rachadura central excede limites (Comp: 15cm | Abertura: 2mm | Prof: 2cm).'; acao = '🚫 AÇÃO: Segregar dormente.'; }
                else dim = 'Rachadura central dentro das tolerâncias normativas.';
            } else if (tipo === 'furos_nos') {
                const diam = getVal('val-mad-diam-furo'), prof = getVal('val-mad-prof-furo');
                if (diam > 2.5 || prof >= 5) { status = 'refugo'; titulo = '❌ REFUGO'; dim = 'Dimensões excedem limite (Diâm máx: 2.5cm | Prof máx: < 5cm).'; acao = '🚫 AÇÃO: Segregar dormente.'; }
                else dim = 'Furo de broca ou nó cariado dentro das tolerâncias.';
            } else if (tipo === 'empenamento') {
                const compDorm = parseFloat(document.getElementById('val-mad-comp-dormente').value), flecha = getVal('val-mad-flecha');
                const flechaMax = compDorm / 2.0;
                if (flecha > flechaMax) { status = 'refugo'; titulo = '❌ REFUGO'; dim = `Flecha (${flecha} cm) excede o limite de ${flechaMax.toFixed(1)} cm para viga de ${compDorm.toFixed(2)}m.`; acao = '🚫 AÇÃO: Segregar dormente para descarte.'; }
                else dim = `Empenamento/Arqueamento dentro do limite aceitável (Máx: ${flechaMax.toFixed(1)} cm).`;
            }
        }
    }
    animarTexto('resultado-box-madeira', `${titulo}\n\n📏 Análise:\n${dim}\n\n${acao}\n\n📄 Procedimento: MAN DM T MTE DM 0001`, status);
}

// 5. SUBCOMPONENTES
const subDados = {
    "pal_branca_tr68": { title: "Palmilha Branca TR68 FAST-CLIP", ref: "ENG-DVP-D183 / INF-FX-0003", m: [{l:"Medida 1 (mm)", min:187.5, max:191.5}, {l:"Medida 2 (mm)", min:151.0, max:155.0}, {l:"Medida 3 (mm)", min:111.5, max:114.5}, {l:"Medida 4 (mm)", min:5.5, max:7.5}] },
    "pal_verde_uic60": { title: "Palmilha Verde UIC60", ref: "ENG-DVP-D135 / INF-FX-0003", m: [{l:"Medida 1 (mm)", min:148.5, max:150.0}, {l:"Medida 2 (mm)", min:113.0, max:114.0}, {l:"Medida 3 (mm)", min:7.05, max:7.55}] },
    "iso_verde_3510w": { title: "Isolador Lateral Verde 3510W", ref: "ENG-DVP-D136", m: [{l:"Medida 1 (mm)", min:61.5, max:63.0}, {l:"Medida 2 (mm)", min:9.6, max:10.2}, {l:"Medida 3 (mm)", min:7.4, max:8.0}] },
    "iso_amarelo_3510w": { title: "Isolador Lateral Amarelo 3510W", ref: "ENG-DVP-D136", m: [{l:"Medida 1 (mm)", min:61.5, max:63.0}, {l:"Medida 2 (mm)", min:9.6, max:10.2}, {l:"Medida 3 (mm)", min:7.4, max:8.0}] },
    "iso_preto_3502w": { title: "Isolador Lateral Preto 3502W", ref: "ENG-DVP-D084", m: [{l:"Medida 1 (mm)", min:61.5, max:63.0}, {l:"Medida 2 (mm)", min:7.6, max:8.2}, {l:"Medida 3 (mm)", min:7.4, max:8.0}] },
    "iso_branco_pandrol": { title: "Isolador Lateral Branco 8mm (PANDROL - SAP:121107)", ref: "ENG-DVP-D084", m: [{l:"Medida 1 (mm)", min:61.5, max:63.0}, {l:"Medida 2 (mm)", min:7.6, max:8.2}, {l:"Medida 3 (mm)", min:7.4, max:8.0}] },
    "iso_branco_3502w": { title: "Isolador Lateral Branco 3502W (SAP:121107)", ref: "ENG-DVP-D084", m: [{l:"Medida 1 (mm)", min:61.5, max:63.0}, {l:"Medida 2 (mm)", min:7.6, max:8.2}, {l:"Medida 3 (mm)", min:7.4, max:8.0}] },
    "usp_getzner": { title: "UNDER SLEEPER PAD - USP (GETZNER - SAP:126980)", ref: "ENG-DVP-D131", m: [{l:"Comprimento (mm)", min:1360.0, max:1390.0}, {l:"Largura (mm)", min:225.0, max:245.0}, {l:"Espessura (mm)", min:7.0, max:11.0}] },
    "grampo_capa_branca": { title: "Grampo W c/ isolador Capa Branca (SAP:99604)", ref: "ENG-DVP-T040", m: [{l:"Medida 1 (mm)", min:106.5, max:111.0}, {l:"Medida 2 (mm)", min:15.75, max:16.25}, {l:"Medida 3 (mm)", min:74.5, max:79.0}] },
    "grampo_iso_frontal": { title: "Grampo W c/ isolador frontal (SAP:99604)", ref: "ENG-DVP-T040", m: [{l:"Medida 1 (mm)", min:106.5, max:111.0}, {l:"Medida 2 (mm)", min:15.75, max:16.25}, {l:"Medida 3 (mm)", min:74.5, max:79.0}] },
    "ombreira_eclip": { title: "Ombreira E-CLIP HFOB02 (SAP:127542)", ref: "ENG-DVP-D139", m: [{l:"Medida 1 (mm)", min:73.5, max:76.5}, {l:"Medida 2 (mm) [>= 24]", min:24.0, max:999999}] },
    "ombreira_fastclip": { title: "Ombreira FAST-CLIP HFOB08 (SAP:127406B)", ref: "ENG-DVP-D074", m: [{l:"Medida 1 (mm)", min:99.75, max:102.25}, {l:"Medida 2 (mm)", min:58.7, max:60.7}, {l:"Medida 3 (mm)", min:95.9, max:98.1}, {l:"Medida 4 (mm)", min:70.3, max:72.5}, {l:"Medida 5 (mm)", min:34.9, max:36.7}] },
    "pal_verde_almofada": { title: "Palmilha Verde Almofada 6980 (SAP:127543)", ref: "ENG-DVP-D135", m: [{l:"Medida 1 (mm)", min:148.5, max:150.0}, {l:"Medida 2 (mm)", min:113.0, max:114.0}, {l:"Medida 3 (mm)", min:7.05, max:7.55}] },
    "pal_branca_almofada": { title: "Palmilha Branca Almofada 7552 (SAP:109105)", ref: "ENG-DVP-D183", m: [{l:"Medida 1 (mm)", min:187.5, max:191.5}, {l:"Medida 2 (mm)", min:151.0, max:155.0}, {l:"Medida 3 (mm)", min:111.5, max:114.5}, {l:"Medida 4 (mm)", min:5.5, max:7.5}] }
};

function analisarSub() {
    const cat = document.getElementById('sub-categoria').value;
    if(!cat || !subDados[cat]) return;
    const item = subDados[cat];
    let status = 'aceitavel', titulo = '✅ CONFORME', dim = '', erros = [], acao = '✅ AÇÃO: Subcomponente aprovado. Lote liberado.';

    item.m.forEach((medida, index) => {
        const val = getVal(`val-sub-m${index+1}`);
        if(val < medida.min || val > medida.max) {
            if (medida.max === 999999) erros.push(`- ${medida.l}: ${val}mm (Tol: Min ${medida.min}mm)`);
            else erros.push(`- ${medida.l}: ${val}mm (Tol: ${medida.min} a ${medida.max} mm)`);
        }
    });

    if (erros.length > 0) { status = 'refugo'; titulo = '❌ NÃO CONFORME'; dim = 'Medidas fora das tolerâncias:\n' + erros.join('\n'); acao = '🚫 AÇÃO: Lote dimensionalmente reprovado. Preencher RNC.'; }
    else dim = 'Todas as dimensões inspecionadas estão de acordo com o desenho técnico.';

    animarTexto('resultado-box-sub', `${titulo}\n\n${item.title}\n\n📏 Análise:\n${dim}\n\n${acao}\n\n📄 Desenho Técnico: ${item.ref}`, status);
}

// === CÂMERA E EXPORTAÇÃO ===
let currentStream = null;
let laudoAtualTexto = "";
let categoriaAtual = "";
let fotoDataUrl = "";

async function abrirCamera(boxId, categoria) {
    const box = document.getElementById(boxId);
    laudoAtualTexto = box.innerText;
    categoriaAtual = categoria;
    
    const statusMatch = laudoAtualTexto.match(/✅|❌|🔧|⚠️|🚫/);
    const statusIcon = statusMatch ? statusMatch[0] : '';
    const dataStr = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
    
    document.getElementById('overlay-texto-visual').innerHTML = `
        <strong>${statusIcon} LAUDO RUMO - ${categoria}</strong><br>
        <span style="font-size:0.7rem; opacity:0.8;">Data: ${dataStr}</span><br>
        ${laudoAtualTexto.split('\n').slice(0,3).join('<br>')}...
    `;

    showEl('camera-modal', 'flex');
    hideEl('foto-capturada');
    showEl('video-preview');
    showEl('controles-camera', 'flex');
    hideEl('controles-pos-captura');

    try {
        currentStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        const videoElement = document.getElementById('video-preview');
        videoElement.srcObject = currentStream;
    } catch (err) {
        alert("Erro ao acessar a câmera. Verifique as permissões do navegador.");
        fecharCamera();
    }
}

function fecharCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    hideEl('camera-modal');
}

function retomarCamera() {
    hideEl('foto-capturada');
    showEl('video-preview');
    showEl('controles-camera', 'flex');
    hideEl('controles-pos-captura');
    document.getElementById('overlay-texto-visual').style.display = 'block';
}

function tirarFoto() {
    const video = document.getElementById('video-preview');
    const canvas = document.getElementById('canvas-render');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const baseUnit = canvas.width;
    const fontSizeTitle = baseUnit * 0.028;
    const fontSizeDate = baseUnit * 0.0168;
    const fontSizeBody = baseUnit * 0.02016;
    const padding = baseUnit * 0.02;
    const lineHeight = fontSizeBody * 1.5;

    const dataStr = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
    
    const linhas = laudoAtualTexto.split('\n').filter(l => l.trim() !== '');
    const linhasFiltradas = linhas.slice(0, 10);

    const boxHeight = (linhasFiltradas.length * lineHeight) + fontSizeTitle + fontSizeDate + (padding * 4);
    const boxWidth = baseUnit * 0.94;
    const startX = baseUnit * 0.03;
    const startY = canvas.height - boxHeight - (baseUnit * 0.03);

    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.beginPath();
    context.roundRect(startX, startY, boxWidth, boxHeight, 15);
    context.fill();

    context.fillStyle = "#FFD600";
    context.beginPath();
    context.roundRect(startX, startY, baseUnit * 0.01, boxHeight, [15, 0, 0, 15]);
    context.fill();

    context.shadowColor = "rgba(0, 0, 0, 1)";
    context.shadowBlur = 6;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    context.textAlign = "center";
    const textCenterX = canvas.width / 2;
    const maxWidth = boxWidth - (padding * 2);
    
    let textY = startY + padding + fontSizeTitle;
    
    context.fillStyle = "white";
    context.font = "bold " + Math.floor(fontSizeTitle) + "px sans-serif";
    context.fillText(`INSPEÇÃO RUMO - ${categoriaAtual}`, textCenterX, textY, maxWidth);
    
    textY += fontSizeTitle + (padding / 2);
    context.font = Math.floor(fontSizeDate) + "px sans-serif";
    context.fillStyle = "#FFD600";
    context.fillText(dataStr, textCenterX, textY, maxWidth);
    textY += padding;

    context.fillStyle = "white";
    context.font = "bold " + Math.floor(fontSizeBody) + "px sans-serif"; 
    linhasFiltradas.forEach(linha => {
        context.fillText(linha, textCenterX, textY, maxWidth);
        textY += lineHeight;
    });

    fotoDataUrl = canvas.toDataURL('image/jpeg', 0.85);

    const imgEl = document.getElementById('foto-capturada');
    imgEl.src = fotoDataUrl;
    showEl('foto-capturada');
    hideEl('video-preview');
    document.getElementById('overlay-texto-visual').style.display = 'none';
    
    hideEl('controles-camera');
    showEl('controles-pos-captura', 'flex');
}

function baixarFotoCarimbada() {
    if (!fotoDataUrl) return;
    const link = document.createElement('a');
    link.href = fotoDataUrl;
    link.download = `Laudo_${categoriaAtual}_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("✅ Foto salva na sua galeria!");
}

async function compartilharFotoCarimbada() {
    if (!fotoDataUrl) return;
    const res = await fetch(fotoDataUrl);
    const blob = await res.blob();
    const file = new File([blob], "laudo_inspecao.jpg", { type: "image/jpeg" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'Laudo Rumo',
                text: `Evidência de Inspeção - ${categoriaAtual}`
            });
        } catch (error) {
            console.log('Compartilhamento cancelado ou falhou', error);
        }
    } else {
        alert("⚠️ Seu navegador não suporta envio direto de imagem. Por favor, clique em SALVAR e envie pelo WhatsApp.");
    }
}

function compartilharWhatsApp(boxId, categoria) {
    const box = document.getElementById(boxId);
    const textoLimpo = box.innerText;
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const cabecalho = `*INSPEÇÃO DE QUALIDADE - RUMO*\n📍 *Categoria:* ${categoria}\n📅 *Data:* ${dataAtual} às ${horaAtual}\n\n`;
    const mensagem = encodeURIComponent(cabecalho + textoLimpo);
    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
}

// === STORAGE (SALVAR E CARREGAR DADOS) ===
function salvarDadosLocal() {
    const inputs = document.querySelectorAll('input:not([type="password"]), select');
    const dados = {};
    inputs.forEach(input => {
        if (input.id) dados[input.id] = input.type === 'checkbox' ? input.checked : input.value;
    });
    dados['sessao_ativa'] = true; 
    localStorage.setItem('rumoInspeccaoDados', JSON.stringify(dados));
}

function carregarDadosLocal() {
    const dadosSalvos = localStorage.getItem('rumoInspeccaoDados');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        for (const id in dados) {
            const input = document.getElementById(id);
            if (input) { if (input.type === 'checkbox') input.checked = dados[id]; else input.value = dados[id]; }
        }
        
        if(dados['tipo-defeito']) atualizarOpcoes();
        ['amv-componente', 'mad-categoria', 'brita-categoria', 'sub-categoria', 'report-semana', 'report-area'].forEach(id => {
            if(dados[id]) {
                const elem = document.getElementById(id);
                if (elem) elem.dispatchEvent(new Event('change'));
            }
        });

        if (dados['sessao_ativa']) {
            hideEl('login-screen'); showEl('main-layout', 'flex');
            if (window.innerWidth <= 768) { document.getElementById('sidebar').classList.add('hidden'); showEl('toggle-sidebar-btn', 'flex'); }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosLocal();
    document.querySelectorAll('input:not([type="password"]), select').forEach(input => {
        input.addEventListener('change', salvarDadosLocal);
        input.addEventListener('input', salvarDadosLocal);
    });
    
    window.onclick = function(event) {
        const modal = document.getElementById('modal-ajuda-visual');
        if (event.target == modal) { fecharAjuda(); }
    }
});
