window.addEventListener('load', ()=>{

    let sayingWarning = document.querySelector('#saying-warning');
    let sayingWrite = document.querySelector('#saying-write');
    let sayingInfo = document.querySelector('#saying-info');

    let accountInfo = sayingWrite.querySelector('.account-info');

    let myPhoto = accountInfo.querySelector('.my-photo'); // 내 원래 사진
    let originSrc = myPhoto.src;

    let warningContent = sayingWarning.querySelector('.warning-content');
    let warningName = sayingWarning.querySelector('.warning-name');

    let inputName = sayingWrite.querySelector('input[name="name"]'); // 이름
    let inputContent = sayingWrite.querySelector('textarea[name="content"]'); // 컨텐츠

    let inputCategory = sayingInfo.querySelector('select[name="category"]'); // 카테고리
    let myButton = sayingInfo.querySelector('.my-button');
    let changeButton = sayingInfo.querySelector('.change-button');
    let fileButton = sayingInfo.querySelector('input[type="file"]');
    let inputTag = sayingInfo.querySelector('input[name="tag"]');
    let tagList = sayingInfo.querySelector('.tag-list');
    let regButton = sayingInfo.querySelector('.reg-button');

    myButton.onclick = ()=>{
        myButton.classList.add('primary');
        changeButton.classList.remove('primary');
        myPhoto.src = originSrc;
        fileButton.value = "";
        // 등록할 때 서버로 보낼 데이터 조정해야 함
    };

    changeButton.onclick = ()=>{
        changeButton.classList.add('primary');
        myButton.classList.remove('primary');
        let event = new MouseEvent("click",{
			"view" : window,
			"bubbles" : true,
			"cancelable" : true
		});
		fileButton.dispatchEvent(event);
    };

    	// 상태값  
	fileButton.onchange = function(e){

		let file = fileButton.files[0];
		
		// 선택한 파일에 대한 조건 제어		
		if(file.type.indexOf("image/") < 0){
            warningBox.classList.remove('hidden');
			warningText.textContent = '이미지가 아닙니다.';
			return;
		}
		
		if(file.size > 1024*1024*10){
            warningBox.classList.remove('hidden');
			warningText.textContent = '10MB를 초과할 수 없습니다.';
			return;
        }

        let reader = new FileReader();
        reader.onload = (e) =>{ 
            myPhoto.src = e.target.result; // 여기서 file 들어간다.
        };
        // 다 읽어 왔을 때.. background에서.. 
        reader.readAsDataURL(file);
        
        // warningBox.classList.add('hidden');
        // warningText.textContent = '';
	
        // // 이미지 업로드 가즈아
        // let formData = new FormData();
        // formData.append('img', file);

        // let xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //     if (xhr.status === 200) {
		// 		let result = JSON.parse(xhr.responseText).result;
		// 		if(result){
		// 			// 브라우저 메모리에 파일이 올라감
		// 			// html5 기능 로컬 이미지 불러들이기
		// 			let reader = new FileReader();
		// 			reader.onload = (e) =>{ 
		// 				photo.src = e.target.result; // 여기서 file 들어간다.
		// 			};
		// 			// 다 읽어 왔을 때.. background에서.. 
		// 			reader.readAsDataURL(file);
		// 		}
        //     } else {
		// 		console.error(xhr.responseText);
        //     }
        // };
        // xhr.open('POST', '/member/change-photo');
        // xhr.send(formData);
    };
    
    inputTag.onkeyup = ()=>{
        let tagValue = inputTag.value;
        if(tagValue.trim()==''){
            tagList.innerHTML="";
            return;
        }
        let tagArray = tagValue.split(" ");
        tagList.innerHTML="";
        for (let i = 0; i < tagArray.length; i++) {
            if(i>4)
                break;
            let tag = tagArray[i];
            if(tag.trim()=='' || !regexCheck(sayingRegex.tag, tag)){
                continue;
            }
            let li = document.createElement('li');
            li.classList.add('tag');
            li.textContent = '#' + tag;
            tagList.append(li);
        }

    };

    regButton.onclick = ()=>{

        let categoryValue = inputCategory.value;
        let nameValue = inputName.value;
        let contentValue = inputContent.value;
        let file = fileButton.files[0];
        let tag = '';
        let list = tagList.children;
        for (let i = 0; i < list.length; i++) {
            tag+=list[i].textContent;
        }
        if(tag!='')
            tag = tag.substring(1);
         
        if(nameValue.trim()=='' || contentValue.trim()==''){
            if(nameValue.trim()==''){
                warningName.classList.remove('hidden');
            } else{
                warningName.classList.add('hidden');
            }
            if(contentValue.trim()==''){
                warningContent.classList.remove('hidden');
            } else{
                warningContent.classList.add('hidden');
            }
            window.scrollTo(0,0);
            return;
        }

        // 이미지 업로드 가즈아
        let formData = new FormData();
        formData.append('img', file);
        formData.append('name', nameValue);
        formData.append('content', contentValue);
        formData.append('category', categoryValue);
        formData.append('tag', tag);

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
				let result = JSON.parse(xhr.responseText).result;
				if(result){
                    console.log(result);
				}
            } else {
				console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/saying/write');
        xhr.send(formData);

    };



});