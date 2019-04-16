let sayingListParam = {
    page : 1,
    isComplete : false,
    field: 'name',
    value: '',
    category: '99'
}

let sayingSortFlag = {
    date : true, //날짜 최신순
    chat : false, // chat 적용 안함
    like : false, // like 정렬 false
    bookmark : false,
    my : false
};

window.addEventListener('load', ()=>{

    let replyBox = document.querySelector("#reply-box");
    let replyInfo = document.querySelector("#reply-info");
    let replyCancel = replyInfo.querySelector(".reply-cancel");
    let replyContentList = replyInfo.querySelector(".reply-content-list");
    let sayingListDiv = document.querySelector('#saying-list');
    let searchForm = document.querySelector('#search-form');

    let searchInputBox = searchForm.querySelector('.search-input-box');
    let searchInput = searchInputBox.querySelector('.search-input');
    let searchButton = searchInputBox.querySelector('.search-button');
    

    let searchConditionBox = searchForm.querySelector('.search-condition-box');
    let searchConditionItem = searchConditionBox.querySelector('.search-condition-item')

    let searchConditionCategory = searchConditionBox.querySelector('.search-condition-category');
    let categorySelect = searchConditionCategory.querySelector('select[name="category"]');

    let filterForm = document.querySelector('#filter-form');
    let filterButtonBox = filterForm.querySelector('.filter-button-box');
    let filterIconBox = filterForm.querySelector('.filter-icon-box');
        let sortDate = filterForm.querySelector('.sort-date');
        let sortDateArrow = filterForm.querySelector('.sort-date-arrow');
        // let sortChat = filterForm.querySelector('.sort-chat');
        // let sortLike = filterForm.querySelector('.sort-like');
        let sortBookmark = filterForm.querySelector('.sort-bookmark');
        let sortMy = filterForm.querySelector('.sort-my');
        

    filterButtonBox.onclick = (e) => {
        if(filterIconBox.classList.contains('hidden')){
            filterIconBox.classList.remove('hidden');
        } else {
            filterIconBox.classList.add('hidden');
        }
    }

    if(sortMy != undefined){
        sortMy.onclick = (e) => {
            if(sayingSortFlag.my == true){
                sortMy.src = '/images/common/empty-my.svg';
                sayingSortFlag.my = false;
            } else {
                sortMy.src = '/images/common/full-my.svg';
                sayingSortFlag.my = true;
            }
            // 검색**************************************************************
            reflashSayingList();
        }
    }

    sortDate.onclick = (e) => {
        if(sayingSortFlag.date == true){
            sortDateArrow.src = '/images/common/up-arrow.svg';
            sayingSortFlag.date = false
        } else {
            sortDateArrow.src = '/images/common/down-arrow.svg';
            sayingSortFlag.date = true
        }
        // 검색**************************************************************
        reflashSayingList();
    }

    // sortChat.onclick = (e) => {
    //     if(sayingSortFlag.chat == true){
    //         sortChat.src = '/images/common/chat.svg';
    //         sayingSortFlag.chat = false
    //     } else {
    //         sortChat.src = '/images/common/full-chat.svg';
    //         sayingSortFlag.chat = true
    //     }
    //     // 검색**************************************************************
    //     reflashSayingList();
    // }

    // sortLike.onclick = (e) => {
    //     if(sayingSortFlag.like == true){
    //         sortLike.src = '/images/common/empty-like.svg';
    //         sayingSortFlag.like = false
    //     } else {
    //         sortLike.src = '/images/common/full-like.svg';
    //         sayingSortFlag.like = true
    //     }
    //     reflashSayingList();
    // }

    sortBookmark.onclick = (e) => {
        if(sayingSortFlag.bookmark == true){
            sortBookmark.src = '/images/common/empty-bookmark.svg';
            sayingSortFlag.bookmark = false;
        } else {
            sortBookmark.src = '/images/common/full-bookmark.svg';
            sayingSortFlag.bookmark = true;
        }
        // 검색**************************************************************
        reflashSayingList();
    }


    searchConditionItem.onclick = (e) => {
        if(e.target.tagName!='LI')
            return;
        let value = searchInput.value;
        let field = e.target.dataset.value;
        let categoryValue = categorySelect.value;
        sayingListParam.field = field;
        sayingListParam.value = value;
        sayingListParam.category = categoryValue;
        let lis = searchConditionItem.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        e.target.classList.add('active');

        // 검색**************************************************************
        reflashSayingList();
    }

    categorySelect.onchange = (e)=>{
        let value = searchInput.value;
        sayingListParam.value = value;
        let categoryValue = categorySelect.value;
        sayingListParam.category = categoryValue;
        // 검색**************************************************************
        reflashSayingList();
    }

    searchButton.onclick = (e)=>{
        let value = searchInput.value;
        sayingListParam.value = value;
        let categoryValue = categorySelect.value;
        sayingListParam.category = categoryValue;
        // 검색**************************************************************
        reflashSayingList();
    }

    searchInput.onfocus = ()=>{
        searchConditionBox.classList.remove('hidden');
    }


    // searchInput.onblur = () => {
    //     let value = searchInput.value;
    //     let categoryValue = categorySelect.value;
    //     if(value=='' && categoryValue==99){
    //         searchConditionBox.classList.add('hidden');
    //     }
    // }

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            getSayingList();
        }
    };
    
    let reflashSayingList = ()=>{
        sayingListDiv.innerHTML = '';
        sayingListParam.page = 1;
        sayingListParam.isComplete = false;
        getSayingList();
    }

    let getSayingList = ()=>{

        let params = {
            page : sayingListParam.page, 
            field : sayingListParam.field, 
            value : sayingListParam.value, 
            category : sayingListParam.category,
            sDate : sayingSortFlag.date,
            sBookmark : sayingSortFlag.bookmark,
            sMy : sayingSortFlag.my
        }


        if(sayingListParam.isComplete!=false){ // 완료되면 return
            return;
        }
    
        sendGetRequest("saying-list", params, false, (e) => {
            let sayingList = e.sayingList;
            let sayingLike = e.sayingLike;
            let userNickname = e.nickname;

            if(userNickname==undefined){
                //********* */
                sortBookmark.onclick = null;
                // sortLike.onclick = null;
            }

            if(sayingList.length!=5){
                sayingListParam.isComplete = true;
            }
            sayingListParam.page++;
            for (let i = 0; i < sayingList.length; i++) {
                makeSayingBox(sayingList[i], sayingLike[i]);
            }
        });	
    }



    replyCancel.onclick = function(e){
        replyBox.classList.remove("menu-show");
        bodyScrollLock.enableBodyScroll(replyInfo);
        replyContentList.innerHTML = "";
    }

    let makeReplyList = (replyList, member, sayingId) => {
        if(member!==undefined){
            //먼저 에디터블을 만든다.
            let eReplyDetailBox = document.createElement('div');
            eReplyDetailBox.classList.add('reply-detail-box');
            eReplyDetailBox.classList.add('editable');
                let eReplyAccountImageDiv = document.createElement('div');
                eReplyAccountImageDiv.classList.add('reply-account-image');
                    let eReplyAccountImage = document.createElement('img');
                    if(member.photo=='default'){
                        eReplyAccountImage.src = '/images/common/account_circle.svg';
                    } else {
                        eReplyAccountImage.src = '/img/'+member.photo;
                    }
                eReplyAccountImageDiv.append(eReplyAccountImage);

                let replyWarningDiv = document.createElement('div');
                replyWarningDiv.classList.add('field');
                replyWarningDiv.classList.add('full');
                replyWarningDiv.classList.add('warning-box');
                replyWarningDiv.classList.add('hidden');
                let replyWarningSpan = document.createElement('span');
                replyWarningSpan.classList.add('warning-text');
                // replyWarningSpan.textContent = '아이디 또는 비밀번호를 다시 확인해 주세요.';

                replyWarningDiv.append(replyWarningSpan);

                let eReplyContentDiv = document.createElement('div');
                eReplyContentDiv.classList.add('reply-content-box');
                    let eReplyDetailNicknameSpan = document.createElement('span');
                    eReplyDetailNicknameSpan.classList.add('reply-detail-nickname');
                    eReplyDetailNicknameSpan.textContent = member.nickname;
                    let eReplyDetailContentDiv = document.createElement('div');
                    eReplyDetailContentDiv.classList.add('reply-detail-content');
                    eReplyDetailContentDiv.classList.add('editable');
                    eReplyDetailContentDiv.contentEditable = 'true' // ******

                    eReplyDetailContentDiv.onkeyup = () => {
                        let contentLength = eReplyDetailContentDiv.textContent.length;
                        let regFlag = eReplyDetailContentDiv.textContent.substring(contentLength-3,contentLength);

                        //만약 length가 1000 이상이면 경고창

                        // ***


                            

                        if(regFlag==='***'){

                            // 유효성 검사...
                            if(contentLength<=3){
                                contentLength = 0;
                                eReplyDetailContentDiv.textContent='';
                                replyWarningSpan.textContent = '댓글을 입력해 주세요.'
                                replyWarningDiv.classList.remove('hidden');
                                return;
                            }

                            if(contentLength>=500){
                                replyWarningSpan.textContent = '댓글은 500자 이내로 입력해 주세요.'
                                eReplyDetailContentDiv.textContent = eReplyDetailContentDiv.textContent.substring(0,contentLength-3);
                                replyWarningDiv.classList.remove('hidden');
                                return;
                            }

                            regReply(sayingId, eReplyDetailContentDiv.textContent.substring(0,contentLength-3), ()=>{
                                replyWarningDiv.classList.add('hidden');
                                regFlag="";
                                contentLength=0;
                                eReplyDetailContentDiv.textContent='';
                                eReplyDetailContentDiv.blur();
                                replyContentList.innerHTML = "";
                                getReplyList(sayingId, (replyList, member)=>{
                                    makeReplyList(replyList, member, sayingId);
                                });

                            });
                        }
                    }

                eReplyContentDiv.append(eReplyDetailNicknameSpan);
                eReplyContentDiv.append(eReplyDetailContentDiv);

            eReplyDetailBox.append(eReplyAccountImageDiv);
            eReplyDetailBox.append(eReplyContentDiv);
            
            replyContentList.append(replyWarningDiv);
            replyContentList.append(eReplyDetailBox);

        }

        for (let i = 0; i < replyList.length; i++) {
            let reply = replyList[i];

            let replyDetailBox = document.createElement('div');
            replyDetailBox.classList.add('reply-detail-box');

                let replyAccountImageDiv = document.createElement('div');
                replyAccountImageDiv.classList.add('reply-account-image');
                    let replyAccountImage = document.createElement('img');
                    if(reply.Member.photo=='default'){
                        replyAccountImage.src = '/images/common/account_circle.svg';
                    } else {
                        replyAccountImage.src = '/img/'+reply.Member.photo;
                    }
                replyAccountImageDiv.append(replyAccountImage);

                let replyContentDiv = document.createElement('div');
                replyContentDiv.classList.add('reply-content-box');
                    let replyDetailNicknameSpan = document.createElement('span');
                    replyDetailNicknameSpan.classList.add('reply-detail-nickname');
                    replyDetailNicknameSpan.textContent = reply.Member.nickname;
                    let replyDetailContentSpan = document.createElement('span');
                    replyDetailContentSpan.classList.add('reply-detail-content');
                    replyDetailContentSpan.textContent = '  '+reply.content;

                    
                    let replyDeleteSpan = document.createElement('span');

                    if(member !== undefined){
                        if(member.id === reply.writerId){   
                            replyDeleteSpan.classList.add('reply-delete');
                                let replyDeleteImg = document.createElement('img');
                                replyDeleteImg.src = '/images/common/delete-button.svg';
                            replyDeleteSpan.append(replyDeleteImg);

                            replyDeleteSpan.onclick = () => {
                                deleteReply(reply.id, ()=>{
                                    replyContentList.innerHTML = "";
                                    getReplyList(sayingId, (replyList, member)=>{
                                        makeReplyList(replyList, member, sayingId);
                                    });
                                });
                            }

                        }
                    }
                    
                    let replyDetailDateSpan = document.createElement('span');
                    replyDetailDateSpan.classList.add('reply-detail-date');
                    replyDetailDateSpan.textContent = reply.regDate;
                replyContentDiv.append(replyDetailNicknameSpan);
                replyContentDiv.append(replyDetailContentSpan);
                replyContentDiv.append(replyDeleteSpan);
                replyContentDiv.append(document.createElement('br'));
                replyContentDiv.append(replyDetailDateSpan);


            replyDetailBox.append(replyAccountImageDiv);
            replyDetailBox.append(replyContentDiv);

            replyContentList.append(replyDetailBox);




            let reflashReplyDiv = sayingListDiv.querySelector(`[data-id="${sayingId}"]`);

            // 바깥쪽 대상 reply 갱신

            let rSayingReplyList = reflashReplyDiv.querySelector('.saying-reply-list');
            let rSayingReplyCount = reflashReplyDiv.querySelector('.saying-reply-count');
            rSayingReplyList.innerHTML = "";
            rSayingReplyCount.innerHTML = "";

            for (let i = 0; i < replyList.length; i++) {
                    let value = replyList[i];
                    if(i>=2)
                        break;
                let replyBoxDiv = document.createElement('div');
                replyBoxDiv.classList.add('saying-reply-box');
                let replyNicknameSpan = document.createElement('span');
                replyNicknameSpan.classList.add('reply-nickname');
                replyNicknameSpan.textContent = value.Member.nickname;
                let replyContentSpan = document.createElement('span');
                replyContentSpan.classList.add('reply-content');
                if(value.content.length > 20){
                    replyContentSpan.textContent = '  ' + value.content.substring(0, 20) + '...';
                } else {
                    replyContentSpan.textContent = '  ' + value.content;
                }                
                replyBoxDiv.append(replyNicknameSpan);
                replyBoxDiv.append(replyContentSpan);
                rSayingReplyList.append(replyBoxDiv);
            }



            let rReplyCountBox = document.createElement('div');
            rReplyCountBox.classList.add('saying-reply-count');
            let rReplyCountSpan = document.createElement('span');
            rReplyCountSpan.textContent = '댓글 '+replyList.length+'개'
            rSayingReplyCount.append(rReplyCountSpan);

        }

    };

    let makeSayingBox = (saying, sayingLike)=>{
        let article = document.createElement('article');
        article.classList.add('saying-box');
        article.setAttribute('data-id', saying.id);


        let backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('saying-background');

        let accountDiv = document.createElement('div');
        accountDiv.classList.add('account-info');

        let accountImg = document.createElement('img');
        accountImg.classList.add('account-image');
        if(saying.photo=='default'){
            accountImg.src = '/images/common/account_circle.svg';
        } else {
            accountImg.src = '/img/'+saying.photo;
        }
        

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


        let contentHtml = contentP.innerHTML;
        contentP.innerHTML = contentHtml.replace(/(\n|\r\n)/g,'<br />');
        // contentP.textContent = contentP.textContent

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


            
                for (let i = 0; i < saying.Replies.length; i++) {
                    let value = saying.Replies[i];
                    if(i>=2)
                        break;

                    let replyBoxDiv = document.createElement('div');
                    replyBoxDiv.classList.add('saying-reply-box');
                    let replyNicknameSpan = document.createElement('span');
                    replyNicknameSpan.classList.add('reply-nickname');
                    replyNicknameSpan.textContent = value.Member.nickname;
                    let replyContentSpan = document.createElement('span');
                    replyContentSpan.classList.add('reply-content');
                    if(value.content.length > 20){
                        replyContentSpan.textContent = '  ' + value.content.substring(0, 20) + '...';
                    } else {
                        replyContentSpan.textContent = '  ' + value.content;
                    }
                    
                    replyBoxDiv.append(replyNicknameSpan);
                    replyBoxDiv.append(replyContentSpan);
                    replyList.append(replyBoxDiv);
                    
                }



        let replyCountBox = document.createElement('div');
        replyCountBox.classList.add('saying-reply-count');
        let replyCountSpan = document.createElement('span');
        replyCountSpan.textContent = '댓글 '+saying.Replies.length+'개'
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
        
        sayingListDiv.append(article);

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



        /*댓글 클릭 */
        chatImg.onclick = function(e){
            const targetElement = replyInfo;
            bodyScrollLock.disableBodyScroll(targetElement);
            replyBox.classList.add("menu-show");

            getReplyList(saying.id, (replyList, member)=>{
                makeReplyList(replyList, member, saying.id);
            });

            e.stopPropagation();
        };



    };

    // 시작 페이지

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

let getReplyList = (sayingId, callback) => {
    let params = { sayingId };
    sendGetRequest("replylist", params, false, (e) => {
        if(e.result){
            callback(e.result, e.member);
        }
    });
};

let regReply = (sayingId, content, callback) => {
    let params = { sayingId, content };
    sendPostRequest("reg-reply", params, false, (e) => {
        if(e.result){
            callback();
        }
    });
};


let stopDefaultEvent = (e)=>{
    e.preventDefault();       
    e.stopPropagation();
    return false;
}


let deleteReply = (replyId, callback) => {
    let params = { replyId };
    sendPostRequest("delete-reply", params, false, (e) => {
        if(e.result){
            callback();
        }
    });
}