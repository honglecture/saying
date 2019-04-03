window.addEventListener('load', ()=>{

    let getSayingList = ()=>{
        let params = {};
        sendGetRequest("saying-list", params, true, (e) => {
            let sayingList = e.sayingList;
            let sayingLike = e.sayingLike;
            console.log(sayingList);
            console.log(sayingLike);
            for (let i = 0; i < sayingList.length; i++) {
                makeSayingBox(sayingList[i], sayingLike[i]);
            }
        });	
    }

    let makeSayingBox = (saying, sayingLike)=>{
        let article = document.createElement('article');
        article.classList.add('saying-box');

        let backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('saying-background');

        let accountDiv = document.createElement('div');
        accountDiv.classList.add('account-info');

        let accountImg = document.createElement('img');
        accountImg.classList.add('account-image');
        accountImg.src = '/img/'+saying.photo;

        let nameSpan = document.createElement('span');
        nameSpan.classList.add('saying-name');
        nameSpan.textContent = saying.name;
        accountDiv.append(accountImg);
        accountDiv.append(nameSpan);

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('saying-content-box');

        let contentP = document.createElement('p');
        contentP.classList.add('saying-content');
        contentP.textContent = saying.content;
        contentDiv.append(contentP);

        let writerDiv = document.createElement('div');
        writerDiv.classList.add('saying-writer');
        let nicknameSpan = document.createElement('span');
        nicknameSpan.textContent = saying.Member.nickname;
        writerDiv.append(nicknameSpan);

        let tagDiv = document.createElement('div');
        tagDiv.classList.add('tag-box');
        let tagUl = document.createElement('ul');
        tagUl.classList.add('tag-list');

        // tag를 split해야 함
        if(saying.tag!=null && saying.tag!=''){
            let tags = saying.tag.split('#');
            for (let i = 0; i < tags.length; i++) {
                let li = document.createElement('li');
                let span = document.createElement('span');
                span.classList.add('tag');
                span.textContent = '#'+tags[i];
                li.append(span);
                tagUl.append(li);
            }
            tagDiv.append(tagUl);
        }

        //menu-box 부터
        let menuBoxDiv = document.createElement('div');
        menuBoxDiv.classList.add('saying-menu-box');
        let menuLeftDiv = document.createElement('div');
        menuLeftDiv.classList.add('saying-menu-left');
        let likeImg = document.createElement('img');



        let chatImg = document.createElement('img');
        chatImg.src = '/images/common/chat.svg';
        chatImg.classList.add('chat');
        let bookmarkImg = document.createElement('img');
        bookmarkImg.src = '/images/common/empty-bookmark.svg';
        menuLeftDiv.append(likeImg);
        menuLeftDiv.append(chatImg);
        menuLeftDiv.append(bookmarkImg);
        let menuRightDiv = document.createElement('div');
        menuRightDiv.classList.add('saying-menu-right');
        let dateSpan = document.createElement('span');
        dateSpan.textContent = saying.regDate;
        menuRightDiv.append(dateSpan);
        menuBoxDiv.append(menuLeftDiv);
        menuBoxDiv.append(menuRightDiv);

        let likeBox = document.createElement('div');
        likeBox.classList.add('saying-like-box');
        let likeCntSpan = document.createElement('span');


        likeCntSpan.textContent = '좋아요 '+sayingLike.Slikes.length+'개';

        likeBox.append(likeCntSpan);

        let replyList = document.createElement('div');
        replyList.classList.add('saying-reply-list');
        let replyBox = document.createElement('div');
        replyBox.classList.add('saying-reply-box');
        let replyNicknameSpan = document.createElement('span');
        replyNicknameSpan.classList.add('reply-nickname');
        replyNicknameSpan.textContent = '고슴도치가시';
        let replyContentSpan = document.createElement('span');
        replyContentSpan.classList.add('reply-content');
        replyContentSpan.textContent = ' 역시 고슴도치님 감동입니다.';
        replyBox.append(replyNicknameSpan);
        replyBox.append(replyContentSpan);
        replyList.append(replyBox);

        let replyCountBox = document.createElement('div');
        replyCountBox.classList.add('saying-reply-count');
        let replyCountSpan = document.createElement('span');
        replyCountSpan.textContent = '댓글 20개'
        replyCountBox.append(replyCountSpan);



        backgroundDiv.append(accountDiv);
        backgroundDiv.append(contentDiv);
        backgroundDiv.append(tagDiv);
        backgroundDiv.append(writerDiv);

        article.append(backgroundDiv);
        article.append(menuBoxDiv);
        article.append(likeBox);
        article.append(replyList);
        article.append(replyCountBox);
        
        sayingList.append(article);


        if(saying.Slikes!=undefined){
            if(saying.Slikes.length==0){
                likeImg.src = '/images/common/empty-like.svg';
                likeImg.classList.add('like-empty');
            } else {
                likeImg.src = '/images/common/full-like.svg';
                likeImg.classList.add('like-full');
            }
            likeImg.onclick = ()=>{
                if(likeImg.classList.contains('like-empty')){
                    // 좋아요를 했을 경우
                    setLike(saying.id, true, (likeCnt)=>{
                        likeCntSpan.textContent = '좋아요 '+likeCnt.length+'개';
                        likeImg.classList.remove('like-empty');
                        likeImg.classList.add('like-full')
                        likeImg.src = '/images/common/full-like.svg';
                    });
                } else {
                    // 좋아요를 취소했을 경우
                    setLike(saying.id, false, (likeCnt)=>{
                        likeCntSpan.textContent = '좋아요 '+likeCnt.length+'개';
                        likeImg.classList.remove('like-full');
                        likeImg.classList.add('like-empty')
                        likeImg.src = '/images/common/empty-like.svg';
                    });
                }
            }
        } else {
            likeImg.src = '/images/common/empty-like.svg';
            likeImg.classList.add('like-empty');
        }


        if(saying.Slikes!=undefined){
            if(saying.Bookmarks.length==0){
                bookmarkImg.src = '/images/common/empty-bookmark.svg';
                bookmarkImg.classList.add('bookmark-empty');
            } else {
                bookmarkImg.src = '/images/common/full-bookmark.svg';
                bookmarkImg.classList.add('bookmark-full');
            }
            bookmarkImg.onclick = ()=>{
                if(bookmarkImg.classList.contains('bookmark-empty')){
                    // 좋아요를 했을 경우
                    setBookmark(saying.id, true, ()=>{
                        bookmarkImg.classList.remove('bookmark-empty');
                        bookmarkImg.classList.add('bookmark-full');
                        bookmarkImg.src = '/images/common/full-bookmark.svg';
                    });
                } else {
                    // 좋아요를 취소했을 경우
                    setBookmark(saying.id, false, ()=>{
                        bookmarkImg.classList.remove('bookmark-full');
                        bookmarkImg.classList.add('bookmark-empty')
                        bookmarkImg.src = '/images/common/empty-bookmark.svg';
                    });
                }
            }
        } else {
            bookmarkImg.src = '/images/common/empty-bookmark.svg';
            bookmarkImg.classList.add('bookmark-empty');
        }




    };

    let sayingList = document.querySelector('#saying-list');

    getSayingList();


});


let setLike = (sayingId, flag, callback) => {
    let params = { sayingId, flag };
    sendGetRequest("set-like", params, false, (e) => {
        if(e.result){
            callback(e.likeCnt);
        }
    });
}

let setBookmark = (sayingId, flag, callback) => {
    let params = { sayingId, flag };
    sendGetRequest("set-bookmark", params, false, (e) => {
        if(e.result){
            callback();
        }
    });
}


