window.addEventListener('load', ()=>{


    let gominList = document.querySelector('#gomin-list');
    let gominListUl = gominList.querySelector('.gomin-list-ul');

    let getGominList = () => {
        let params = {};
        sendGetRequest("list/", params, false, (e) => {
            for (let i = 0; i < sayingList.length; i++) {
                makeGomin(sayingList[i], sayingLike[i]);
            }
        });	
    }


    //현재 주소를 가져온다.
    // let renewURL = location.href;
    
    // //새로 부여될 페이지 번호를 할당한다.
    // // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
    // renewURL += '/1';
    
    // //페이지 갱신 실행!
    // history.pushState(null, null, renewURL);

});