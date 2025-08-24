import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';

// Definição da interface para uma mensagem
interface Message {
  text: string;
  sender: 'user' | 'ia';
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage {
  // Adicionado '!' para resolver o erro de inicialização (TS2564)
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  constructor() {
    // Mensagem inicial da IA
    this.messages.push({ sender: 'ia', text: 'Olá! Como posso ajudar você hoje?' });
  }

  /**
   * Envia a mensagem do usuário e processa a resposta da IA.
   */
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    // Adiciona a mensagem do usuário à lista
    this.messages.push({ sender: 'user', text: this.newMessage });
    const userMessage = this.newMessage;
    this.newMessage = '';
    this.scrollToBottom();

    // Inicia o indicador de "digitando" e chama a IA
    this.isLoading = true;
    this.callAiApi(userMessage);
  }

  /**
   * Simula uma chamada de API para um agente de IA.
   * @param prompt A pergunta do usuário.
   */
  private async callAiApi(prompt: string) {
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    // --- PONTO DE INTEGRAÇÃO DA API ---
    // Substitua esta lógica pela chamada real à sua API (usando fetch ou HttpClient do Angular)
    // Exemplo:
    // const apiKey = 'SUA_CHAVE_DE_API_AQUI';
    // const apiUrl = 'URL_DA_SUA_API';
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    //   body: JSON.stringify({ prompt: prompt })
    // });
    // const data = await response.json();
    // const aiResponse = data.reply;
    // ------------------------------------

    // Resposta simulada
    const aiResponse = `Esta é uma resposta simulada para a sua pergunta sobre: "${prompt}". Integre sua API aqui para obter respostas reais.`;

    this.isLoading = false;
    this.messages.push({ sender: 'ia', text: aiResponse });
    this.scrollToBottom();
  }

  /**
   * Rola a tela para a mensagem mais recente.
   */
  private scrollToBottom() {
    // Usamos um pequeno timeout para garantir que o DOM foi atualizado antes de rolar
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 10);
  }
}
