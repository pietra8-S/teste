const SUPABASE_URL ="https://hvsrxpiepdtbxijvthuc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_HgTGeTSppVuS_EohBznd4g_FVHRzLZL";         
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
 
async function cadastrarUsuario(nome_user, senha) { 
    try { 
        const { data, error } = await supabaseClient 
            .from('tb_users') 
            .insert([{ nome_user, senha }]) 
            .select(); 
 
        if (error) throw error; 
        console.log('Usuário cadastrado com sucesso', data); 
        return { sucesso: true, dados: data }; 
    } catch (error) { 
        console.error('Erro ao cadastrar', error.message); 
        return { sucesso: false, erro: error.message }; 
    } 
} 
 
document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('cadastroForm'); 
    const mensagem = document.getElementById('mensagem'); 
 
    form.addEventListener('submit', async (e) => { 
        e.preventDefault();  
 
        const nome_user = document.getElementById('nome_user').value.trim(); 
        const senha = document.getElementById('senha').value.trim(); 
 
        if (!nome_user || !senha) { 
            mensagem.textContent = 'Preencha todos os campos!'; 
            mensagem.style.color = 'red'; 
            return; 
        } 
 
        const btn = form.querySelector('button'); 
        btn.disabled = true; 
        btn.textContent = 'Cadastrando...'; 
 
        const resultado = await cadastrarUsuario(nome_user, senha); 
 
        if (resultado.sucesso) { 
            mensagem.textContent = 'Usuário cadastrado com sucesso!'; 
            mensagem.style.color = 'green'; 
            form.reset();  
        } else { 
            mensagem.textContent = 'Erro: ' + resultado.erro; 
            mensagem.style.color = 'red'; 
        } 
 
        btn.disabled = false; 
        btn.textContent = 'Cadastrar'; 
    }); 
});