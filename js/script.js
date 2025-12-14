let tempoPorPergunta = 30; // segundos — variável que define quanto tempo cada pergunta tem

const quiz = [ // cada objeto representa uma pergunta do quiz

    {
	pergunta: "Qual destes é um jogo da Supercell?", // Texto da pergunta
	alternativas: ["Fortnite", "Clash Royale", "League of Legends", "Minecraft", "Roblox"], // Opções mostradas
	correta: 1, // Índice da alternativa correta (0-based: 1 => "Clash Royale") 
	pontos: 10 // Quantos pontos vale essa pergunta
    },
    {
	pergunta: "Em qual país a Supercell foi fundada?",
	alternativas: ["Japão", "Finlândia", "Estados Unidos", "Suécia", "Burkina Faso"], 
	correta: 1, // Finlândia
	pontos: 10
    },
    {
	pergunta: "Qual foi o primeiro grande sucesso da Supercell?",
	alternativas: ["Brawl Stars", "Boom Beach", "Clash of Clans", "Hay Day", "Valorant"],
	correta: 2, // Clash of Clans
	pontos: 10
    },
    {
	pergunta: "Em que cidade fica a sede principal da Supercell?",
	alternativas: ["Helsinki", "Oslo", "Estocolmo", "Copenhague", "Recife"],
	correta: 0, // Helsinki
	pontos: 10
    },
    {
	pergunta: "Em que ano a Supercell foi fundada?",
	alternativas: ["2005", "2010", "2015", "2020", "2001"],
	correta: 1, // 2010
	pontos: 10
    },
    {
	pergunta: "Quem é o CEO conhecido da Supercell?",
	alternativas: ["Mark Zuckerberg", "Ilkka Paananen", "Satya Nadella", "Tim Cook", "Richard D James"],
	correta: 1, // Ilkka Paananen
	pontos: 10
    },
    {
	pergunta: "Qual empresa adquiriu participação majoritária na Supercell em 2016?",
	alternativas: ["Tencent", "Sony", "Google", "Amazon", "Casas Bahia"],
	correta: 0, // Tencent
	pontos: 10
    },
    {
	pergunta: "Qual jogo da Supercell é focado em fazenda/agricultura?",
	alternativas: ["Hay Day", "Clash Royale", "Boom Beach", "Clash of Clans", "Doom"],
	correta: 0, // Hay Day
	pontos: 10
    },
    {
	pergunta: "Qual jogo da Supercell combina cartas e confrontos em arenas?",
	alternativas: ["Brawl Stars", "Clash Royale", "Hay Day", "Boom Beach", "Pou"],
	correta: 1, // Clash Royale
	pontos: 10
    },
    {
	pergunta: "Qual jogo da Supercell teve lançamento global em 2018?",
	alternativas: ["Boom Beach", "Hay Day", "Brawl Stars", "Clash of Clans", "Pou 2"],
	correta: 2, // Brawl Stars
	pontos: 10
    }
];

let respostas = []; // Array que guardará a sequencia de respostas do usuario (1 para corretas, 0 para erradas)



// IMAGENS DE FUNDO POR PERGUNTA
const fundos = [ // URLs de imagens de fundo para cada pergunta


    "url('imagens/backgrounds/supercell.png')",
    "url('imagens/backgrounds/brawlstarsmecha.jpg')",
    "url('imagens/backgrounds/clashroyale3.jpg')",
    "url('imagens/backgrounds/clashofclans4.jpg')",
    "url('imagens/backgrounds/wp.jpg')",
    "url('imagens/backgrounds/hayday.jpg')",
    "url('imagens/backgrounds/bs.webp')",
    "url('imagens/backgrounds/cc.jpg')",
    "url('imagens/backgrounds/torre.jpg')",
    "url('imagens/backgrounds/clash.jpg')",
    "url('imagens/backgrounds/aaa.jpg')"
];

// Variáveis importantes para o funcionamento
let indice = 0; // Índice da pergunta atual 
let pontuacao = 0; // Acumulador de pontos 
let tempo; // Variável que guarda o tempo restante da pergunta 
let contador; // usado para controlar o timer

function iniciarPergunta() { // Função que configura e mostra a pergunta atual
    let main = document.querySelector('main')
    main.style.backgroundImage = fundos[indice] || 'none'; // Define a imagem de fundo 
    main.style.backgroundSize = 'cover'; // Faz a imagem cobrir todo o fundo
    main.style.backgroundRepeat = 'no-repeat'; // Faz com que a imagem do background não se repita
    main.style.backgroundPosition = 'center';  // Centraliza a imagem de fundo
    if (indice >= quiz.length) { // Se passou da última pergunta
	mostrarResultado(); // Mostra o resultado final
	return; // Sai da função
    }

    const q = quiz[indice]; // Pega o objeto da pergunta atual
    document.getElementById("question-text").textContent = `(${indice+1}) ${q.pergunta}`; // Insere o texto da pergunta no elemento apropriado
    const opcoesDiv = document.getElementById("options"); // Referência ao contêiner de opções
    opcoesDiv.innerHTML = ""; // Limpa quaisquer opções anteriores

    q.alternativas.forEach((alt, i) => { // Para cada alternativa da pergunta atual
	const btn = document.createElement("button"); // Cria um elemento button
	btn.textContent = alt; // Define o texto do botão como a alternativa
	btn.onclick = () => responder(i); // Ao clicar, chama a função responder com o índice da alternativa
	opcoesDiv.appendChild(btn); // Adiciona o botão ao contêiner de opções });
    });

    tempo = tempoPorPergunta; // Reseta o tempo para o valor configurado
    document.getElementById("time-left").textContent = tempo; // Atualiza o mostrador do tempo na tela
    iniciarTimer(); // Inicia o contador regressivo
}

function iniciarTimer() { // Função que inicia o setInterval do timer
    clearInterval(contador); // Garante que interval anterior seja limpo
    contador = setInterval(() => { // Define um intervalo que executa todo segundo
	tempo--; // Decrementa o tempo document.getElementById("time-left").textContent = tempo; // Atualiza o mostrador

	if (tempo <= 0) { // Se o tempo zerou ou ficou negativo
	    clearInterval(contador); // Limpa o intervalo atual
	    indice++; // Avança para a próxima pergunta
	    respostas.push(0); // Adiciona 0(Erro) na lista de respostas
	    iniciarPergunta(); // Chama iniciarPergunta para exibir a próxima
	}
    }, 1000); 
}

function responder(i) { // Função chamada quando o usuário clica numa opção
    clearInterval(contador); // Para o timer atual
    const q = quiz[indice]; // Pega a pergunta atual
    if (i === q.correta) { // Compara índice selecionado com o índice correto
	pontuacao += q.pontos; // Se correto, soma os pontos da pergunta
	respostas.push(1); // Adiciona 1(Correta) a lista de respostas 

	// A conquista das coroas acontece da seguinte forma:
	// Primeira coroa no primeiro acerto
	// Segunda coroa caso acerte metade das perguntas 
	// Terceira coroa caso acerte todas as perguntas 
	if (pontuacao === 10 || pontuacao === 50 || pontuacao === 100) {
	    let divCoroas = document.getElementById('coroas'); // cria um acesso a div das coroas 
	    let coroa = document.createElement('img'); // Cria um elemento img 
	    coroa.src = 'imagens/coroa.png'; // Define o source do elemento como a imagem da coroa
	    divCoroas.appendChild(coroa); // Adiciona a imagem da coroa dentro da div de coroas
	}
    } else {
	respostas.push(0); // Adiciona 0(Erro) a lista de respostas
    }
    
    indice++; // Avança para a próxima pergunta
    iniciarPergunta(); // Exibe próxima pergunta (ou resultado se acabou)
}

function mostrarResultado() { // Função que exibe a tela de resultado final
    // A tela de resultado mostra o seu desempenho e um gif especial relacionado a ele
    let desempenho;
    let gif;

    if (pontuacao === 100) { // Caso acerte todas
	gif = 'imagens/gifs/trofeu.gif'; //Gif do rei com um trofeu
	desempenho = "Seu desempenho foi excelente, acertou todas as perguntas e garantiu as três coroas!"; // Mensagem de desempenho

    } else if (pontuacao >= 50) { // Caso acerte metade
	gif = 'imagens/gifs/joinha.gif'; // Gif do rei dando joinha
	desempenho = "Seu desempenho foi bom, acertou mais que a metade das perguntas e garantiu duas coroas"; // Mensagem de desempenho
    } else if (pontuacao >= 10) { // Caso acerte pelo menos uma
	gif = 'imagens/gifs/furioso.gif'; // Gif do rei furioso
	desempenho = "Seu desempenho foi ruim, desista."; // Mensagem motivacional
    } else { // Caso não acerte nada
	gif = 'imagens/gifs/choro.gif'; // Gif do rei chorando 
	desempenho = "Burro."; // Mensagem desmotivacional
    }

    // Mensagem mensagem formatada que contém as informações equivalentes ao desempenho
    document.getElementById("quiz-container").innerHTML = `
	<img src="${gif}" alt="gif de resultado final" style="width:100px; height: 100px;"/>
	<h2><strong>${desempenho}</strong></h2>
	<p>Pontuação total: <strong>${pontuacao}</strong></p>
	<p>Você respondeu ${quiz.length} perguntas.</p>
	<div id="gabarito"> </div>
	`; // Substitui todo o conteúdo do contêiner pelo HTML do resultado


    let gabarito = document.getElementById('gabarito'); // Seleciona a div de gabarito

    for (let i = 0; i < quiz.length; i++) { // Loop que percorre quiz e respostas 
	let questao = quiz[i]; // Questão atual
	let indiceCorreto = questao.correta; // Indice de resposta correto no array de alternativas
	let acerto = respostas[i];  // Variavel de acerto

	divQuestao = document.createElement('div'); // Criação da div que conterá a questão

	pergunta = document.createElement('h4'); // Criação do titulo dessa questão
	pergunta.textContent = questao.pergunta; // Definição do conteudo do titulo

	respostaCorreta = document.createElement('p'); // Criação do paragrafo que conterá a resposta correta 
	respostaCorreta.textContent = `Correta: ${questao.alternativas[indiceCorreto]}`; // Definiçaõ do paragrafo

	divQuestao.appendChild(pergunta); // Adiciona a pergunta a div questão
	divQuestao.appendChild(respostaCorreta); // Adiciona a resposta correta a questão

	if (acerto === 1) { // Se acertou
	    divQuestao.id = 'acerto'; // a div recebe estilização do id acerto
	    gabarito.appendChild(divQuestao); // Adiciona questão ao gabarito
	} else { // Se errou
	    divQuestao.id = 'erro'; // a div recebe estilização do id erro
	    gabarito.appendChild(divQuestao); // Adiciona questão ao gabarito
	}
	
    }

}

iniciarPergunta(); // Chama a função inicial para começar o quiz automaticamente
