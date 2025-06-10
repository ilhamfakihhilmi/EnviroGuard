<template>
    <div class="page-wrapper">
        <div class="chatbot-container">
            <div class="chatbot-header">
                <div class="chatbot-title">
                    <div class="ai-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div>
                        <h2>EnviroGuard AI Assistant</h2>
                        <div class="status-indicator">
                            <div class="status-dot"></div>
                            <span>Online & Ready</span>
                        </div>
                    </div>
                </div>
                <div class="mcp-status">
                    <div class="mcp-indicator"></div>
                    <span>MCP Connected</span>
                </div>
            </div>

            <div class="chat-messages" ref="chatMessagesContainer">
                <div v-for="message in messages" :key="message.id" :class="['message', message.sender]">
                    <div class="message-avatar">
                        <i :class="message.sender === 'ai' ? 'fas fa-robot' : 'fas fa-user'"></i>
                    </div>
                    <div class="message-content">
                        <p v-html="message.content"></p>
                        <div class="message-time">{{ message.timestamp }}</div>
                    </div>
                </div>

                <div v-if="isTyping" class="message ai">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="typing-indicator">
                        <span>AI sedang mengetik</span>
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>

                <div v-if="showQuickActions" class="quick-actions">
                    <div v-for="action in quickActions" :key="action.text" class="quick-action"
                        @click="sendQuickMessage(action.prompt)">
                        {{ action.text }}
                    </div>
                </div>
            </div>

            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <textarea ref="chatInputRef" v-model="newMessage" class="chat-input"
                        placeholder="Ketik pesan Anda di sini..." rows="1" @keydown.enter.prevent="handleEnter"
                        @input="adjustTextareaHeight"></textarea>
                    <button class="send-button" @click="sendMessage" :disabled="!newMessage.trim() || isTyping">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, watch, onMounted } from 'vue';

// --- State Reaktif ---
const newMessage = ref('');
const messages = reactive([]);
const isTyping = ref(false);
const showQuickActions = ref(true);
const chatMessagesContainer = ref(null);
const chatInputRef = ref(null);

const quickActions = reactive([
    { text: '📊 Status Data Center', prompt: 'Tampilkan status data center' },
    { text: '⚡ Analisis Energi', prompt: 'Analisis konsumsi energi' },
    { text: '🔧 Prediksi Maintenance', prompt: 'Prediksi maintenance' },
    { text: '❄️ Optimasi Cooling', prompt: 'Optimasi cooling system' },
    { text: '📈 Generate Laporan', prompt: 'Generate laporan bulanan' },
]);

// --- Metode ---
const scrollToBottom = async () => {
    await nextTick();
    if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
    }
};

watch(messages, scrollToBottom, { deep: true });
watch(isTyping, scrollToBottom);

function handleEnter(e) {
    if (!e.shiftKey && !isTyping.value) {
        sendMessage();
    }
}

function adjustTextareaHeight() {
    const el = chatInputRef.value;
    if (el) {
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
}

function sendMessage() {
    const messageText = newMessage.value.trim();
    if (!messageText || isTyping.value) return;

    messages.push({
        id: Date.now(),
        sender: 'user',
        content: messageText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });

    newMessage.value = '';
    nextTick(adjustTextareaHeight);

    if (showQuickActions.value) {
        showQuickActions.value = false;
    }

    isTyping.value = true;
    setTimeout(() => {
        isTyping.value = false;
        generateAIResponse(messageText);
    }, 1500 + Math.random() * 1000);
}

function sendQuickMessage(message) {
    if (isTyping.value) return;
    newMessage.value = message;
    sendMessage();
}

function generateAIResponse(userMessage) {
    const responses = {
        'status': `📊 <strong>Status Data Center Real-time:</strong><br><ul style="margin-top: 0.5rem; padding-left: 1rem; list-style-position: inside;"><li>🟢 <strong>Sistem Operasional:</strong> 99.8% uptime</li><li>🌡️ <strong>Suhu:</strong> 22.5°C (Optimal)</li><li>💧 <strong>Kelembaban:</strong> 45% (Normal)</li><li>⚡ <strong>Konsumsi Daya:</strong> 85% dari kapasitas</li><li>🔧 <strong>Maintenance:</strong> 2 server scheduled</li></ul><br><em>Berdasarkan data MCP server terbaru.</em>`,
        'energi': `⚡ <strong>Analisis Konsumsi Energi:</strong><br><ul style="margin-top: 0.5rem; padding-left: 1rem; list-style-position: inside;"><li>📈 <strong>Trend Bulanan:</strong> Peningkatan 12%</li><li>🎯 <strong>Efisiensi:</strong> 78% (Target: 85%)</li><li>💡 <strong>Rekomendasi AI:</strong> Optimasi cooling schedule, implementasi dynamic power scaling.</li></ul><br><em>Potensi penghematan: 15-20% per bulan</em>`,
        'maintenance': `🔧 <strong>Prediksi Maintenance AI:</strong><br><ul style="margin-top: 0.5rem; padding-left: 1rem; list-style-position: inside;"><li>🚨 <strong>Prioritas Tinggi:</strong> Server-Rack-A-05 (Prediksi failure 7 hari)</li><li>⚠️ <strong>Prioritas Sedang:</strong> UPS-Battery-Bank (Kapasitas turun 15%)</li></ul><br><em>Maintenance schedule telah dioptimasi.</em>`,
        'cooling': `❄️ <strong>Optimasi Cooling System:</strong><br><ul style="margin-top: 0.5rem; padding-left: 1rem; list-style-position: inside;"><li>📊 <strong>Analisis:</strong> Zona B (25.1°C) perlu optimasi.</li><li>🎯 <strong>Rekomendasi AI:</strong> Adjust airflow di Zona B & implementasi smart venting.</li></ul><br><em>Estimasi penghematan energi: 18%</em>`,
        'laporan': `📈 <strong>Generate Laporan Bulanan:</strong><br><br>✅ <strong>Laporan sedang diproses...</strong><br><em>Laporan akan tersedia dalam 2-3 menit di dashboard Anda.</em>`,
        'default': `🤖 Terima kasih atas pertanyaan Anda! Saya sedang menganalisis data melalui MCP server. Untuk hasil terbaik, coba gunakan salah satu dari Quick Actions yang tersedia.`
    };

    const lowerMessage = userMessage.toLowerCase();
    let responseKey = 'default';

    if (lowerMessage.includes('status') || lowerMessage.includes('data center')) responseKey = 'status';
    else if (lowerMessage.includes('energi') || lowerMessage.includes('konsumsi')) responseKey = 'energi';
    else if (lowerMessage.includes('maintenance') || lowerMessage.includes('prediksi')) responseKey = 'maintenance';
    else if (lowerMessage.includes('cooling') || lowerMessage.includes('optimasi')) responseKey = 'cooling';
    else if (lowerMessage.includes('laporan') || lowerMessage.includes('generate')) responseKey = 'laporan';

    messages.push({
        id: Date.now(),
        sender: 'ai',
        content: responses[responseKey],
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
}

// --- Lifecycle Hook ---
onMounted(() => {
    messages.push({
        id: 1,
        sender: 'ai',
        content: `Halo! Saya adalah AI Assistant EnviroGuard yang terhubung dengan MCP server. Saya dapat membantu Anda dengan:
                     <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                         <li>Monitoring real-time data center</li>
                         <li>Analisis prediktif dan anomaly detection</li>
                         <li>Optimasi energi dan efisiensi</li>
                         <li>Troubleshooting dan maintenance guidance</li>
                         <li>Laporan dan insights berbasis AI</li>
                     </ul>
                     <p style="margin-top: 0.5rem;">Bagaimana saya bisa membantu Anda hari ini?</p>`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
    chatInputRef.value.focus();
});
</script>

<style scoped>
:root {
    --primary-color: #1a73e8;
    --secondary-color: #34a853;
    --accent-color: #fbbc04;
    --danger-color: #ea4335;
    --dark-color: #202124;
    --light-color: #f8f9fa;
    --white: #ffffff;
    --gray-100: #f1f3f4;
    --gray-200: #e8eaed;
    --gray-300: #dadce0;
    --gray-400: #bdc1c6;
    --gray-500: #9aa0a6;
    --gray-600: #80868b;
    --gray-700: #5f6368;
    --gray-800: #3c4043;
    --gray-900: #202124;
    --border-radius: 16px;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --gradient-primary: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
    --gradient-secondary: linear-gradient(135deg, #34a853 0%, #0f9d58 100%);
}

.page-wrapper {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.chatbot-container {
    width: 100%;
    max-width: 900px;
    height: 90vh;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-hover);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}

.chatbot-header {
    background: var(--gradient-primary);
    color: var(--white);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}

.chatbot-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.ai-avatar {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    animation: pulse 2s infinite;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #4caf50;
    border-radius: 50%;
    animation: blink 1.5s infinite;
}

.chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: var(--gray-100);
    display: flex;
    flex-direction: column;
}

.message {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    max-width: 80%;
    animation: slideIn 0.3s ease-out;
    margin-bottom: 1rem;
}

.message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.message.ai .message-avatar {
    background: var(--gradient-primary);
    color: var(--white);
}

.message.user .message-avatar {
    background: var(--gradient-secondary);
    color: var(--white);
}

.message-content {
    background: var(--white);
    padding: 1rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    position: relative;
}

.message.user .message-content {
    background: var(--primary-color);
    color: var(--white);
}

.message-time {
    font-size: 0.75rem;
    color: var(--gray-500);
    margin-top: 0.5rem;
    text-align: right;
}

.message.user .message-time {
    color: rgba(255, 255, 255, 0.7);
}


.typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 1rem;
}

.typing-dots {
    display: flex;
    gap: 0.25rem;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background: var(--gray-400);
    border-radius: 50%;
    animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

.chat-input-container {
    padding: 1rem;
    background: var(--white);
    border-top: 1px solid var(--gray-200);
    flex-shrink: 0;
}

.chat-input-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
}

.chat-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid var(--gray-200);
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;
    resize: none;
    line-height: 1.5;
    min-height: 50px;
    max-height: 120px;
    transition: var(--transition);
}

.chat-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.send-button {
    background: var(--gradient-primary);
    color: var(--white);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1.2rem;
    flex-shrink: 0;
}

.send-button:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-hover);
}

.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.quick-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-left: 55px;
    /* Aligns with message content */
    flex-wrap: wrap;
}

.quick-action {
    background: var(--white);
    border: 2px solid var(--gray-200);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
}

.quick-action:hover {
    border-color: var(--primary-color);
    background: rgba(26, 115, 232, 0.05);
    color: var(--primary-color);
}

.mcp-status {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.mcp-indicator {
    width: 6px;
    height: 6px;
    background: #4caf50;
    border-radius: 50%;
    animation: blink 2s infinite;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes typing {

    0%,
    60%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-6px);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

@media (max-width: 768px) {
    .page-wrapper {
        padding: 0;
    }

    .chatbot-container {
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        max-width: 100%;
    }

    .message {
        max-width: 90%;
    }

    .quick-actions {
        margin-left: 0;
        justify-content: flex-start;
    }
}
</style>