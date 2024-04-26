/* eslint-disable @typescript-eslint/no-explicit-any */
const handleRequestError = (error: { response: { data: any; status: any; headers: any; }; request: any; message: any; }) => {
    if (error.response) {
        // O servidor retornou uma resposta com um código de status diferente de 2xx
        console.error('Erro de resposta do servidor:', error.response.data);
        console.error('Código de status HTTP:', error.response.status);
        console.error('Cabeçalhos da resposta:', error.response.headers);
    } else if (error.request) {
        // A solicitação foi feita, mas não recebeu resposta
        console.error('Erro de requisição:', error.request);
    } else {
        // Ocorreu um erro durante a configuração da solicitação
        console.error('Erro ao configurar a solicitação:', error.message);
    }
};

export default handleRequestError;