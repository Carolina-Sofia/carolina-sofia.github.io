// payment.js

// Replace with your real keys (not secure to put here in production)
const IF_THEN_PAY_MB_KEY = "KQK-578261";
const IF_THEN_PAY_LINK_KEY = "AWXN-360161";
const IF_THEN_PAY_MBWAY_KEY = "XLM-091312";
const IF_THEN_PAY_CC_KEY = "LQG-147826"; 

// Generate Multibanco Reference
async function generateMultibancoReference(orderId, amount, clientName, clientPhone) {
    const url = 'https://api.ifthenpay.com/multibanco/reference/init';
    const body = {
        mbKey: IF_THEN_PAY_MB_KEY,
        orderId: orderId,
        amount: amount,
        clientName: clientName,
        clientPhone: clientPhone
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar referência multibanco:', data);
        throw new Error(data.message || 'Falha ao obter referência multibanco.');
    }

    console.log('Multibanco Reference Data:', data);
    return data; // { Entity, Reference, Amount, ... }
}

// Generate MBWay Payment Request
async function generateMBWayPayment(orderId, amount, phoneNumber, email, motivo) {
    // Check IfThenPay docs for the exact MBWay endpoint and body format.
    // The following is an example placeholder:
    const url = 'https://api.ifthenpay.com/spg/payment/mbway';
    const body = {
        mbWayKey: IF_THEN_PAY_MBWAY_KEY,
        orderId: orderId,
        amount: amount,
        mobileNumber: phoneNumber,
        email: email,
        description: motivo
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar pagamento MBWay:', data);
        throw new Error(data.message || 'Falha ao obter pagamento MBWay.');
    }

    console.log('MBWay Payment Data:', data);
    return data; // { transactionId, status, etc. }
}

// Generate Payment Link
// async function generatePaymentLink(orderId, amount) {
//     const url = `https://api.ifthenpay.com/creditcard/init/${IF_THEN_PAY_CC_KEY}`;
//     const body = {
//         orderId: orderId,
//         amount: amount,
//         successUrl: 'https://www.ambula.pt/pagamento-aprovado/',
//         errorUrl: 'https://www.ambula.pt',
//         cancelUrl: 'https://www.ambula.pt/pagamento-recusado/',
//         language: 'pt'
//     };

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//         console.error('Erro ao gerar link de pagamento:', data);
//         throw new Error(data.message || 'Falha ao obter link de pagamento.');
//     }

//     console.log('Payment Link Data:', data);
//     return data; // { PaymentUrl, ... }
// }

// Generate Credit Card Payment Request
async function generateCreditCardPayment(orderId, amount, clientName, clientEmail) {
    const url = `https://api.ifthenpay.com/creditcard/init/${IF_THEN_PAY_CC_KEY}`; 
    const body = {
        orderId: orderId,
        amount: amount,
        clientName: clientName,
        clientEmail: clientEmail,
        successUrl: 'https://www.ambula.pt/pagamento-aprovado/',
        errorUrl: 'https://www.ambula.pt/pagamento-recusado/',
        cancelUrl: 'https://www.ambula.pt/pagamento-cancelado/',
        language: 'pt'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar pagamento com cartão de crédito:', data);
        throw new Error(data.message || 'Falha ao processar pagamento com cartão de crédito.');
    }

    console.log('Credit Card Payment Data:', data);
    return data; // { PaymentUrl, status, etc. }
}