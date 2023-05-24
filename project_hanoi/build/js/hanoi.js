let printCount = 0;
            let gameFlag = false;
            let dragged = null;
            let targetId = "";
            // 재귀 함수를 사용하여 박스가 움직일 시작위치와 도착위치 배열에 담기
            let solution = (n) => {
                let answer = [];
                const hanoi = (num, start, mid, end) => {
                    if(num === 1) {
                        answer.push([start, end]);
                        return;
                    } else {
                        hanoi(num - 1, start, end, mid);
                        answer.push([start, end]);
                        hanoi(num - 1, mid, start, end);
                    }
                }
                hanoi(n, 'circleBoxA', 'circleBoxB', 'circleBoxC');
                console.log(answer);
                return answer;
            }
            // 재귀 함수를 사용하여 몇번 박스가 움직일지 박스 번호의 변화를 배열에 담기
            let solutionNum = (n) => {
                let answer = [];
                const hanoi = (num, start, mid, end) => {
                    if(num === 1) {
                        answer.push([num]);
                        return;
                    } else {
                        hanoi(num - 1, start, end, mid);
                        answer.push([num]);
                        hanoi(num - 1, mid, start, end);
                    }
                }
                hanoi(n, 'circleBoxA', 'circleBoxB', 'circleBoxC');
                console.log(answer);
                return answer;
            }
            // 비동기 처리용 함수
            function wait(ms) {
                console.log('wait in');
                const wakeUpTime = Date.now() + ms;
                while (Date.now() < wakeUpTime) {}
            }
            // 클릭 버튼을 누르면 입력한 값 만큼의 박스 생성
            // 처음엔 자동시작 버튼 활성화 시켜두기
            $("#clickBtn").on("click", () => {
                gameFlag = false;
                let moveCount = parseInt($("#insertNum").val());
                $("#circleBoxA").html('');
                $("#circleBoxB").html('');
                $("#circleBoxC").html('');
                $("#progressText").html('');
                printCount = 0;
                if(moveCount < 6){
                    $("#minCount").html(`Move Count: 0회`);
                    while(moveCount > 0){
                        let makeCircle = `<div id="circle${moveCount}" class="circleA circle${moveCount}" draggable="true">${moveCount}</div>`;
                        $("#circleBoxA").append(makeCircle);
                        moveCount--;
                    }
                } else {
                    console.log('false');
                    $("#modalError").css("display", "flex");
                    return false;
                }
            });
            // 직접 이동 버튼을 누르면 자동실행 버튼 이벤트는 막고 직접 드래그로 이동만 가능하게 하기
            $("#selfBtn").on("click", () => {
                let idCount = $("#insertNum").val();
                gameFlag = true;
                $("#insertNum").val("");
                let startId = "";
                if($("#circleBoxA").children().length == 0){
                    console.log('empty');
                    $("#modalError").css("display", "flex");
                    return;
                }
                if(gameFlag == true){
                    // 드래그 시작지점
                    // e.target 의 값 밖의 변수에 전달
                    $(document).on('dragstart', e => {
                        dragged = e.target;
                        targetId = e.target.id;
                        startId = e.target.parentNode.id;
                    });
                    // 드래그가 움직이는동안 이벤트 버블링 방지
                    $(document).on("dragover", e => {
                        e.preventDefault();
                    });
                    // 드래그해서 놓았을때의 위치의 부모 id를 받아서 그 안에 드래그한 박스 생성
                    $(document).on("drop", e => {
                        e.preventDefault();
                        let divWrapId = e.target.id;
                        let moveFlag = false;
                        let checkHtml = parseInt(targetId.substring(6));
                        printCount++;
                        if(!moveFlag){
                            if($(`#${divWrapId}`).children().html() < $(`#${targetId}`).html() || $(`#${divWrapId}`).children().html() == $(`#${targetId}`).html() ){
                                console.log('false');
                                return;
                            } else {
                                if(e.target == circleBoxA || e.target == circleBoxB || e.target == circleBoxC){
                                    console.log($(`#circleBoxA`).children().last().html());
                                    console.log($(`#${targetId}`).html());
                                    console.log(e.target);
                                    dragged.parentNode.removeChild(dragged);
                                    e.target.appendChild(dragged);
                                    //divWrapId.appendChild(dragged);
                                    $("#minCount").html(`Move Count: ${printCount}회`);
                                    $("#progressText").html($("#progressText").html() + `${printCount}. ${targetId.substring(6)}번 블록이 ${startId.substring(9)}에서 ${divWrapId.substring(9)}로 이동` + '<br>');
                                    setTimeout(() => {
                                        if($('#circleBoxC').children().length == idCount || $("#circleBoxB").children().length == idCount){
                                            $("#modalWrap").css("display", "flex");
                                            $("#progressText").html($("#progressText").html() + '종료');
                                            $(document).off();
                                        }
                                        return;
                                    }, 1000);
                                }
                            }
                        }
                    });
                }
            });
            // 자동 시작 버튼
            $("#goBtn").on("click", () => {
                let moveCount = parseInt($("#insertNum").val());
                if(gameFlag == false && $("#circleBoxA").children().length == moveCount){
                    let loopCount = (2**moveCount)-1;
                    let i = 0;
                    let hanoiArray = solution(moveCount);
                    let idCount = solutionNum(moveCount);
                    let printCount1 = 0;
                    $("#insertNum").val("")
                    while(loopCount > i) {
                        let makeCircle = `<div id="circle${idCount[i]}" class="circleA circle${idCount[i]}" draggable="true">${idCount[i]}</div>`; 
                        let moveStart = hanoiArray[i][0];
                        let moveTo = hanoiArray[i][1];
                        let printBlock = idCount[i];
                        setTimeout(() => {
                            if( moveCount === 1){
                                $("#circle1").remove();
                                $("#circleBoxC").append(makeCircle);
                                $("#minCount").html("Move Count: 1회");
                                $("#progressText").html(`${i}. 1번 블록이 A에서 C로 이동`);
                            } else {
                                $(`#${moveStart} > div:last-child`).remove();
                                $(`#${moveTo}`).append(makeCircle);
                                printCount1++;
                                $("#minCount").html(`Move Count: ${printCount1}회`);
                                $("#progressText").html($("#progressText").html() + `${printCount1}. ${printBlock}번 블록이 ${moveStart.substring(9)}에서 ${moveTo.substring(9)}로 이동` + '<br>');
                            }
                            if(printCount1 == loopCount){
                                $("#progressText").html($("#progressText").html() + '종료');
                            }
                            wait(1000);
                        }, 200);
                        i++;
                    }
                } else if($("#circleBoxA").children().length == 0){
                    console.log('empty');
                    $("#modalError").css("display", "flex");
                    return;
                } else {
                    console.log('dont move');
                    return;
                }
            });
            $("#modalText").on("click", () => {
                $("#modalWrap").css("display", "none");
                $("#circleBoxB").html("");
                $("#circleBoxC").html("");
                $("#minCount").html("Move Count: 0회");
            });
            $("#modalErrorText").on("click", () => {
                $("#modalError").css("display", "none");
                $("#circleBoxB").html("");
                $("#circleBoxC").html("");
                $("#minCount").html("Move Count: 0회");
            });