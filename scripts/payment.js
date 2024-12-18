// // payment.js

// // Replace with your real keys (not secure to put here in production)
// const IFTHENPAY_MB_KEY = "YOUR_MB_KEY";
// const IFTHENPAY_LINK_KEY = "YOUR_LINK_KEY";

// // Generate Multibanco Reference
// async function generateMultibancoReference(orderId, amount, clientName, clientPhone) {
//     const url = 'https://api.ifthenpay.com/multibanco/reference/init';
//     const body = {
//         mbKey: IFTHENPAY_MB_KEY,
//         orderId: orderId,
//         amount: amount,
//         clientName: clientName,
//         clientPhone: clientPhone
//     };

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//         console.error('Erro ao gerar referência multibanco:', data);
//         throw new Error(data.message || 'Falha ao obter referência multibanco.');
//     }

//     console.log('Multibanco Reference Data:', data);
//     return data; // { Entity, Reference, Amount, ... }
// }

// // Generate MBWay Payment Request
// async function generateMBWayPayment(orderId, amount, phoneNumber) {
//     // Check IfThenPay docs for the exact MBWay endpoint and body format.
//     // The following is an example placeholder:
//     const url = 'https://api.ifthenpay.com/mbway/init';
//     const body = {
//         mbKey: IFTHENPAY_MB_KEY,
//         orderId: orderId,
//         amount: amount,
//         mbwayPhone: phoneNumber
//     };

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//         console.error('Erro ao gerar pagamento MBWay:', data);
//         throw new Error(data.message || 'Falha ao obter pagamento MBWay.');
//     }

//     console.log('MBWay Payment Data:', data);
//     return data; // { transactionId, status, etc. }
// }

// // Generate Payment Link
// async function generatePaymentLink(orderId, amount) {
//     const url = 'https://api.ifthenpay.com/gateway/pinpay';
//     const body = {
//         orderid: orderId,
//         amount: amount,
//         successUrl: 'https://www.seusite.com/sucesso',
//         errorUrl: 'https://www.seusite.com/erro',
//         cancelUrl: 'https://www.seusite.com/cancelado',
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
