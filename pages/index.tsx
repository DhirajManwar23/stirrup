import React from "react";
import Head from "next/head";
import { createClient } from "next-sanity";
import 'fullpage.js/dist/fullpage.css';
import { useEffect, useState } from "react";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


interface HomeProps {
  Loadword: any;
  Navbar: any;
  banner: any;
  videoUrl: any;
  section2: any;
  expertise: any;
  works: any;
  worksAsset: any;
  workSection2: any;
  esgDriven: any;
  careerwrap: any;
  contactwrap: any;
}

export default function Home({ Loadword, Navbar, banner, videoUrl, section2, expertise, works, worksAsset, workSection2, esgDriven, careerwrap, contactwrap}: HomeProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const Worksection2words = workSection2[0].headline.split(' ');
  console.log(careerwrap);
  const words = works[0]['headline'].split(' ');
  const secondtword = words.length >= 2 ? words[1] : '';
  const firstword = words.length >= 2 ? words[0] : '';
  const Lastword = words.length >= 2 ? words[2] + ' ' + words[3] + ' ' + words[4] : '';

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Register Swiper modules
    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

    const script = document.createElement('script');
    script.src = "/js/fullpage.js";
    script.onload = () => {
      new (window as any).fullpage('#fullpage', {
        scrollBar: true,
        responsiveWidth: 766,
        anchors: ['home', 'aboutUs', 'expertise', 'work', 'clients', 'thinking', 'careers', 'contact'],
        menu: '#menu',
        onLeave: function (origin: any, destination: any, direction: any, trigger: any) {
          if (destination.index == 0) {
            document.querySelector('.headerWrp')?.classList.remove('headerShrink');
            document.querySelector('.logo-Stirrup')?.classList.add('active');
          } else {
            document.querySelector('.headerWrp')?.classList.add('headerShrink');
            document.querySelector('.logo-Stirrup')?.classList.remove('active');
          }

          if ([0, 2, 3, 4, 5, 6].includes(destination.index)) {
            document.querySelector('.header')?.classList.add('headerWhite');
          } else {
            document.querySelector('.header')?.classList.remove('headerWhite');
          }

          if (destination.index == 6 && !hasAnimated) {
            setHasAnimated(true);
            var countSpan = document.querySelector('.count');
            setTimeout(function () {
              var currentCount = 0;
              var finalCount = 100;
              var duration = 2000; // Duration of the animation in milliseconds
              var interval = 20; // Interval in milliseconds for updating the count
              var step = (finalCount - currentCount) / (duration / interval); // Calculate the step
              function animateCount() {
                currentCount += step;
                if (countSpan) {
                  countSpan.textContent = Math.floor(currentCount).toString();
                }
                if (currentCount >= finalCount) {
                  clearInterval(countInterval);
                  if (countSpan) {
                    countSpan.textContent = finalCount.toString();
                  }
                }
              }
              var countInterval = setInterval(animateCount, interval);
            }, 1000); // Delay of 1 second before starting the animation
          }
        }
      });
    };
    document.body.appendChild(script);

     $('#navToggle').on('click',function(){
      if($('.header').hasClass('mobNavActive')){
        console.log('remove');
        $('.header').removeClass('mobNavActive');
        $('#overlayNav').removeClass('active');
        $(this).removeClass('active');
        $('#menu').removeClass('active');
      }else{
        $('.header').addClass('mobNavActive');
        $('#overlayNav').addClass('active');
        $(this).addClass('active');
        $('#menu').addClass('active');
      } 
    });
    $('#menu li a').on('click',function(){
      $('#overlayNav, #navToggle, #menu').removeClass('active');
      $('.header').removeClass('mobNavActive');
    });

    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const swiperCard = new Swiper('.swiperCards', {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiperCard-button-next',
        prevEl: '.swiperCard-button-prev',
      },
      effect: 'fade',
      on: {
        init: function () {
          console.log('Swiper initialized');
        }
      }
    });
    const cardThumbList = document.querySelector(".CardsThumb");
    if (cardThumbList) {
      const cardThumbItems = cardThumbList.querySelectorAll("li");
      cardThumbItems.forEach(function (item, index) {
        item.setAttribute("data-slide-index", index.toString());
      });
    }
    let cardThumbItems: NodeListOf<HTMLLIElement> | null = null;
    if (cardThumbList) {
      cardThumbItems = cardThumbList.querySelectorAll("li");
      cardThumbItems.forEach(function (item) {
        item.addEventListener("click", function () {
          const slideIndex = parseInt(item.getAttribute("data-slide-index") || "0", 10);
          // Since we're using loop: true, we need to account for the duplicate slides
          swiperCard.slideToLoop(slideIndex);
        });
      });

      function updateActiveListItem() {
        // Get the current slide index accounting for loop
        const activeSlideIndex = swiperCard.realIndex;
        cardThumbItems?.forEach(function (item) {
          const slideIndex = parseInt(item.getAttribute("data-slide-index") || "0", 10);
          if (slideIndex === activeSlideIndex) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }

      // Update active state on slide change
      swiperCard.on('slideChange', updateActiveListItem);
      // Also update on initialization
      swiperCard.on('init', updateActiveListItem);
    }

     
   

    const workSlider = document.querySelector('.workSlider');
    const workSliderThumbs = document.querySelector('.workSlider-thumbs');

    if (workSlider && workSliderThumbs) {
      const swiper1 = new Swiper(workSlider as HTMLElement, {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.2,
        spaceBetween: 15,
        speed: 900,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
          },
        },
        navigation: {
          nextEl: '.swiperWrk-button-next',
          prevEl: '.swiperWrk-button-prev',
        },
        on: {
          slideChangeTransitionStart: function () {
            var slides = (this as unknown as Swiper).slides;
            for (var i = 0; i < slides.length; i++) {
              var video = slides[i].querySelector('.sliderVideo');
              if (video) {
                (video as HTMLVideoElement).pause();
                (video as HTMLVideoElement).currentTime = 0;
              }
            }
          },
          slideChangeTransitionEnd: function () {
            var activeSlide = (this as unknown as Swiper).slides[(this as unknown as Swiper).activeIndex];
            var video = activeSlide.querySelector('.sliderVideo');
            if (video) {
              setTimeout(function () {
                if (video) {
                  (video as HTMLVideoElement).play().catch(function (error) { });
                }
              }, 0);
            }
          },
        },
      });

      const thumbs = new Swiper(workSliderThumbs as HTMLElement, {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        slidesPerView: 1.2,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
          },
        },
      });


      /*  if (swiper1 && thumbs) {
         swiper1.controller.control = thumbs;
         thumbs.controller.control = swiper1;
       } */
    }

    // Initialize Swiper for thinkSlider
    new Swiper('.thinkSlider', {
      modules: [Navigation, Pagination, Autoplay, EffectFade, EffectCreative],
      grabCursor: true,
      spaceBetween: 0,
      slidesPerView: 2,
      speed:600,
      loop: true,
      autoplay:true,
      centeredSlides: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-45%", 0, -250],
        },
        next: {
          shadow: true,
          translate: ["45%", 0, -250],
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    new Swiper('.thinkThumbSlider', {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        slidesPerView: 2,
        centeredSlides: true,
        speed:600,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });

    //thinkSlider.controller.control = thinkThumbSlider;
    //thinkThumbSlider.controller.control = thinkSlider;

       // Initialize Swiper for contacSlider
       new Swiper('.contacSlider', {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

     document.onmousemove = function(e) {
        document.body.style.setProperty("--x", e.clientX + "px");
        document.body.style.setProperty("--y", e.clientY + "px");
      };
  
  }, [hasAnimated]);
  return (
    <>
      <Head>
        <meta http-equiv="Content-Type" charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="Language" content="English" />
        <meta name="Publisher" content="English" />
        <meta name="Revisit-After" content="7 Days" />
        <meta name="robots" content="INDEX, FOLLOW" />
        <meta name="allow-search" content="yes" />
        <meta name="expires" content="never" />
        <meta name="author" content="" />
        <meta http-equiv="Cache-control" content="no-cache" />
        <link rel="icon" href="images/Favicon.svg" type="image/svg" sizes="16x16" />
        <title>Stirrup</title>
        <link rel="stylesheet" href="css/fullpage.css" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/swiper-bundle.css" />
        <link rel="stylesheet" href="css/animate.css" />
        <link rel="stylesheet" href="css/common.css" />

        <script src="js/jquery.min.js"> </script>
        <script src="js/wow.min.js"></script>
        <script src="js/swiper-bundle.min.js"></script>
        <script type="text/javascript" src="js/fullpage.js"></script>
      </Head>

      {
        <div className="loaderActive">

          <div id="loaderWrp" className="fulHght ">
            <div className="rollWrp">
              <div className="rollList">
                <h1>{Loadword[0]['Wordfirst']}</h1>
                <h1>{Loadword[0]['wordsecond']}</h1>
                <h1>{Loadword[0]['wordthird']}</h1>
              </div>
            </div>
            <div className="orangeBox"></div>
          </div>

          <div className="headerWrp">
            <div className="container">
              <div className="header headerWhite" id="header">
                <nav className="navbar">
                  <div className="custom-toggler mob-show" id="navToggle">
                    <span></span>
                    <span></span>
                  </div>   
                  <ul id="menu" className="nav-links">
                    <li data-menuanchor="home" className="d-none">
                      <a href="#home">Home</a>
                    </li>
                    <li data-menuanchor="aboutUs">
                      <a href={Navbar[0]["About_us"]}>About us</a>
                    </li>
                    <li data-menuanchor="expertise">
                      <a href={Navbar[0]["expertise"]}>Expertise</a>
                    </li>
                    <li data-menuanchor="work">
                      <a href={Navbar[0]["work"]}>Work</a>
                    </li>
                    <li data-menuanchor="thinking">
                      <a href={Navbar[0]["thinking"]}>Thinking</a>
                    </li>
                    <li data-menuanchor="careers">
                      <a href={Navbar[0]["careers"]}>Careers</a>
                    </li>
                    <li data-menuanchor="contact">
                      <a href={Navbar[0]["contact"]}>Contact</a>
                    </li>
                  </ul>
                  <a className="navbar-brand" href="index.html">
                    <div className="logo-Stirrup active">
                      <span className="pt1"></span>
                      <span className="pt2"></span>
                      <span className="pt3"></span>
                    </div>
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div id="overlayNav"></div>
          <div id="fullpage">
            <div className="section banVideoWrp" id="section0">
              <div className="banner-wrp">
                <video id="bnr-vid" playsInline autoPlay muted loop data-autoplay>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
              <div className="vidText fulHght">
                <div className="container d-flex h-100 align-items-center">
                  <div className="row align-items-end justify-content-between">
                    <div className="vid-tl"><h2>{banner[0]['title']}</h2></div>
                  </div>
                  <div className="dwn-arrow-btn bounceArrow">
                    <div className="arrowdwn-ico"></div>
                  </div>

                </div>
              </div>
            </div>

            <div className="section introWrp" id="section1">
              <div className="container h-100">
                <div className="row h-100">
                  <div className="col-lg-6">
                    <div className="staticTxt">
                      <h2>{section2[0]['headline']}
                        <span className="linetextRoll txtUnderLine">
                          <div className="rollerText">
                            <span>{section2[0]['subWords']}</span>
                            <span>{section2[0]['subWords2']}</span> 
                            <span>{section2[0]['subWords3']}</span>
                          </div>
                        </span>
                      </h2>
                      <p>{section2[0]['subeText']}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="calloutWrp">
                      <div className="callout-big">
                        <div className="rollerText">
                          <h2>{section2[0]['subeText1']}</h2>
                          <h2>{section2[0]['subeText2']}</h2>
                          <h2>{section2[0]['subeText3']}</h2>

                        </div>
                      </div>
                      <div className="callout-sml">
                        <div className="rollerText">
                          <h2>{section2[0]['rolltext']}</h2>
                          <h2>{section2[0]['rolltext2']}</h2>
                          <h2>{section2[0]['rolltext3']}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section srvcWrp" id="section2">
              <div className="swiper swiperCards">
                <div className="swiper-wrapper">
                  {expertise && expertise.map((item: any, index: number) => (

                    <div className="swiper-slide" key={index} xdata-title={`Slide ${index + 1}`}>
                      <div className="srvCard">
                        <div className="vidDiv">
                          <video id="" playsInline autoPlay muted loop>
                            <source src={item.videoFile.asset.url || ''} type="video/mp4" />
                          </video>
                        </div>
                        <div className="copyDiv">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="infoDiv">
                                  <p>{item.description}</p>
                                </div>
                                <div className="tagsDiv">
                                 <ul>
                                    {item.tag && item.tag.map((tag: string, tagIndex: number) => (
                                      <li key={tagIndex}>{tag}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="swiperCard-button-prev"></div>
                  <div className="swiperCard-button-next"></div>

                </div>
              </div>
              
              <div className="staticTxt">
                <div className="container">
                  <div className="row"><h2>with an array of <span className="txtUnderLine wht">expertise</span></h2></div>
                </div>
              </div>
              <div className="CrdThumbWrp">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="CardsThumb">
                        <li className="active"><a href="javascript:void(0);">{expertise[0]['Tabtitle']}</a></li>
                        <li><a href="javascript:void(0);">{expertise[1]['Tabtitle']}</a></li>
                        <li><a href="javascript:void(0);">{expertise[2]['Tabtitle']}</a></li>
                        <li><a href="javascript:void(0);">{expertise[3]['Tabtitle']}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section workWrp" id="section3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="staticTxt">

                      <h2>{firstword} <span className="txtUnderLine wht">{secondtword}</span> {Lastword}</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 text-right">
                    <div className="swiperWrk-button-prev"></div>
                    <div className="swiperWrk-button-next"></div>
                  </div>
                </div>
              </div>
              <div className="workSliderWrp wow slideInRight">
                <div className="swiper workSlider">
                  <div className="swiper-wrapper">
                    {worksAsset[0]?.swiper.map((item: any, index: number) => (
                      <div className="swiper-slide" key={index} data-swiper-autoplay="5000">
                        <div className="imgDiv">
                          <video className="sliderVideo" playsInline autoPlay muted loop>
                            <source src={item.videoUrl} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="swiper workSlider-thumbs">
                  <div className="swiper-wrapper">
                    {worksAsset[0]?.swiper.map((item: any, index: number) => (
                      <div className="swiper-slide" key={index}>
                        <div className="copyDiv">
                          <h3>{item.title}</h3>
                          <div className="hvrDiv">
                            <ul>
                              {item.tags.map((tag: any, tagIndex: number) => (
                                <li key={tagIndex}>{tag.tag}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section className="section clientWrp">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="staticTxt">
                      <h2>
                        {Worksection2words.map((word: string, index: number) => (
                          <React.Fragment key={index}>
                            {index === 2 ? <span className="txtUnderLine wht">{word}</span> : word}{' '}
                          </React.Fragment>
                        ))}
                      </h2>
                      {/* <h2>for the <span className="txtUnderLine wht">clients</span> that shape the world</h2> */}
                    </div>

                  </div>
                </div>
              </div>
              <div className="marqeWrp">
                <ul className="marqueList">
                  {workSection2[0]?.clientImages.map((image: any, index: number) => (
                    <li key={index} ><img src={image.asset.url} alt={`Client Image ${index + 1}`} /></li>

                  ))}

                </ul>

              </div>
            </section>

            <div className="section thinkingWrp" id="section4">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 thinkLhs">
                    <h2>{esgDriven[0].headline}</h2>
                    <div className="tagsDiv">
                      <ul>
                        {esgDriven[0].tags.map((tag: any, index: number) => (
                          <li key={index}>{tag}</li>
                        ))}

                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 pl-5">
                    <div className="swiper thinkSlider">
                      <div className="swiper-wrapper">
                        {esgDriven[0]?.files.map((file: any, index: number) => (
                          <div className="swiper-slide" key={index} ><img src={file.fileUrl} alt="" className="" /></div>

                        ))}
                      </div>

                    </div>
                    <div className="thinkThumbWrp">
                      <div className="swiper thinkThumbSlider">
                        <div className="swiper-wrapper">
                          {esgDriven[0]?.files.map((file: any, index: number) =>
                            <div className="swiper-slide" key={index}><span>{file.name}</span></div>
                          )}

                        </div>
                      </div>
                      <div className="swiper-button-prev swiperThink-prev"></div>
                      <div className="swiper-button-next swiperThink-next"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="section careerWrap" id="section5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="copyDiv">
                      <div>
                        <h2>{careerwrap[0].headline}</h2>
                        <div className="textIncrement "> <span className="count wow">0</span>%</div>
                        <h2><span className="linetextRoll">
                          <div className="rollerText">
                            {careerwrap[0].tags.map((tag: any, index: number) => (
                              <span key={index}>{tag}</span>
                            ))}
                          </div>
                        </span></h2>
                      </div>
                      <a href="#" className="btn-boxArrow dark">Explore exciting opportunities</a>
                    </div>

                  </div>
                  <div className="col-lg-6">
                    <div className="imgRolWrp">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="marqeWrp">
                            <ul className="marqueList">
                              {careerwrap[0].rollimage.slice(0, 4).map((image: any, index: number) => (
                                <li key={index}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                            <ul className="marqueList" aria-hidden="true">
                              {careerwrap[0].rollimage.slice(0, 4).map((image: any, index: number) => (
                                <li key={index}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="marqeWrp">
                            <ul className="marqueListRvrs">
                              {careerwrap[0].rollimage.slice(5, 8).map((image: any, index: number) => (
                                <li key={index}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                            <ul className="marqueListRvrs" aria-hidden="true">
                              {careerwrap[0].rollimage.slice(5, 8).map((image: any, index: number) => (
                                <li key={index + `3`}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="marqeWrp">
                            <ul className="marqueList">
                              {careerwrap[0].rollimage.slice(9, 12).map((image: any, index: number) => (
                                <li key={index}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                            <ul className="marqueList" aria-hidden="true">
                              {careerwrap[0].rollimage.slice(9, 12).map((image: any, index: number) => (
                                <li key={index + `2`}><img src={image.asset.url} alt={`Roll Image ${index + 1}`} /></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section contactWrp" id="section6">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>Start the conversation</h2>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h3>Search us @ stirrup.works</h3>
                  </div>
                  <div className="col-lg-6">
                    <ul className="socialList">
                      <li><a href="#" target="_blank" className="icon-insta"></a></li>
                      <li><a href="#" target="_blank" className="icon-linkin"></a></li>
                      <li><a href="#" target="_blank" className="icon-twiter"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="addWrp">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <a href="#" className="btn-boxArrow">{contactwrap[0]?.buttonText}</a>
                      <div className="addersPanel">
                        <div className="location">
                          <a href="#" target="_blank" className="btn-circleArrow"></a>
                          <h3>{contactwrap[0]?.address1.location}</h3>
                        </div>
                        <div className="addrsInfo">
                          <p>{contactwrap[0]?.address1.address}<br /> {contactwrap[0]?.address1.contactNumber}</p>
                          </div>
                        </div>
                        <div className="addersPanel">
                          <div className="location">
                            <a href="#" target="_blank" className="btn-circleArrow"></a>
                            <h3>{contactwrap[0]?.address2.location}</h3>
                          </div>
                          <div className="addrsInfo">
                            <p>{contactwrap[0]?.address2.address}
                              <br />{contactwrap[0]?.address2.contactNumber}</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="swiper contacSlider">
                              <div className="swiper-wrapper">
                              {contactwrap[0]?.images.map((image: any, index: number) => (
                                <div className="swiper-slide" key={index} ><img src={image.asset.url}  alt={`Image ${index + 1}`} className="" /></div>
                              
                              ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            
          <div className="section fp-auto-height fp-section footerWrp">
            <div className="container">
              <div className="row ">
                <p className="col-lg-6">Stirrup Communication Consultants Pvt. Ltd. © Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      }

    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    projectId: "ui5n8wmw",
    dataset: "production",
    apiVersion: '2025-01-20',     // Use a recent ISO date
    useCdn: false, // set to `true` to use the edge cache


  });

  const Loadword = await client.fetch("*[_type == 'Loadword']");
  const Navbar = await client.fetch("*[_type == 'Navbar']");
  const banner = await client.fetch("*[_type == 'videoBlogPost']");
  const section2 = await client.fetch("*[_type == 'section2']");
  const expertise = await client.fetch("*[_type == 'expertise']{..., videoFile{asset->{url}}}");
  const works = await client.fetch("*[_type == 'works']{..., videoFile{asset->{url}}}");
  const worksAsset = await client.fetch(` *[_type == "works"] { swiper[] { title, "videoUrl": video.asset->url,
        tags[] { tag  } } }`);
  const videoData = await client.fetch(`*[_type == "videoBlogPost"][0]{videoFile{asset->{url}}}`);
  const workSection2 = await client.fetch(`*[_type == "workSection2"]{headline, clientImages[]{asset->{url}}}`);
  const videoUrl = videoData?.videoFile?.asset?.url;
  const esgDriven = await client.fetch(`*[_type == "esgDriven"]{headline, tags, files[]{name, "fileUrl": file.asset->url}}`);
  const careerwrap = await client.fetch(`*[_type == "careerwrap"]{headline, tags, rollimage[]{asset->{url}}}`);
  const contactwrap = await client.fetch(`*[_type == "contactWrp"]{
    buttonText,
    address1 {
      location,
      address,
      contactNumber
    },
    address2 {
      location,
      address,
      contactNumber
    },
    images[]{asset->{url}}
  }`);


  return {
    props: {
      Loadword,
      Navbar,
      banner,
      videoUrl,
      section2,
      expertise,
      works,
      worksAsset,
      workSection2,
      esgDriven,
      careerwrap,
      contactwrap,
    },
  };
}

