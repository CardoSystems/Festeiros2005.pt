/* Form handling script */
document.addEventListener('DOMContentLoaded', function() {
    setupFormSubmission(document.getElementById('order-form'));
    setupFormSubmission(document.getElementById('contact-form'));
    setupContactPopup();
});

function isValidUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function setupFormSubmission(formElement) {
    if (!formElement) return;

    formElement.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = formElement.querySelector('.submit-btn');
        const formSuccess = formElement.querySelector('.form-success');
        const formError = formElement.querySelector('.form-error');

        if (!submitBtn || !formSuccess || !formError) return;

        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'A enviar...';
        submitBtn.disabled = true;

        const formData = new FormData(formElement);
        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        const accessKey = String(formData.get('access_key') || '').trim();
        const formId = String(formData.get('form_id') || '').trim();

        if (!isValidUuid(accessKey) || (formId && !isValidUuid(formId))) {
            formError.style.display = 'block';
            formError.textContent = 'Configuração inválida do formulário: o access_key/form_id tem de ser um UUID válido. Atualize a chave Web3Forms no HTML.';
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const json = await response.json();

            if (response.status === 200) {
                formSuccess.style.display = 'block';
                formElement.reset();
            } else {
                console.log(json);
                formError.style.display = 'block';
                formError.innerHTML = json.message || 'Ocorreu um erro ao enviar o formulário. Por favor tente novamente.';
            }
        })
        .catch((error) => {
            console.log(error);
            formError.style.display = 'block';
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            const messageToShow = formSuccess.style.display === 'block' ? formSuccess : formError;
            if (messageToShow.style.display === 'block') {
                messageToShow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            if (formSuccess.style.display === 'block') {
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    });
}

function setupContactPopup() {
    const popup = document.getElementById('contact-popup');
    const openBtn = document.getElementById('open-contact-popup');
    const closeBtn = document.getElementById('close-contact-popup');

    if (!popup || !openBtn || !closeBtn) return;

    const openPopup = () => {
        popup.classList.add('is-open');
        popup.setAttribute('aria-hidden', 'false');
        document.body.classList.add('popup-open');
    };

    const closePopup = () => {
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('popup-open');
    };

    openBtn.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);

    popup.addEventListener('click', (event) => {
        const closeTarget = event.target.closest('[data-close-contact-popup="true"]');
        if (closeTarget) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.classList.contains('is-open')) {
            closePopup();
        }
    });
}