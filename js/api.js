const shedulePickuPApi = (fullname, email, phoneNumber, busStop, address, numberOfItem, AdditionalMessage, notificationDivElement) => {
    console.log('Shedule Pick up Api was called..')
    $.ajax({
        type: 'POST',
        url: "https://laundary-api.herokuapp.com/api/pick-up/",
        headers: {
        },
        data: {
            full_name: fullname,
            email: email,
            phone_number: phoneNumber,
            bus_stop: busStop,
            address: address,
            number_of_item: numberOfItem,
            message: AdditionalMessage
        },
        beforeSend: () => {
            sheduleBtn.firstElementChild.innerText = 'Submitting..'
            $('#sheduleBtnSpinner').show()
            sheduleBtn.setAttribute('disabled', '')

            setTimeout((e) => {
                $('#notification-card1').show()
                $('#notification-card1').removeClass('alert-success')
                $('#notification-card1').addClass('alert-warning')
                notificationDivElement.firstElementChild.innerHTML = `🙁 The process seem to be taking longer than expected please check your internet connection and refresh the page OR wait a little more. <span class="icon-exclamation-circle pl-2"></span>`

            }, 20000)

            setTimeout((e) => {
                $('#notification-card1').hide()
            }, 5000)

        },
        complete: () => {
            sheduleBtn.removeAttribute('disabled', '')
            sheduleBtn.firstElementChild.innerText = 'Submit'
            $('#sheduleBtnSpinner').hide()

            // reset google grecaptcha
            grecaptcha.reset(widgetId1);
        },
        success: (data) => {
            // no need using the data
            console.log('data', data)
            $('#notification-card1').show()
            $('#notification-card1').removeClass('alert-warning')
            $('#notification-card1').addClass('alert-success')
            notificationDivElement.firstElementChild.innerHTML = `Thanks!😀, your <span style="font-weight: bold;">Shedule</span> has been received, we'll get in-touch with you shortly <span class="icon-check pl-2"></span>`

            sheduleForm.reset()
            setTimeout((e) => {
                $('#notification-card1').hide()
            }, 7000)
        },
        error: (err) => {
            // do something
            console.log('failed to submit: ', err)
            $('#notification-card1').show()
            $('#notification-card1').removeClass('alert-success')
            $('#notification-card1').addClass('alert-warning')

            if (typeof err['responseJSON'] !== "undefined") {
                notificationDivElement.firstElementChild.innerHTML = `🙁 ${err['responseJSON']['phone_number'][0]}<span class="icon-exclamation-circle pl-2"></span>`
            } else {
                notificationDivElement.firstElementChild.innerHTML = `🙁 Failed to Submit..(I think it from us..) Please try again! <span class="icon-exclamation-circle pl-2"></span>`
            }

            setTimeout((e) => {
                $('#notification-card1').hide()
                sheduleBtn.firstElementChild.innerText = "Submit"
            }, 5000)
        },
    });

};

const contactApi = (fullname, email, subject, message, notificationDivElement) => {
    console.log('Contact Api was called..')
    $.ajax({
        type: 'POST',
        url: "https://laundary-api.herokuapp.com/api/contact/",
        headers: {
        },
        data: {
            full_name: fullname,
            email: email,
            subject: subject,
            message: message
        },
        beforeSend: () => {
            contactBtn.firstElementChild.innerText = 'Sending...'
            $('#contactBtnSpinner').show()
            contactBtn.setAttribute('disabled', '')
        },
        complete: () => {
            contactBtn.removeAttribute('disabled', '')
            contactBtn.firstElementChild.innerText = 'Submit'
            $('#contactBtnSpinner').hide()
            // reset google grecaptcha
            grecaptcha.reset(widgetId2);
        },
        success: (data) => {
            // no need using the data
            console.log('data', data)
            $('#notification-card1').show()
            $('#notification-card1').removeClass('alert-warning')
            $('#notification-card1').addClass('alert-success')
            notificationDivElement.firstElementChild.innerHTML = `Thanks!😀, your <span style="font-weight: bold;">Contact</span> has been sent, we'll get in touch with you through your email <span class="icon-check pl-2"></span>`

            contactForm.reset()
            setTimeout((e) => {
                $('#notification-card1').hide()
            }, 7000)
        },
        error: (err) => {
            // do something
            console.log('failed to submit: ', err)
            $('#notification-card1').show()
            $('#notification-card1').removeClass('alert-success')
            $('#notification-card1').addClass('alert-warning')
            notificationDivElement.firstElementChild.innerHTML = `🙁 Failed to Send.. Please try again! <span class="icon-exclamation-circle pl-2"></span>`

            setTimeout((e) => {
                $('#notification-card1').hide()
                contactBtn.firstElementChild.innerText = "Send Message"
            }, 5000)
        },
    });

};

const gallaryApi = () => {
    console.log('Gallary Api was called..')
    setTimeout((e)=>{
        $.ajax({
            type: 'GET',
            url: "https://laundary-api.herokuapp.com/api/gallary/?q=8",
            headers: {
            },
            beforeSend: () => {
                $('#gallarySpinner').show()
            },
            complete: () => {
                $('#gallarySpinner').hide()
            },
            success: (data) => {
                // no need using the data
                console.log('data', data)

                let responce = data['response']
                if (responce.length > 0) {
                    let gallaryData = ``
                    responce.forEach(element => {
                        gallaryData += `<a class="col-6 col-md-6 col-lg-4 col-xl-3 gal-item d-block" href="${element['image_url']}" data-fancybox="gal">
                    <img src="${element['image_url']}" alt="${element['description']}" class="img-fluid">
                </a>`

                        gallaryContent.innerHTML = gallaryData;
                    });

                } else {
                    gallaryContent.innerHTML = `<div class="card alert alert-warning m-auto text-center">
                                                <p>Opps! we have nothing here yet <span class="icon-exclamation-circle ml-2"></span></p>
                                            </div>`
                }

            },
            error: (err) => {
                // do something
                console.log('failed to submit: ', err)
                $('#gallarySpinner').hide()
                gallaryContent.innerHTML = `<div class="container text-center">
                                            <div class="card alert alert-warning m-auto">
                                                <p>Failed to fecth data, Please check your internet connection <span class="icon-exclamation-circle ml-2"></span></p>
                                            </div>
                                        </div>`

            },
        });
    }, 2000)
   

};

const testimonialApi = () => {
    console.log('Testimonial Api was called..')
    $.ajax({
        type: 'GET',
        url: "https://laundary-api.herokuapp.com/api/testimonials/",
        headers: {
        },
        beforeSend: () => {
            $('#testimonialSpinner').show()
        },
        complete: () => {
            $('#testimonialSpinner').hide()
        },
        success: (data) => {
            // no need using the data
            console.log('data', data)

            let responce = data['responce']
            if (responce.length > 0) {
                let testimonialData = ``
                responce.forEach(element => {
                    testimonialData += `<div>
                                            <div class="block-testimony-1 text-center">
                
                                                <blockquote class="mb-4">
                                                    <p>&ldquo;${element['testimony']}&rdquo;</p>
                                                </blockquote>

                                                <figure>
                                                    <img src="${element['image_url']}" alt="Image" class="img-fluid rounded-circle mx-auto">
                                                </figure>
                                                <h3 class="font-size-20 text-black">${element['full_name']}</h3>
                                            </div>
                                        </div>`

                    testimonialContent.innerHTML = testimonialData;
                });

            } else {
                testimonialContent.innerHTML = `<div class="card alert alert-warning m-auto text-center">
                                                <p>Opps! we have no data here yet. <span class="icon-exclamation-circle ml-2"></span></p>
                                            </div>`
            }

        },
        error: (err) => {
            // do something
            console.log('failed to submit: ', err)
            $('#testimonialSpinner').hide()
            testimonialContent.innerHTML = `<div class="card alert alert-warning m-auto text-center">
                                                    <p>Failed to fecth customer data, Please check your internet connection <span class="icon-exclamation-circle ml-2"></span></p>
                                                </div>`

        },
    });

};

const faqApi = () => {
    console.log('FAQ Api was called..')
    $.ajax({
        type: 'GET',
        url: "https://laundary-api.herokuapp.com/api/faq/?q=5",
        headers: {
        },
        beforeSend: () => {
            $('#faqSpinner').show()
        },
        complete: () => {
            $('#faqSpinner').hide()
        },
        success: (data) => {
            // no need using the data
            console.log('data', data)

            let responce = data['response']
            if (responce.length > 0) {
                let faqData = ``
                responce.forEach(element => {
                    faqData += `<div class="border p-3 rounded mb-2">
                                    <a data-toggle="collapse" href="#collapse-${element['id']}" role="button" aria-expanded="false"
                                        class="accordion-item h5 d-block mb-0">${element['question']}</a>
          
                                    <div class="collapse" id="collapse-${element['id']}">
                                        <div class="pt-2">
                                            <p class="mb-0">${element['answer']}</p>
                                        </div>
                                    </div>
                                </div>`

                    faqContent.innerHTML = faqData;
                });

            } else {
                faqContent.innerHTML = `<div class="card alert alert-warning m-auto text-center">
                                                    <p>Opps! we have no customers FAQ data yet.<span class="icon-exclamation-circle ml-2"></span></p>
                                                </div>`
            }

        },
        error: (err) => {
            // do something
            console.log('failed to submit: ', err)
            $('#faqSpinner').hide()
            faqContent.innerHTML = `<div class="card alert alert-warning m-auto text-center">
                                                    <p>Failed to fecth customer FAQ data, Please check your internet connection <span class="icon-exclamation-circle ml-2"></span></p>
                                                </div>`


        },
    });

};

const subscribeEmailPApi = (email, notificationCardId, notificationDivElement, preloaderId) => {
    console.log('Subscribe Email Api was called..')

    const emailIsValid = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
    if (!email) {
        $(`#${notificationCardId}`).show()
        $(`#${notificationCardId}`).removeClass('alert-success')
        $(`#${notificationCardId}`).addClass('alert-warning')
        notificationDivElement.firstElementChild.innerHTML = `Opps!🙁 You have an email address isn't it. <span class="icon-exclamation-circle pl-2"></span>`

        setTimeout((e) => {
            $(`#${notificationCardId}`).hide()
        }, 5000);

    }else if ( emailIsValid(email) ) {
        $.ajax({
            type: 'POST',
            url: "https://laundary-api.herokuapp.com/api/email-subscription/",
            headers: {
            },
            data: {
                email: email
            },
            beforeSend: () => {
                emailBtn.firstElementChild.innerText = 'Processing..'
                $(`#${preloaderId}`).show()
                emailBtn.setAttribute('disabled', '')
            },
            complete: () => {
                emailBtn.removeAttribute('disabled', '')
                emailBtn.firstElementChild.innerText = 'Subscribe'
                $(`#${preloaderId}`).hide()
                // reset google grecaptcha
                grecaptcha.reset(widgetId3);
            },
            success: (data) => {
                // no need using the data
                console.log('data', data)
                $(`#${notificationCardId}`).show()
                $(`#${notificationCardId}`).removeClass('alert-warning')
                $(`#${notificationCardId}`).addClass('alert-success')
                notificationDivElement.firstElementChild.innerHTML = `Thanks!😀, your <span style="font-weight: bold;">Email</span> has been added to our Mailing List, get ready for some Lovely Laundary Tips. <span class="icon-check pl-2"></span>`

                emailForm.reset()
                setTimeout((e) => {
                    $(`#${notificationCardId}`).hide()
                }, 7000)
            },
            error: (err) => {
                // do something
                console.log('failed to submit: ', err)
                $(`#${notificationCardId}`).show()
                $(`#${notificationCardId}`).removeClass('alert-success')
                $(`#${notificationCardId}`).addClass('alert-warning')

                if (err['responseJSON']['email']) {
                    let apiErrorMessage = err['responseJSON']['email']
                    notificationDivElement.firstElementChild.innerHTML = `🙁 ${apiErrorMessage[0]} <span class="icon-exclamation-circle pl-2"></span>`
                } else {
                    notificationDivElement.firstElementChild.innerHTML = `Opps!🙁 something went wrong, Please Try again. <span class="icon-exclamation-circle pl-2"></span>`
                }

                setTimeout((e) => {
                    $(`#${notificationCardId}`).hide()
                    emailBtn.firstElementChild.innerText = "Subscribe"
                }, 5000)
            },
        });

    } else {
        $(`#${notificationCardId}`).show()
        $(`#${notificationCardId}`).removeClass('alert-success')
        $(`#${notificationCardId}`).addClass('alert-warning')
        notificationDivElement.firstElementChild.innerHTML = `Invalid Email!🙁 Please check what you entered and try again. <span class="icon-exclamation-circle pl-2"></span>`

        setTimeout((e) => {
            $(`#${notificationCardId}`).hide()
        }, 5000)

    }
    
};


