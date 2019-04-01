window.addEventListener('load', ()=>{

    let getSayingList = ()=>{
        let params = {};
        sendGetRequest("saying-list", params, true, (e) => {
            //makeSayingBox(e.result);
            let sayingList = e.result;
            for (let i = 0; i < sayingList.length; i++) {
                makeSayingBox(sayingList[i]);
            }
        });	
    }

    let makeSayingBox = (saying)=>{
        let article = document.createElement('article');
        article.classList.add('saying-box');
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

        article.append(accountDiv);
        article.append(contentDiv);
        article.append(writerDiv);
        article.append(tagDiv)
        sayingList.append(article);
    };

    let sayingList = document.querySelector('#saying-list');

    
    getSayingList();
/*

			<article class="saying-box">
				<div class="account-info">
					<img class="account-image" src="/images/common/account_circle.svg" />
					<span class="saying-name">Seongcheol Hong</span>
				</div>
				<div class="saying-content-box">
					<p class="saying-content"> 행복은 멀리 있는게 아니다. 바로 옆을 바라봐라. 그것이 행복이다.</p>
				</div>
				<div class="saying-writer">
					<span>고슴도치가시</span>
				</div>
			</article>

*/





});







