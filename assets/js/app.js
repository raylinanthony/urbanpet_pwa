/**
@author Raylin Aquino <info@raylinaquino.com>
@website raylinaquino.com
@date Nov 22, 2019
**/



///window._learnq = _learnq;

/** Registering SW*/

if (navigator.serviceWorker) {
    //navigator.serviceWorker.register('./sw.js').then(()=> { console.log("Service Worker Registered"); })
}

let swiper_breeds_name = '.breeds-container',
    swiper_prods_name = '.prods-container',

    swiper_breeds_scrollbar = swiper_breeds_name + ' .swiper-scrollbar',
    swiper_breeds_wrapper = swiper_breeds_name + ' .swiper-wrapper',
    alphabetLetters = '.sizes-wrap .wrap-alphabet ul li a',
    _hideCls = 'hide',
    _showCls = 'show',
    _floor = '.floor',
    _menu = ' .wrap-menu a',
    _btnBack = '.btn-back ',
    activeClass = 'active',
    _asideBreed = 'aside.breed',
    _breedProdsSection = '.breed-products',
    _breedPropsSection = '.breed-properties',
    _breedSizesSection = '.sizes-section',
    sizeSwiper = {};

/** JSON FILES **/
const breedSizesJSON = 'data/breedSizes.json',
    pwaConfig = loadJSON('data/pwa.json'),
    //prodsShopify = 'http://urbanpet.do/p-roducts.json?limit=999';
    prodsShopify = 'data/prods.json';



const getProdsByParams = (type, size, breed, data) => {

    $('h1 .breed-type').text(type+' '+size);
    $('.breed-products h1 .breed-name').text(breed);
     
    return new Promise((resolve, reject) => {

        let products_data = [],
            liProd = '',
            count = 0;

        Object.entries(data.products).map(val => {

            /** First I ask for the type */

            if (val[1].title.includes(type)) {

                /** Some products doesn't have variants 
                due that... I must double-check if exists variant. */

                if (val[1].hasOwnProperty('variants')) {

                    val[1].variants.forEach((item) => {

                        if (item.title == size && item.available === true) {

                            /*products_data.push({
                                title: val[1].title,
                                size: item.title,
                                price: calculatePrice(item.price),
                                image: (item.featured_image != null) ? item.featured_image.src : '',
                            });*/

                            if (null === item.featured_image) return; //Only show if products have images.

                            const img = item.featured_image.src;

                            liProd += `
                            <div class="swiper-slide">
                            <aside class="breed-prod">
                            <div class="img">
                            <img src="${img}" height="120" />
                            </div>
                            <h4 class="title">
                            ${val[1].title}
                            </h4>
                            <div class="price">
                            RD$ ${calculatePrice(item.price)}
                            </div>
                            </aside>
                            </div>

                            `;

                        }

                    }); //end Variant

                }


            }
        }); //end entries


        $(swiper_prods_name + ' .swiper-wrapper').html(liProd)
        if (products_data) {
            return resolve(true);
        }
        return reject('no data');
    });

}


/**
 * Change the letter in alphabet depends on the current slide.
 *
 **/

const alphabetChange = (word) => {

    $(alphabetLetters).removeClass(activeClass);

    $(alphabetLetters).each(function() {

        if ($(this).text().toLowerCase().trim() == word[0].toLowerCase().trim()) {

            $(this).addClass(activeClass);

            return false;

        }
    })
};

const showHideSection = (secToShow, secToHide) => {
    /*

        secToHide.forEach(function(element, index) {
            $(element).removeClass(_showCls).addClass(_hideCls);
        });*/
    $('.pane').removeClass(_showCls).addClass(_hideCls);

    $(secToShow).removeClass(_hideCls).addClass(_showCls);

}

/**
 * Setting the swiper effect for all breeds
 *
 **/
const swiperProds = () => {

    return new Promise((resolve, reject) => {
        prodsSwiper = new Swiper(swiper_prods_name, {
            spaceBetween: 10,
            slidesPerView: 4,
            speed: 6000,
            freeModeMomentumRatio: 1,
            freeMode: true,
            freeModeFluid: true,
            observer: true,
            observeParents: true,
        });
    }); //end promise
}

/**
 * Setting the swiper effect for all breeds
 *
 **/
const swiperBreeds = () => {

    return new Promise((resolve, reject) => {
        sizeSwiper = new Swiper(swiper_breeds_name, {

            spaceBetween: 10,
            slidesPerView: 4,
            speed: 6000,
            scrollbar: {
                el: swiper_breeds_scrollbar,
                //draggable: true,
            },
            freeModeMomentumRatio: 1,
            freeMode: true,
            freeModeFluidloadProds: true,
            on: {
                slideChangeTransitionEnd: function() {

                    alphabetChange($('.swiper-slide-active').find('.breed-name').html())

                },
            }
        });
    }); //end promise
}

/* Get the Breed slug match*/
const getMatchBreeds = (breedslug, breedsize) => {

    return pwaConfig.then(data => {

        let _matchName = data.breeds_config.match_types[breedslug],
            _matchSize = data.breeds_config.match_sizes[breedsize];
        

        if (_matchName != undefined){

        } return [_matchName, _matchSize];

    });
};


const getBreedData = (_breed) => {

    return new Promise((resolve, reject) => {

        let data_breeds = '';

        Object.entries(JSON.parse(_breed.sizes)).map((size) => {

            var _sizeData = getMatchBreeds(size[0], size[1][1]);


            _sizeData.then(val => {

                if (val[0] == undefined) return;

                data_breeds += `
                    <li>
                        <a href="#" data-breed="${_breed.name}" data-type="${val[0]}" data-size="${val[1]}"  class="trans-3" >
                            <div class="txt">${val[0]}</div> <span class="size text-uppercase">${size[1][1]}</span>
                        </a>
                    </li>
                `;
            });

        });

        setTimeout(() => {
             
            $(_breedPropsSection + ' .breed-icon-wrap i').attr('class', _breed.icon);
            $(_breedPropsSection + ' h1 span').text(_breed.name);
            $(_breedPropsSection + ' .wrap-info ul').html(data_breeds);

        }, 1);

        resolve();


    });
}

const calculatePrice = price => {
    return (Math.floor(price) * Math.floor(53)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};


/** Load Prods JSON **/

function loadJSON(json) {

    return fetch(json).then(data => data.json());
}



/** Load Breed JSON **/

const loadBreeds = () => {

    let breed_list = '';

    return fetch(breedSizesJSON)
        .then(data => data.json())
        .then(breeds => {


            return new Promise((resolve, reject) => {

                Object.entries(breeds).map(val => {

                    const sizes = {
                        leash: val[1].leash,
                        collar: val[1].collar,
                        leash_ruff: val[1].leash_ruff,
                        stepin: val[1].stepin,
                        meshplus: val[1].meshplus,
                    };


                    breed_list += `
                <div class="swiper-slide">
                <aside class="breed trans-3" data-breed="${val[0]}">
                <div class="breed-icon-wrap trans-3">
                <i class="icon_${val[1].fullName}"></i>
                </div>
                <div class="breed-name text-uppercase">${val[0]}</div>
                <div class="data-sizes hide">${JSON.stringify(sizes)}</div>
                </aside>
                </div>  
                `;
                });

                $(swiper_breeds_wrapper).html(breed_list);

                resolve();

            }); //end promise


        }).catch(console.log)
}




loadBreeds().then(() => swiperBreeds());




$(function() {

    /**
     * Setting the letter by current slide active
     *
     **/

    $(alphabetLetters).on('click', function() {

        var _this = $(this);

        $(swiper_breeds_wrapper).find('.swiper-slide').each(function() {

            var breed_val = $(this).find('.breed-name').text()[0];

            if (breed_val.toLowerCase().trim() === _this.text().toLowerCase().trim()) {
                sizeSwiper.slideTo($(this).index(), 600)
                return false;
            }

        });

        return false;
    })


    $(_menu).on('click', function(e) {

        e.preventDefault();

        let targetSection = $(this).attr('href'),
            arrHides = [];

        /** Getting the rest of menues for hiding them **/
        $(_menu).each(function() {
            if ($(this).attr('href') !== targetSection) {
                arrHides.push($(this).attr('href'));
            }
        })

        $(_menu).removeClass(activeClass);
        $(this).addClass(activeClass);

        showHideSection(targetSection, arrHides);

        if (targetSection == '#sizes') {
            $(_floor).show();
        } else {
            $(_floor).hide();
        }


    })


    /***
    When user click on the breed
    **/

    $(document).on('click', _asideBreed, function(e) {

        e.preventDefault();

        let data = {
            name: $(this).find('.breed-name ').text(),
            icon: $(this).find('.breed-icon-wrap i ').attr('class'),
            sizes: $(this).find('.data-sizes').text()
        };

        getBreedData(data);
        showHideSection(_breedPropsSection, [_breedSizesSection]);

    });

    $(document).on('click', '.breed-properties .wrap-details .wrap-info ul li a', function(e) {

        e.preventDefault();

        var _currentType = $(this).attr('data-type'),
            _currentSize = $(this).attr('data-size'),
            _currentName = $(this).attr('data-breed') 

             ;

        showHideSection(_breedProdsSection, [_breedPropsSection]);

        loadJSON(prodsShopify).then(data => {

            getProdsByParams(_currentType, _currentSize,_currentName, data).then(res => {

                swiperProds();
            });
        });

    });



    /***
    When user close the breed properties section
    **/
    $(_breedPropsSection + ' ' + _btnBack).on('click', function(e) {

        showHideSection(_breedSizesSection, [_breedPropsSection]);

    });


    /***
    When user close the breed products section
    **/
    $(_breedProdsSection + ' ' + _btnBack).on('click', function(e) {

        showHideSection(_breedPropsSection, [_breedProdsSection]);

    });



})