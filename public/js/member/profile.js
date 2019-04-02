window.addEventListener("load", function(){
	
	let regBox = document.querySelector("#reg-box");
	
	// 멤버 프로필
	let photo = regBox.querySelector(".photo");

    //사진선택
    let photoButton = regBox.querySelector(".photo-button");
    let fileButton = regBox.querySelector("input[type='file']");
    
    //warning
    
    let warningBox = regBox.querySelector(".warning-box");
    let warningText = regBox.querySelector(".warning-text");
 
	// 상태값  
	fileButton.onchange = function(e){

		let file = fileButton.files[0];
		
		// 선택한 파일에 대한 조건 제어		
		if(file.type.indexOf("image/") < 0){
            warningBox.classList.remove('hidden');
			warningText.textContent = '이미지가 아닙니다.';
			return;
		}
		
		if(file.size > 1024*1024*5){
            warningBox.classList.remove('hidden');
			warningText.textContent = '5MB를 초과할 수 없습니다.';
			return;
        }
        
        warningBox.classList.add('hidden');
		warningText.textContent = '';

		const fileName = file.name;

		loadImage(
			file,
			(img) => {
				let width;
				let height;
				if(file.size>1024*1024*2){
					// 파일 사이즈 2mb
					width = (img.width * 5)/100;
					height = (img.height * 5)/100;
				} else if(file.size>1024*1024*1){
					width = (img.width * 10)/100;
					height = (img.height * 10)/100;
				} else if(file.size>1024*1024*0.5){
					width = (img.width * 20)/100;
					height = (img.height * 20)/100;
				} else if(file.size>1024*1024*0.1){
					width = (img.width * 50)/100;
					height = (img.height * 50)/100;
				} else {
					width = (img.width * 70)/100;
					height = (img.height * 70)/100;
				}
				const elem = document.createElement('canvas');
				elem.width = width;
				elem.height = height;
				const ctx = elem.getContext('2d');
				// img.width and img.height will contain the original dimensions
				ctx.drawImage(img, 0, 0, width, height);
				ctx.canvas.toBlob((blob) => {
					let newFile = new File([blob], fileName, {
						type: 'image/jpeg',
						lastModified: Date.now()
					});
					file = newFile;
					// 이미지 업로드 가즈아
					let formData = new FormData();
					formData.append('img', file);

					let xhr = new XMLHttpRequest();
					xhr.onload = function () {
						if (xhr.status === 200) {
							let result = JSON.parse(xhr.responseText).result;
							if(result){
								// 브라우저 메모리에 파일이 올라감
								// html5 기능 로컬 이미지 불러들이기
								let reader = new FileReader();
								reader.onload = (e) =>{ 
									photo.src = e.target.result; // 여기서 file 들어간다.
								};
								// 다 읽어 왔을 때.. background에서.. 
								reader.readAsDataURL(file);
							}
						} else {
							console.error(xhr.responseText);
						}
					};
					xhr.open('POST', '/member/change-photo');
					xhr.send(formData);

				}, 'image/jpeg', 1);
			},
			{orientation: true}
		);
		
	};

	photoButton.onclick = function(e){
		let event = new MouseEvent("click",{
			"view" : window,
			"bubbles" : true,
			"cancelable" : true
		});
		fileButton.dispatchEvent(event);
	}
	
	// submitButton.onclick = function(e){
	// 	let birthday = birthdayInput.value;
	// 	let gender = genderInput.value;
	// 	if(birthday=="" || gender ==""){
	// 		e.preventDefault();
	// 		return;
	// 	}
	// }

});