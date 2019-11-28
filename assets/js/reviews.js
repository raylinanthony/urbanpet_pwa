;
(function($) {

    var proxyurl = "https://cors-anywhere.herokuapp.com/",
        quiz_container = '.quiz-container',
        quiz_swiper,
        _addPet = '.suscribe-pane .add-pet',
        smileBox = '.reviews-pane .smiles .smile',
        _menu = ' .wrap-menu a',
        _btnBack = '.btn-back ',
        activeClass = 'active',
        _petSec = '.pet-sec',
        _formStep2 = '.suscribe-step2',
        _wrapMenu = '.wrap-menu',
        maxPet = 3, //Number of pet that user can select
        reviewsPane = '.reviews-pane',
        suscribePane = '.suscribe-pane',

        reviewPane = '#review-section',
        thankyouPane = '.thankyou-pane',
        _config = '',
        _asideBreed = 'aside.breed',
        _counterReview = '.reviews-pane .counter',
        pwaConfig = pwaLoadData('data/pwa.json'),
        dogs = 'Affenpinscher,Afghan Hound,Airedale Terrier,Akita,Alaskan Malamute,American English Coonhound,American Eskimo Dog,American Foxhound,American Hairless Terrier,American Leopard Hound,American Staffordshire Terrier,American Water Spaniel,Anatolian Shepherd Dog,Appenzeller Sennenhund,Australian Cattle Dog,Australian Kelpie,Australian Shepherd,Australian Stumpy Tail Cattle Dog,Australian Terrier,Azawakh,Barbet,Basenji,Basset Fauve de Bretagne,Basset Hound,Bavarian Mountain Scent Hound,Beagle,Bearded Collie,Beauceron,Bedlington Terrier,Belgian Laekenois,Belgian Malinois,Belgian Sheepdog,Belgian Tervuren,Bergamasco Sheepdog,Berger Picard,Bernese Mountain Dog,Bichon Frise,Biewer Terrier,Black and Tan Coonhound,Black Russian Terrier,Bloodhound,Bluetick Coonhound,Boerboel,Bohemian Shepherd,Bolognese,Border Collie,Border Terrier,Borzoi,Boston Terrier,Bouvier des Flandres,Boxer,Boykin Spaniel,Bracco Italiano,Braque du Bourbonnais,Braque Francais Pyrenean,Briard,Brittany,Broholmer,Brussels Griffon,Bull Terrier,Bulldog,Bullmastiff,Cairn Terrier,Canaan Dog,Cane Corso,Cardigan Welsh Corgi,Carolina Dog,Catahoula Leopard Dog,Caucasian Shepherd Dog,Cavalier King Charles Spaniel,Central Asian Shepherd Dog,Cesky Terrier,Chesapeake Bay Retriever,Chihuahua,Chinese Crested,Chinese Shar-Pei,Chinook,Chow Chow,Cirneco dell’Etna,Clumber Spaniel,Cocker Spaniel,Collie,Coton de Tulear,Croatian Sheepdog,Curly-Coated Retriever,Czechoslovakian Vlcak,Dachshund,Dalmatian,Dandie Dinmont Terrier,Danish-Swedish Farmdog,Deutscher Wachtelhund,Doberman Pinscher,Dogo Argentino,Dogue de Bordeaux,Drentsche Patrijshond,Drever,Dutch Shepherd,English Cocker Spaniel,English Foxhound,English Setter,English Springer Spaniel,English Toy Spaniel,Entlebucher Mountain Dog,Estrela Mountain Dog,Eurasier,Field Spaniel,Finnish Lapphund,Finnish Spitz,Flat-Coated Retriever,French Bulldog,French Spaniel,German Longhaired Pointer,German Pinscher,German Shepherd Dog,German Shorthaired Pointer,German Spitz,German Wirehaired Pointer,Giant Schnauzer,Glen of Imaal Terrier,Golden Retriever,Gordon Setter,Grand Basset Griffon Vendéen,Great Dane,Great Pyrenees,Greater Swiss Mountain Dog,Greyhound,Hamiltonstovare,Hanoverian Scenthound,Harrier,Havanese,Hokkaido,Hovawart,Ibizan Hound,Icelandic Sheepdog,Irish Red and White Setter,Irish Setter,Irish Terrier,Irish Water Spaniel,Irish Wolfhound,Italian Greyhound,Jagdterrier,Japanese Chin,Japanese Spitz,Jindo,Kai Ken,Karelian Bear Dog,Keeshond,Kerry Blue Terrier,Kishu Ken,Komondor,Kromfohrlander,Kuvasz,Labrador Retriever,Lagotto Romagnolo,Lakeland Terrier,Lancashire Heeler,Lapponian Herder,Leonberger,Lhasa Apso,Löwchen,Maltese,Manchester Terrier (Standard),Manchester Terrier (Toy),Mastiff,Miniature American Shepherd,Miniature Bull Terrier,Miniature Pinscher,Miniature Schnauzer,Mountain Cur,Mudi,Neapolitan Mastiff,Nederlandse Kooikerhondje,Newfoundland,Norfolk Terrier,Norrbottenspets,Norwegian Buhund,Norwegian Elkhound,Norwegian Lundehund,Norwich Terrier,Nova Scotia Duck Tolling Retriever,Old English Sheepdog,Otterhound,Papillon,Parson Russell Terrier,Pekingese,Pembroke Welsh Corgi,Perro de Presa Canario,Peruvian Inca Orchid,Petit Basset Griffon Vendéen,Pharaoh Hound,Plott,Pointer,Polish Lowland Sheepdog,Pomeranian,Poodle (Miniature),Poodle (Standard),Poodle (Toy),Porcelaine,Portuguese Podengo,Portuguese Podengo Pequeno,Portuguese Pointer,Portuguese Sheepdog,Portuguese Water Dog,Pudelpointer,Pug,Puli,Pumi,Pyrenean Mastiff,Pyrenean Shepherd,Rafeiro do Alentejo,Rat Terrier,Redbone Coonhound,Rhodesian Ridgeback,Romanian Mioritic Shepherd Dog,Rottweiler,Russell Terrier,Russian Toy,Russian Tsvetnaya Bolonka,Saint Bernard,Saluki,Samoyed,Schapendoes,Schipperke,Scottish Deerhound,Scottish Terrier,Sealyham Terrier,Segugio Italiano,Shetland Sheepdog,Shiba Inu,Shih Tzu,Shikoku,Siberian Husky,Silky Terrier,Skye Terrier,Sloughi,Slovakian Wirehaired Pointer,Slovensky Cuvac,Slovensky Kopov,Small Munsterlander Pointer,Smooth Fox Terrier,Soft Coated Wheaten Terrier,Spanish Mastiff,Spanish Water Dog,Spinone Italiano,Stabyhoun,Staffordshire Bull Terrier,Standard Schnauzer,Sussex Spaniel,Swedish Lapphund,Swedish Vallhund,Taiwan Dog,Teddy Roosevelt Terrier,Thai Ridgeback,Tibetan Mastiff,Tibetan Spaniel,Tibetan Terrier,Tornjak,Tosa,Toy Fox Terrier,Transylvanian Hound,Treeing Tennessee Brindle,Treeing Walker Coonhound,Vizsla,Weimaraner,Welsh Springer Spaniel,Welsh Terrier,West Highland White Terrier,Whippet,Wire Fox Terrier,Wirehaired Pointing Griffon,Wirehaired Vizsla,Working Kelpie,Xoloitzcuintli,Yakutian Laika,Yorkshire Terrier',
        cats = 'Abyssinian,Aegean Cat,American Bobtail,American Curl,American Shorthair,American Wirehair,Balinese,Bengal,Birman,Bombay,British Shorthair,Burmese,Burmilla,Chartreux,Cornish Rex,Cymric,Devon Rex,Egyptian Mau,Exotic Shorthair,Havana Brown,Himalayan,Japanese Bobtail,Javanese,Korat,Kurilian Bobtail,LaPerm,Li Hua,Maine Coon,Manx,Munchkin,Norwegian Forest Cat,Ocicat,Oriental,Persian,Pixiebob,Ragamuffin,Ragdoll,Russian Blue,Savannah,Scottish Fold,Selkirk Rex,Siamese,Siberian,Singapura,Somali,Sphynx,Tonkinese,Toyger,Turkish Angora,Turkish Van';


    /** JSON FILES **/
    pwaConfig = pwaLoadData('data/pwa.json');


    const registerUser = (user_data) => {

        let api_key = user_data.api_key;

        delete user_data.api_key;

        window.currentEmail = user_data.$email;

        if (user_data.segment == 'review') {
            $('.quest').each(function(e) {

                user_data['question-pregunta-' + e] = $(this).find('.q-title').text();
                user_data['question-valoracion-' + e] = $(this).find('.smile.active .smile-title').text();

            });
        }



        window._learnq.push(['identify', user_data]);


        /** Putting user in a list **/
        var profiles = {
            api_key: api_key,
            email: user_data.$email,

        };


        $.ajax({
            type: "POST",
            url: 'https://a.klaviyo.com/api/v1/list/' + user_data.list_id + '/members',
            data: profiles,
            success: function(response) {
                console.log(response)
            }
        });

        // fetch('https://a.klaviyo.com/api/v1/list/' + user_data.list_id + '/members', {

        //     method: "post",  
        //     body:  profiles , // data can be `string` or {object}!
        //      headers:{
        //         'Content-Type': 'application/json',
        //         api_key: user_data.api_key,
        //         'origin': 'x-requested-with'
        //       } , 
        //     mode: 'cors',
        //     cache: 'default'

        // }).then(console.log).catch(e => console.log('ERROR ', e)) 

    }



    const reviewsFuncs = () => {


        if (pwaConfig) {

            return new Promise((resolve, reject) => {
                pwaConfig.then((data) => {

                    let reviews = data.reviews,
                        questionsObj, htmlSmiles = '',
                        htmlQuestions = '',
                        totalReviews = '<span class="num">1</span> de ' + data.reviews.questions.length;

                    Object.entries(data.reviews.smiles).map(res => {

                        htmlSmiles += `
                            <aside class="smile">
                            <i class="${res[1].icon}"></i>
                            <div class="smile-title">${res[1].title}</div>
                            <div class="smile-desc">${res[1].desc}</div>
                            </aside> 
                            `;
                    });

                    Object.entries(data.reviews.questions).map(res => {

                        htmlQuestions += `
                            <div class="swiper-slide">
                            <div class="quest">
                            <div class="q-title">${res[1].title}</div>
                            <div class="smiles">
                            ${htmlSmiles} 
                            </div>
                            </div> 
                            </div> 

                            `;
                    });
                    $(quiz_container + ' .swiper-wrapper').html(htmlQuestions);


                    //  Putting the total of reviews
                    $(_counterReview).html(totalReviews);

                    resolve(true);
                });
            });
        }

    }


    const quizSwiper = () => {

        return new Promise((resolve, reject) => {

            quiz_swiper = new Swiper(quiz_container, {
                spaceBetween: 10,
                slidesPerView: 1,
                grabCursor: false,
                allowTouchMove: false,
                observer: true,
                observeParents: true,
                speed: 300,
                on: {
                    slideChange: () => {

                        $(_counterReview + ' .num').html(quiz_swiper.activeIndex + 1);

                    },
                    reachEnd: () => {
                        $('.reviews-pane  .wrap-btn').show();
                    }
                }
            });
        }); //end promise
    }



    /** Load PWA Config**/
    async function pwaLoadData(file) {

        return fetch(file).then(data => data.json());

    };


    reviewsFuncs().then(() => {

        quizSwiper();

    });


    const createListBreed = (type) => {

        var breeds = []

        if (type == 'gato') {
            breeds = cats.split(',');
        } else {
            breeds = dogs.split(',');
        }

        var opts = ['<option value="">Elige una raza</option>'],
            _select = $('#petSelect');


        breeds.forEach(function(pet) {

            opts.push('<option value="' + pet + '">' + pet + '</option>');
        });
        return opts;
    }




    $(function() {

        /** Filling with breeds the select box **/
        $(_petSec + ' .raza').html(createListBreed('dog'));

        $(_formStep2).on('submit', function() {

            var formClass = {
                '$email': window.currentEmail ,
                'Tags Animals':'UrbanPetApp Pets'
            };

             pwaConfig.then(res => {
                        var types = $(this).find('[name="type[]"]'),
                            names = $(this).find('[name="petname[]"]'),
                            razas = $(this).find('[name="raza[]"]'),
                            births = $(this).find('[name="birth[]"]'),
                            genders = $(this).find('input:radio:checked');

                        types.each(function(e) {
                            formClass['Pet Names ' + e] = names[e].value;
                            formClass['Pet Birth Month ' + e] = births[e].value;
                            formClass['Pet Breeds ' + e] = razas[e].value;
                            formClass['Pet Types ' + e] = $(this).val();
                            formClass['Pet Genders ' + e] = genders[e].value;
                        });

                        

                        window._learnq.push(['identify', formClass]);
                        showHideSection(thankyouPane, [suscribePane]);

                        $(_wrapMenu+','+ _floor).hide();
            });

            return false;
        });


        $(document).on('click', _addPet, function(e) {
            e.preventDefault();

            var addPetWrap = $(_addPet),
                petSet = $(_petSec);
            if (petSet.length >= maxPet) {

                addPetWrap.removeClass(activeClass);
                return false;

            } else {

                petSet.removeClass('last');

                var lastPet = petSet.last(),
                    lastPetClone = lastPet.clone();

                lastPetClone.find('input[type=text], select').val('').end();
                lastPetClone.find('.raza').val('').end();
                lastPetClone.find("input[type=radio]").prop("name", "gender[" + petSet.length + "][]").end();
                lastPetClone.insertAfter(lastPet);

                lastPetClone.find('[type="submit"]').hide();
                lastPetClone.find('.remove').removeClass('hide');


                $(_petSec).last().addClass('last');

                addPetWrap.addClass(activeClass);
            }


        });

        $(document).on('click', _petSec + '  .remove', function() {
            $(this).closest(_petSec).remove();
            return false;
        });


        $('#review-form, #newsletter-form').on('submit', function() {

            const name = $(this).find('[name="name"]').val(),
                email = $(this).find('[name="email"]').val(),
                gender = $(this).find('[name="gender"]:checked').val();
           
            pwaConfig.then(res => {

                let _obj = {
                    '$first_name': name.split(' ')[0],
                    '$last_name': name.split(' ').slice(1).join(' '),
                    '$email': email,
                    'Género': gender,
                    api_key: res.config.api_key_klaviyo,
                    list_id: res.config.list_id

                }
                if ($(this).attr('id') == 'newsletter-form') {

                    _obj.segment = 'suscribe'; //Simply for undertand from where is sending;

                    res.tags.suscribe.map((val, key) => {
                        _obj['Tag ' + key] = val;

                    })

                } else {

                    _obj.segment = 'review'; //Simply for undertand from where is sending;

                    res.tags.review.map((val, key) => {
                        _obj['Tag ' + key] = val;
                    })

                }


                registerUser(_obj);

                if ($(this).attr('id') == 'newsletter-form') {

                    showHideSection(suscribePane, [reviewPane]);

                } else {

                    showHideSection(thankyouPane, [reviewPane]);
                    $(_wrapMenu+','+ _floor).hide();

                }




            });




            return false;
        });


        /** When user do click on smile **/
        $(document).on('click', smileBox, function() {

            $(this).closest('.smiles').find('.smile').removeClass(activeClass);
            $(this).addClass(activeClass);

            pwaConfig.then((data) => {

                if ((quiz_swiper.realIndex + 1) < data.reviews.questions.length) {
                    quiz_swiper.slideNext();
                }

            });



        });

        $('.reviews-pane  .wrap-btn a').on('click', function(e) {

            e.preventDefault();

            let dataQuiz = [];

            $(quiz_container + ' .swiper-slide').each(function() {

                let puntuaction = $(this).find('.smiles .smile.active .smile-title').text(),
                    title = $(this).find('.q-title').text();

                dataQuiz.push({
                    title: title,
                    clasificacion: puntuaction
                });

            });

            showHideSection(reviewPane, [reviewsPane]);


        });



    });


})(jQuery);