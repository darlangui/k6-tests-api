import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const AUTH_TOKEN = __ENV.AUTH_TOKEN || 'seu_token_aqui';

export const options = {
    vus: 2,
    duration: '30s'
};

export function testGetNotifications() {
    const params = {
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        }
    };

    const res = http.get(`${BASE_URL}/notifications`, params);

    check(res, {
        'GET status is 200': (r) => r.status === 200,
        'has notifications': (r) => {
            const body = JSON.parse(r.body);
            return body.length > 0;
        }
    });
}

// Teste de POST de Notificação
export function testPostNotification() {
    const payload = JSON.stringify({
        description: 'Teste de notificação K6',
        notification_category: 'sistema',
        user_id: 1
    });

    const params = {
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        }
    };

    const res = http.post(`${BASE_URL}/notifications`, payload, params);

    check(res, {
        'POST status is 201': (r) => r.status === 201
    });
}

// Função principal de teste
export default function() {
    testGetNotifications();
    testPostNotification();

    // Pausa entre testes
    sleep(1);
}