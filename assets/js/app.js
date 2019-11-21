let swiper_breeds_name = '.breeds-container',
    swiper_breeds_scrollbar = swiper_breeds_name + ' .swiper-scrollbar',
    swiper_breeds_wrapper = swiper_breeds_name + ' .swiper-wrapper',
    alphabetLetters = '.sizes-wrap .wrap-alphabet ul li a',
    activeClass = 'active',
    sizeSwiper = {};


/**
 * Setting the letter by current slide active
 *
 **/

$(alphabetLetters).on('click', function() {
    
    var _this = $(this);
    
    $(swiper_breeds_wrapper).find('.swiper-slide').each(function() {
        
        var breed_val = $(this).find('.breed-name').text()[0];
        
        if (breed_val.toLowerCase().trim() === _this.text().toLowerCase().trim()) {
            sizeSwiper.slideTo($(this).index(),600)
            return false;
        }

    });

    return false;
})


const alphabetChange = (word) => {

    $(alphabetLetters).removeClass(activeClass);

    $(alphabetLetters).each(function() {

        if ($(this).text().toLowerCase().trim() == word[0].toLowerCase().trim()) {

            $(this).addClass(activeClass);

            return false;

        }
    })
};

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
            freeModeFluid: true,
            on: {
                slideChangeTransitionEnd: function() {
                    alphabetChange($('.swiper-slide-active').find('.breed-name').html())

                },
            }
        });
    }); //end promise
}

/** Load Breed JSON **/

const loadBreeds = () => {

    let breed_list = '';

    return fetch('data/breedSizes.json')
        .then(data => data.json())
        .then(breeds => {


            return new Promise((resolve, reject) => {
                /** Ordering by name **/
           

                Object.entries(breeds).map(val => {

                    breed_list += `
								<div class="swiper-slide">
									<aside class="breed trans-3" data-breed="${val[0]}">
										<div class="breed-icon-wrap trans-3">
											<img src="${val[1].image}" width="100" alt="dog1">
										</div>
										<div class="breed-name text-uppercase">${val[0]}</div>
									</aside>
								</div>  
							`;
                });

                $(swiper_breeds_wrapper).html(breed_list);

                swiperBreeds()
                
                resolve();

            }); //end promise


        }).catch(console.log)
}

loadBreeds();