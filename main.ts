import http from 'k6/http';
import { sleep } from 'k6';
import { Options } from 'k6/options';

export const options: Options = {
    iterations: 10,
    vus: 1,
    duration: '30s',
};

export default function() {
    const response = http.get('https://portal.tcheturbo.com.br/login/');

    if (response.status !== 200) {
        console.error(`Falha na requisição: Status ${response.status}`);
    }

    sleep(1);
}