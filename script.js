//When you click on Ambula e resets to the first page.
function resetToFirstPage() {
    // Reset all sections to their default states
    document.getElementById('description-section').style.display = "block"; // Show the description
    document.getElementById('form-section').style.display = "block"; // Show the form section

    document.getElementById('resume-section').style.display = "none"; // Hide other sections
    document.getElementById('details-section').style.display = "none";
    document.getElementById('equip-section').style.display = "none";
    document.getElementById('confirm-section').style.display = "none";
    document.getElementById('pay-section').style.display = "none";

    // Reset form fields
    document.getElementById('pickup').value = '';
    document.getElementById('destination').value = '';

    // Reset date to today
    const dateInput = document.getElementById('date');
    const today = new Date();
    dateInput.value = today.toISOString().split("T")[0]; 

    // Reset time to default
    document.getElementById('time').value = '09:00';

    // Reset image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/ambulancia.svg";
    image.alt = "Ambulance";
    image.classList.remove('fixed-image');

    // Disable the Verify button
    document.getElementById('verify-button').disabled = true;

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}

// Change to Resumo Page
function changeToResumo() {
    // Get form values
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const formattedDate = formatDate(date);

    // Update the "Resumo Pedido" content
    document.getElementById('pickup-summary').textContent = `${pickup}`;
    document.getElementById('destination-summary').textContent = `${destination}`;
    document.getElementById('date-summary').textContent = `${formattedDate}`;
    document.getElementById('time-summary').textContent = `${time}`;

    // Change the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/resume.svg";
    image.alt = "Resumo";
    image.classList.remove('fixed-image');

    // Hide the description
    const description = document.getElementById('description-section');
    description.style.display = "none"; // Hide the description

    // Show "Resumo Pedido" and hide the form
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'block';

    window.scrollTo(0, 0);
}

//Formatting the date to match both in first page and resumo
function formatDate(dateStr) {
    if (!dateStr) return ''; // Handle empty or undefined date

    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr; // Return original if format is unexpected

    return `${day}-${month}-${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; 
    dateInput.value = formattedDate; 

    // Existing code for date
    const dateInputGroup = document.getElementById('date-input-group');
    dateInputGroup.addEventListener('click', () => {
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        } else {
            dateInput.focus();
            dateInput.click();
        }
    });

    // New code for time
    const timeInput = document.getElementById('time');
    const timeInputGroup = document.getElementById('time-input-group');
    timeInputGroup.addEventListener('click', () => {
        if (typeof timeInput.showPicker === 'function') {
            timeInput.showPicker();
        } else {
            timeInput.focus();
            timeInput.click();
        }
    });
});

const verifyButton = document.getElementById('verify-button');
const pickupInput = document.getElementById('pickup');
const destinationInput = document.getElementById('destination');

function checkInputs() {
    if (pickupInput.value.trim() !== '' && destinationInput.value.trim() !== '') {
        verifyButton.disabled = false;
    } else {
        verifyButton.disabled = true;
    }
}

pickupInput.addEventListener('input', checkInputs);
destinationInput.addEventListener('input', checkInputs);


function goBackToForm() {
    // Show the description section
    const description = document.getElementById('description-section');
    description.style.display = "block"; 

    // Hide "Resumo Pedido" and show the form
    document.getElementById('resume-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';

    // Reset the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/ambulancia.svg";
    image.alt = "Ambulance";
    image.classList.remove('fixed-image');

    // Reset form fields to their initial values
    document.getElementById('pickup').value = '';
    document.getElementById('destination').value = '';
    // Reset the date to today again:
    const dateInput = document.getElementById("date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; 
    dateInput.value = formattedDate; 

    document.getElementById('time').value = '09:00';

    // Re-disable the Verify Route button since fields are empty now
    const verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;

    window.scrollTo(0, 0);
}


// Make sure that addresses are not empty
function validateForm() {
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();

    if (!pickup || !destination) {
        console.error("Both Pickup and Destination fields must be filled out.");
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }
    return { pickup, destination };
}

// Temporary price
let basePrice = 90.00;
const discountRate = 0.10;

// Function to calculate and update the total price
function updateTotal() {
    // Get the toggle and total price elements
    const toggle = document.getElementById("round-trip-toggle");
    const totalPriceElement = document.getElementById("total-price");

    // Calculate the total price
    let finalPrice = toggle.checked
        ? basePrice * (1 - discountRate) * 2 // Apply discount for round trip
        : basePrice; // Base price for one-way trip

    // Update the total price element
    totalPriceElement.textContent = `${finalPrice.toFixed(2).replace(".", ",")}€`;
}

// Set up the initial price on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the total price
    updateTotal();
});


// Change to page to fill in the details
function goToDetails() {
    // Hide the resumo section
    document.getElementById('resume-section').style.display = 'none';
    // Show the details section
    document.getElementById('details-section').style.display = 'block';

    // Update the image 
    const image = document.getElementById('dynamic-image');
    image.src = "Images/paciente.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    // Hide the description
    const description = document.getElementById('description-section');
    description.style.display = "none";

    window.scrollTo(0, 0);
}


// Go back to page Resumo
function goBackToResumo() {
    document.getElementById('details-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'block';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/resume.svg";
    image.alt = "Resumo";
    image.classList.remove('fixed-image');

    window.scrollTo(0, 0);
}

//Change between "Para mim" and "Para outro" - in Recolha de Dados page
document.addEventListener('DOMContentLoaded', function() {
    const paraMimButton = document.querySelector('.option-button[data-value="para-mim"]');
    const paraOutroButton = document.querySelector('.option-button[data-value="para-outro"]');

    const userPhoneGroup = document.getElementById('user-phone-group');
    const userEmailGroup = document.getElementById('user-email-group');
    const responsavelFields = document.getElementById('responsavel-fields');

    // Function to update the form based on selection
    function updateForm(isParaOutro) {
        if (isParaOutro) {
            responsavelFields.classList.remove('hidden');
            // Hide user's phone number and email
            userPhoneGroup.classList.add('hidden');
            userEmailGroup.classList.add('hidden');
        } else {
            // Hide responsible person's fields
            responsavelFields.classList.add('hidden');
            // Show user's phone number and email
            userPhoneGroup.classList.remove('hidden');
            userEmailGroup.classList.remove('hidden');
        }
    }

    // Event listeners for the buttons
    paraMimButton.addEventListener('click', function() {
        paraMimButton.classList.add('active');
        paraOutroButton.classList.remove('active');
        updateForm(false);
    });

    paraOutroButton.addEventListener('click', function() {
        paraOutroButton.classList.add('active');
        paraMimButton.classList.remove('active');
        updateForm(true);
    });
});


// Change to New Form Page
function goToEquip() {
    // Hide the details section
    document.getElementById('details-section').style.display = 'none';

    // Show the new form section
    const newFormSection = document.getElementById('equip-section');
    newFormSection.style.display = 'block';

    // Update the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/time.svg"; // Replace with the actual path to your image
    image.alt = "New Form";
    image.classList.add('fixed-image');

    // Hide the description (if applicable)
    const description = document.getElementById('description-section');
    if (description) {
        description.style.display = "none";
    }

    window.scrollTo(0, 0);
}


// Can only pick on checkbox
const checkboxes = document.querySelectorAll('.equip-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

// Go back to page Details
function goBackToDetails() {
    document.getElementById('details-section').style.display = 'block';
    document.getElementById('equip-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/paciente.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

// Change to Confirmation Page
function goToConfirm() {
    // Hide the equipment section
    document.getElementById('equip-section').style.display = 'none';

    // Show the confirmation section
    const newFormSection = document.getElementById('confirm-section');
    newFormSection.style.display = 'block';

    // Get user details with default values for optional fields
    const age = document.getElementById('age').value || 'N/A'; 
    const weight = document.getElementById('weight').value || 'N/A';
    const genderSelect = document.getElementById('gender');
    const genderText = genderSelect ? genderSelect.options[genderSelect.selectedIndex].textContent : 'N/A';
    const name = document.getElementById('user-name').value || 'N/A';
    const pickup = document.getElementById('pickup').value || 'N/A';
    const destination = document.getElementById('destination').value || 'N/A';
    const date = document.getElementById('date').value || 'N/A';
    const time = document.getElementById('time').value || 'N/A';
    const formattedDate = date !== 'N/A' ? formatDate(date) : 'N/A';

    // Transport details
    const checkboxes = document.querySelectorAll('.equip-checkbox');
    const selectedOptions = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const optionTitle = checkbox.closest('.section').querySelector('h3').textContent;
            selectedOptions.push(optionTitle);
        }
    });
    const forma = selectedOptions.join(', ') || 'N/A';
    const motivo = document.getElementById('transport-reason');
    const motivoText = motivo ? motivo.options[motivo.selectedIndex].textContent : 'N/A';

    // Extras
    const extrasCheckboxes = document.querySelectorAll('.section input[type="checkbox"]');
    const selectedExtras = [];
    let extrasTotalPrice = 0;

    extrasCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const extraSection = checkbox.closest('.section');
            const extraName = extraSection.querySelector('h3').textContent;
            const extraPriceMatch = extraName.match(/\+ €([\d,.]+)/); // Extract price using regex
            const extraPrice = extraPriceMatch ? parseFloat(extraPriceMatch[1].replace(",", ".")) : 0;

            selectedExtras.push(extraName);
            extrasTotalPrice += extraPrice; // Sum up the prices
        }
    });

    // Get transport price dynamically from the updateTotal function
    const transportPriceElement = document.getElementById('total-price');
    const transportPrice = parseFloat(transportPriceElement.textContent.replace("€", "").replace(",", "."));

    // Calculate final total price
    const totalPrice = transportPrice + extrasTotalPrice;

    // Update content
    document.getElementById('age-summary').textContent = `${age} anos`;
    document.getElementById('weight-summary').textContent = `${weight} kg`;
    document.getElementById('sexo-summary').textContent = `${genderText}`;
    document.getElementById('nome-utente-summary').textContent = `${name}`;
    document.getElementById('pickup-summary2').textContent = `${pickup}`;
    document.getElementById('destination-summary2').textContent = `${destination}`;
    document.getElementById('date-summary2').textContent = `${formattedDate}`;
    document.getElementById('time-summary2').textContent = `${time}`;
    document.getElementById('forma-summary').textContent = `${forma}`;
    document.getElementById('motivo-summary').textContent = `${motivoText}`;

    // Fill extras summary fields
    document.getElementById('extra1-summary').textContent = selectedExtras[0] || '';
    document.getElementById('extra2-summary').textContent = selectedExtras[1] || '';
    document.getElementById('extra3-summary').textContent = selectedExtras[2] || '';
    document.getElementById('extra4-summary').textContent = selectedExtras[3] || '';

    // Update total prices in the confirmation page
    const transportPriceField = document.getElementById('transport-price');
    const extrasPriceField = document.getElementById('extras-price');
    const totalPriceField = document.getElementById('total-price-confirmation');
    
    transportPriceField.innerHTML = `<strong>Transporte:</strong> ${transportPrice.toFixed(2).replace('.', ',')}€`;
    extrasPriceField.innerHTML = `<strong>Equipamentos extra:</strong> ${extrasTotalPrice.toFixed(2).replace('.', ',')}€`;
    totalPriceField.textContent = `${totalPrice.toFixed(2).replace('.', ',')}€`;

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}


// Go back to page Equipment
function goBackToEquip() {
    document.getElementById('equip-section').style.display = 'block';
    document.getElementById('confirm-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/time.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

// Select and Unselect Maca e Cadeira de Rodas
document.addEventListener('DOMContentLoaded', () => {
    const equipSections = document.querySelectorAll('.equip-form .section');
    let currentMainOption = 'acamado'; // Since acamado is preselected by default

    equipSections.forEach(section => {
        section.addEventListener('click', (e) => {
            const input = section.querySelector('input');

            // If clicked directly on input or not, we handle the same way
            // Check if main or extra
            if (section.hasAttribute('data-main')) {
                // It's a main option
                const optionName = section.getAttribute('data-main');
                if (currentMainOption === optionName) {
                    // Clicking the same selected option deselects it
                    input.checked = false;
                    currentMainOption = null;
                } else {
                    // Selecting a different main option
                    uncheckAllMainOptions();
                    input.checked = true;
                    currentMainOption = optionName;
                }
            } else {
                // It's an extra equipment checkbox
                input.checked = !input.checked;
                handleOverrides();
            }
        });
    });

    function uncheckAllMainOptions() {
        equipSections.forEach(sec => {
            if (sec.hasAttribute('data-main')) {
                const inp = sec.querySelector('input[type="radio"]');
                inp.checked = false;
            }
        });
        currentMainOption = null;
    }

    function handleOverrides() {
        const pessoaAutonomaSec = equipSections[0]; // data-main="autonoma"
        const cadeiraRodasSec = equipSections[1];   // data-main="cadeira"
        const acamadoMacaSec = equipSections[2];    // data-main="acamado"

        const oxigenoterapia = equipSections[3].querySelector('input[type="checkbox"]'); // index 3
        const aluguerCadeira = equipSections[4].querySelector('input[type="checkbox"]'); // index 4
        const macaCoquille = equipSections[5].querySelector('input[type="checkbox"]');   // index 5
        const monitorizacao = equipSections[6].querySelector('input[type="checkbox"]');  // index 6

        // Fazer check se cadeira está selectionada then coquille has to go false

        if (aluguerCadeira.checked) {
            // If Aluguer Cadeira is checked, select Cadeira de rodas
            uncheckAllMainOptions();
            cadeiraRodasSec.querySelector('input[type="radio"]').checked = true;
            acamadoMacaSec.querySelector('input[type="radio"]').checked = false;
            currentMainOption = 'cadeira';
            // Uncheck Maca Coquille if it was checked
        }
        
        if (macaCoquille.checked) {
            // If Maca Coquille is checked, select Acamado/Maca
            uncheckAllMainOptions();
            acamadoMacaSec.querySelector('input[type="radio"]').checked = true;
            cadeiraRodasSec.querySelector('input[type="radio"]').checked = false;
            currentMainOption = 'acamado';
            // Uncheck Aluguer Cadeira if it was checked
            
        }
          
    }
});


// Change to Pay Page
function goToPay() {
    // Hide the details section
    document.getElementById('confirm-section').style.display = 'none';

    // Show the new form section
    const newFormSection = document.getElementById('pay-section');
    newFormSection.style.display = 'block';

    // Update the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/pagamento.svg"; // Replace with the actual path to your image
    image.alt = "Pagamento";
    image.classList.add('fixed-image');

    // Get the total price from the confirmation page
    const totalPriceElement = document.getElementById('total-price-confirmation');
    const totalPrice = totalPriceElement.textContent.trim();

    // Update the "PAGAR AGORA" button
    const payNowButton = document.querySelector('.pay-now-button');
    const payNowValue = document.getElementById('pay-now-value');

    if (payNowButton && payNowValue) {
        payNowValue.textContent = ` ${totalPrice}`;
    }

    // Hide the description (if applicable)
    const description = document.getElementById('description-section');
    if (description) {
        description.style.display = "none";
    }

    window.scrollTo(0, 0);
}


function goBackToConfirm() {
    document.getElementById('confirm-section').style.display = 'block';
    document.getElementById('pay-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/recap.svg";
    image.alt = "Recap";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

//Pagamento por MBWay
function toggleMbway(selectedOption) {
    const mbwayGroup = document.getElementById('mbway');
    if (selectedOption.value === 'mbway') {
        mbwayGroup.style.display = 'block'; // Make the MBWay input visible
        console.log('MBWay section displayed.');
    } else {
        mbwayGroup.style.display = 'none'; // Hide it when not selected
        console.log('MBWay section hidden.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value !== 'mbway') {
                document.getElementById('mbway').style.display = 'none';
            }
        });
    });
});


//Clicar no botão pagar agora
function handlePayment() {
    // Get the selected payment method
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        console.error('No payment method selected.');
        alert('Por favor, selecione um método de pagamento antes de prosseguir.');
        return;
    }


    // Handle MBWay phone number validation early
    if (selectedMethod.value === 'mbway') {
        const phoneNumberField = document.getElementById('mbway-phone-number');
        if (!phoneNumberField) {
            console.error('Phone number input field not found.');
            alert('Por favor, insira um número de telemóvel válido para concluir o pagamento via MBWay.');
            return;
        }

        const phoneNumber = phoneNumberField.value.trim();

        if (!phoneNumber || !/^\d{9}$/.test(phoneNumber)) {
            alert('Por favor, insira um número de telemóvel válido (9 dígitos) para concluir o pagamento via MBWay.');
            phoneNumberField.focus();
            return;
        }
    }

    // Validation passed; hide unnecessary elements
    document.getElementById('forma-pagamento-h3').style.display = 'none';
    document.getElementById('NIF').style.display = 'none';
    document.getElementById('pay-now-button').style.display = 'none';
    document.getElementById('back-button-payment').style.display = 'none';

    // Get the summary box
    const summaryBox = document.querySelector('#pay-section .summary-box');
    if (!summaryBox) {
        console.error('Summary box not found.');
        alert('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
        return;
    }

    // Clear the summary box content
    summaryBox.innerHTML = '';

    // Get the total price
    const totalPriceElement = document.getElementById('total-price-confirmation');
    if (!totalPriceElement) {
        console.error('Total price element not found.');
        alert('Ocorreu um erro ao obter o valor total. Por favor, tente novamente.');
        return;
    }

    const totalPrice = totalPriceElement.textContent ? totalPriceElement.textContent.trim() : 'N/A';

    // Handle payment methods
    if (selectedMethod.value === 'multibanco') {

        const entidade = 'Placeholder Entidade'; // Replace with API value
        const referencia = 'Placeholder Referência'; // Replace with API value

        summaryBox.innerHTML = `
            <p>A sua referência para pagamento Multibanco foi gerada com sucesso. Utilize os dados abaixo para concluir o pagamento:</p>
            <ul>
                <li><strong>Entidade:</strong> ${entidade}</li>
                <li><strong>Referência:</strong> ${referencia}</li>
                <li><strong>Valor:</strong> ${totalPrice}</li>
            </ul>
            <p>Após o pagamento, receberá um email de confirmação. Obrigado por utilizar os nossos serviços.</p>
        `;
    } else if (selectedMethod.value === 'mbway') {
        let timeLeft = 5 * 60; // 5 minutes in seconds

        summaryBox.innerHTML = `
            <p>O pagamento via MBWay está a ser processado. Conclua a transação na sua aplicação MBWay antes que o tempo expire:</p>
            <p id="timer"><strong>Tempo restante:</strong> 05:00</p>
            <p>Após a confirmação do pagamento, enviaremos um email com os detalhes. Obrigado por confiar nos nossos serviços.</p>
        `;

        const timerElement = document.getElementById('timer');
        if (!timerElement) {
            console.error('Timer element not found.');
            return;
        }

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            timerElement.textContent = `Tempo restante: ${minutes}:${seconds}`;

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = 'O tempo expirou. Tente novamente.';
            }
        }, 1000);
    } else if (selectedMethod.value === 'link') {

        const paymentLink = 'https://www.google.com'; // Replace with API link

        summaryBox.innerHTML = `
            <p>Para concluir o pagamento, clique no link abaixo:</p>
            <p><a href="${paymentLink}" target="_blank" class="payment-link">Concluir Pagamento</a></p>
            <p>Após a confirmação do pagamento, enviaremos um email de confirmação. Obrigado por escolher os nossos serviços.</p>
        `;
    } else {
        alert('Método de pagamento inválido. Por favor, tente novamente.');
    }
}





//APIs------------------------------------------------------------------------------
// APIs LET'S TRY
// const GOOGLE_API_KEY = "AIzaSyBkuGwkSA-LHcRedNwDGjNUDYOdcM0Z5V8"; 

// async function getPlaceId(address) {
//     const url = `http://localhost:3000/api/place?address=${encodeURIComponent(address)}`;

//     try {
//         const response = await fetch(url); // No need for no-cors here
//         if (!response.ok) throw new Error("Failed to fetch Place ID from the proxy");

//         const data = await response.json();
//         if (data.candidates && data.candidates.length > 0) {
//             return data.candidates[0].place_id; // Extract Place ID from the response
//         } else {
//             console.error(`No Place ID found for address: ${address}`);
//             return null;
//         }
//     } catch (error) {
//         console.error(`Error fetching Place ID for address: ${address}`, error);
//         return null;
//     }
// }
