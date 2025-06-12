// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 시 헤더 내비게이션 바 고정 및 동적 블러
    const headerNav = document.querySelector('.liquid-glass-nav');
    const header = document.querySelector('.liquid-glass-header');
    const headerHeight = header.offsetHeight; // 헤더 전체 높이

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight - headerNav.offsetHeight) {
            headerNav.classList.add('fixed-nav');
        } else {
            headerNav.classList.remove('fixed-nav');
        }
    });

    // CSS에 .fixed-nav 스타일 추가 (예시):
    /*
    .fixed-nav {
        position: fixed;
        top: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.15); // 고정될 때 배경 투명도 증가
        backdrop-filter: blur(35px); // 블러 강도 증가
        -webkit-backdrop-filter: blur(35px);
        box-shadow: 0 6px 40px rgba(0, 0, 0, 0.15); // 그림자 더 진하게
        border-radius: 0; // 모서리 둥글기 제거하여 화면에 딱 붙게
        padding: 12px 0; // 패딩 조정
        animation: slideDown 0.3s ease-out forwards;
    }

    @keyframes slideDown {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    */


    // 2. 스크롤 시 카드 등장 애니메이션 (Intersection Observer 활용)
    const cards = document.querySelectorAll('.liquid-glass-card');

    const observerOptions = {
        root: null, // 뷰포트를 기준으로
        rootMargin: '0px',
        threshold: 0.1 // 요소의 10%가 보이면 콜백 실행
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 한 번 애니메이션 후 옵저빙 중지
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.classList.add('fade-in-slide-up'); // 초기 애니메이션 클래스 추가
        cardObserver.observe(card);
    });

    // CSS에 .fade-in-slide-up 및 .is-visible 스타일 추가 (예시):
    /*
    .liquid-glass-card.fade-in-slide-up {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .liquid-glass-card.fade-in-slide-up.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */


    // 3. 버튼 클릭 시 미묘한 피드백 (ripple effect)
    const liquidButtons = document.querySelectorAll('.liquid-button');

    liquidButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            // 클릭된 위치를 기준으로 물결 효과 시작점 설정
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
            circle.classList.add('ripple');

            // 기존 물결 효과가 있다면 제거 후 추가 (중복 방지)
            const currentRipple = this.getElementsByClassName('ripple')[0];
            if (currentRipple) {
                currentRipple.remove();
            }
            this.appendChild(circle);
        });
    });

    // CSS에 .ripple 스타일 추가 (예시):
    /*
    .liquid-button {
        position: relative;
        overflow: hidden; // 물결 효과가 버튼 밖으로 나가지 않도록
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.4); // 물결 색상 (밝은 회색)
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    */

    // 4. (선택 사항) 배경 비디오의 미묘한 마우스 이동 효과 (Parallax)
    // GSAP 라이브러리를 사용한다면 더 쉽게 구현 가능.
    // 여기서는 순수 JS 예시 (매우 미묘하게)
    const backgroundVideo = document.querySelector('.background-video');

    if (backgroundVideo) {
        document.addEventListener('mousemove', (e) => {
            const strength = 0.005; // 움직임 강도 조절
            const x = (e.clientX - window.innerWidth / 2) * strength;
            const y = (e.clientY - window.innerHeight / 2) * strength;

            // 이미 translate(-50%, -50%)가 있으므로, 추가적인 translate를 적용
            backgroundVideo.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.03)`; // 살짝 확대하여 가장자리 비는 현상 방지
        });

        // 마우스가 화면 밖으로 나가거나 정지 시 원래 위치로 부드럽게 돌아오도록
        document.addEventListener('mouseleave', () => {
             backgroundVideo.style.transition = 'transform 0.5s ease-out';
             backgroundVideo.style.transform = 'translate(-50%, -50%) scale(1.0)';
        });
        document.addEventListener('mouseenter', () => {
             backgroundVideo.style.transition = 'none'; // 다시 움직일 때는 즉시 반응
        });
    }

});