// 나의 농장 관리, 환경설정, 고객센터 카테고리
const Manage01 = document.querySelector('.FarmManage01');
const Manage02 = document.querySelector('.FarmManage02');
const Manage03 = document.querySelector('.FarmManage03');

// 농장 번호 카테고리
const number01 = document.querySelector('.farm_number01');
const number02 = document.querySelector('.farm_number02');
const number03 = document.querySelector('.farm_number03');

const menu = document.querySelector('.Farm_menu');

// 실시간 모니터링&설정, 영농일지 바로가기
const farm_set01 = document.querySelector('.farm_set01');
const farm_set02 = document.querySelector('.farm_set02');
const farm_set03 = document.querySelector('.farm_set03');
const farm_set04 = document.querySelector('.farm_set04');
const farm_set05 = document.querySelector('.farm_set05');
const farm_set06 = document.querySelector('.farm_set06');

// 농장추가 및 제거, 개인 정보 관리
const setting = document.querySelector('.setting');

// 농장추가 및 제거, 개인 정보 관리, 공지사항, 1:1 채팅상담
const setting_menu01 = document.querySelector('.setting_menu01');
const setting_menu02 = document.querySelector('.setting_menu02');
const setting_menu03 = document.querySelector('.setting_menu03');
const setting_menu04 = document.querySelector('.setting_menu04');
// 실시간 모니터링&설정, 영농일지 바로가기
const farm_setting01 = document.querySelector('.farm-setting01');
const farm_setting02 = document.querySelector('.farm-setting02');
const farm_setting03 = document.querySelector('.farm-setting03');
const farm_setting04 = document.querySelector('.farm-setting04');
const farm_setting05 = document.querySelector('.farm-setting05');
const farm_setting06 = document.querySelector('.farm-setting06');
 
// 나의 농장 관리 클릭 -> Farm 번호 3개 전부 보이게
Manage01.addEventListener('click', () => {
    number01.classList.toggle('active');
    number02.classList.toggle('active');
    number03.classList.toggle('active');
});

// Farm01 눌렀을 때 실시간 모니터링&설정, 영농일지 바로가기 보이게
number01.addEventListener('click', () => {
    farm_set01.classList.toggle('active');
    farm_set02.classList.toggle('active');
    farm_setting01.classList.toggle('active');
    farm_setting02.classList.toggle('active');
});
// Farm02 눌렀을 때 실시간 모니터링&설정, 영농일지 바로가기 보이게
number02.addEventListener('click', () => {
    farm_set03.classList.toggle('active');
    farm_set04.classList.toggle('active');
    farm_setting03.classList.toggle('active');
    farm_setting04.classList.toggle('active');
});
//  Farm03 눌렀을 때 실시간 모니터링&설정, 영농일지 바로가기 보이게
number03.addEventListener('click', () => {
    farm_set05.classList.toggle('active');
    farm_set06.classList.toggle('active');
    farm_setting05.classList.toggle('active');
    farm_setting06.classList.toggle('active');
});
// 환경설정 카테고리 누르기
Manage02.addEventListener('click', () => {
    setting_menu01.classList.toggle('active');
    setting_menu02.classList.toggle('active');
});

// 고객센터 카테고리 누르기
Manage03.addEventListener('click', () => {
    setting_menu03.classList.toggle('active');
    setting_menu04.classList.toggle('active');
});



