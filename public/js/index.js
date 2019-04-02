window.addEventListener('load', ()=>{

    let getSayingList = ()=>{
        let params = {};
        sendGetRequest("saying-list", params, true, (e) => {
            let sayingList = e.result;
            for (let i = 0; i < sayingList.length; i++) {
                makeSayingBox(sayingList[i]);
            }
        });	
    }

    let makeSayingBox = (saying)=>{
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
        likeImg.src = '/images/common/empty-like.svg';
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
        dateSpan.textContent = '2019-01-24';
        menuRightDiv.append(dateSpan);
        menuBoxDiv.append(menuLeftDiv);
        menuBoxDiv.append(menuRightDiv);

        let likeBox = document.createElement('div');
        likeBox.classList.add('saying-like-box');
        let likeCntSpan = document.createElement('span');
        likeCntSpan.textContent = '좋아요 457개';
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
        replyContentSpan.textContent = '오 명언 지렸습니다.';
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
    };

    let sayingList = document.querySelector('#saying-list');

    getSayingList();


});







