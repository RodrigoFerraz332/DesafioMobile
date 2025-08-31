import { Component, ViewChild } from '@angular/core';
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

  // *** NOVO: Instrução para definir o comportamento do agente de IA ***
  // Você pode alterar este texto para definir a persona da IA.
  systemInstruction = 'Seja um assistente de IA prestativo e amigável chamado Neto Digital. Formate suas respostas usando Markdown para melhor legibilidade (use listas, negrito, itálico, etc.).';

  constructor() {
    // Mensagem inicial da IA
    this.messages.push({ sender: 'ia', text: 'Olá! Eu sou o Neto Digital. Como posso ajudar você hoje?' });
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
   * Realiza uma chamada de API para o modelo Gemini para obter uma resposta.
   * @param prompt A pergunta do usuário.
   */
  private async callAiApi(prompt: string) {
    const apiKey = "AIzaSyCQ2aNYGqkSsaxg7goWzDFuUxx6u2o0CLc"; // A chave será fornecida pelo ambiente de execução.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // *** ATUALIZADO: Payload agora inclui a instrução de sistema ***
    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      systemInstruction: {
        parts: [
          { text: this.systemInstruction }
        ]
      }
    };

    let aiResponse = 'Desculpe, não consegui processar sua solicitação. Tente novamente.';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {

        let rawResponse = result.candidates[0].content.parts[0].text;

        // *** ATUALIZADO: Converte Markdown básico para HTML para renderização correta ***
        aiResponse = rawResponse
          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Negrito
          .replace(/\*(.*?)\*/g, '<i>$1</i>')     // Itálico
          .replace(/\n/g, '<br>');              // Quebra de linha
      }

    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
    }

    this.isLoading = false;
    this.messages.push({ sender: 'ia', text: aiResponse });
    this.scrollToBottom();
  }

  /**
   * Rola a tela para a mensagem mais recente.
   */
  private scrollToBottom() {
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 100);
  }
}
