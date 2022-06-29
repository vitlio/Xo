
document.addEventListener("DOMContentLoaded", () => {

    const cell = document.querySelectorAll('.mainpole__pole')
    const startNewGame = document.querySelector('.startNewGame')
    const playerName = document.querySelector('.header-name__input')
    const headerNameView = document.querySelector('.header-name__view')
    const headerWinner = document.querySelector('.header-winner')
    const chat = document.querySelector('.chat')
    const sendBtn = document.getElementById('sendBtn')
    const textInput = document.getElementById('textInput')

    const ws = new WebSocket('ws://localhost:8080')

    function printMessage(value){
        const li = document.createElement('li')
        li.style.listStyleType = 'none'
        li.innerHTML = value
        chat.appendChild(li)
    }

    // ws.onopen = () => setStatus('ONLINE')
    // ws.onclose = () => setStatus('DISCONECTED')
    ws.onmessage = response => {
        printMessage(response.data)
    }

    sendBtn.addEventListener('click', () => {
        ws.send(textInput.value)
        textInput.value = ''
    })

    let pass = 0
    let arrX = []
    let arrY = []
    let arrField = []
    let winner = ''
    let player = ''
    playerName.addEventListener('keydown', e => { // input ввода имени, имя появится сверху
        if(e.keyCode == 13){
            player = e.target.value
            playerName.classList.add('opacyti-transparent')
            headerNameView.innerText = 'Player: ' + player
            headerNameView.classList.add('opacyti-transparent-view')
        }
    })
    
    startNewGame.addEventListener('click', () => {
        startTheGame()
    })

    function startTheGame(){
        pass = 0
        arrX = []
        arrY = []
        winner = ''
        arrField = []
        
        headerWinner.innerText = ''
        headerWinner.classList.remove('opacyti-transparent-view')

        for (let index = 0; index < cell.length; index++){
            cell[index].innerText = ''
            arrField.push(cell[index].id)
        }
    
        for (let index = 0; index < cell.length; index++) { //навешиваем событие клик на каждую ячейку

            cell[index].addEventListener('click', e => {

                if(move(e.target.id) && !gameOver()){
                    pass++
                    arrField = arrField.filter(i => i !== e.target.id)
                    e.target.innerText = ['O', 'X'][pass % 2];
                    if(pass % 2 == 1) { 
                        arrX.push(e.target.id); if(!gameOver()) {compStep()}
                    } 
                    gameOver()
                }
            })
        }
    }
    
        function move(m){ // проверяем была ли тыкнута эта ячейка
            if(arrX.includes(m) || arrY.includes(m)) return false 
            return true
        }
    
        function gameOver(){ // проверка вариантов выигрыша, победитель записывается в winner

            if((arrX.includes('mp0') && arrX.includes('mp1') && arrX.includes('mp2')) || 
               (arrX.includes('mp3') && arrX.includes('mp4') && arrX.includes('mp5')) ||
               (arrX.includes('mp6') && arrX.includes('mp7') && arrX.includes('mp8')) ||
               (arrX.includes('mp0') && arrX.includes('mp3') && arrX.includes('mp6')) ||
               (arrX.includes('mp1') && arrX.includes('mp4') && arrX.includes('mp7')) ||
               (arrX.includes('mp2') && arrX.includes('mp5') && arrX.includes('mp8')) ||
               (arrX.includes('mp0') && arrX.includes('mp4') && arrX.includes('mp8')) ||
               (arrX.includes('mp2') && arrX.includes('mp4') && arrX.includes('mp6'))){
                    winner = player || 'X'
                    if(player === '') playerName.classList.add('opacyti-transparent')
                    headerWinner.innerText = 'Winner is ' + winner
                    headerWinner.classList.add('opacyti-transparent-view')
                    headerWinner.style.left = `${window.screen.width / 2 - headerWinner.clientWidth / 2}px`
                    return true
               }
               if((arrY.includes('mp0') && arrY.includes('mp1') && arrY.includes('mp2')) || 
                  (arrY.includes('mp3') && arrY.includes('mp4') && arrY.includes('mp5')) ||
                  (arrY.includes('mp6') && arrY.includes('mp7') && arrY.includes('mp8')) ||
                  (arrY.includes('mp0') && arrY.includes('mp3') && arrY.includes('mp6')) ||
                  (arrY.includes('mp1') && arrY.includes('mp4') && arrY.includes('mp7')) ||
                  (arrY.includes('mp2') && arrY.includes('mp5') && arrY.includes('mp8')) ||
                  (arrY.includes('mp0') && arrY.includes('mp4') && arrY.includes('mp8')) ||
                  (arrY.includes('mp2') && arrY.includes('mp4') && arrY.includes('mp6'))){
                    winner = 'O'
                    if(player === '') playerName.classList.add('opacyti-transparent')
                    headerWinner.innerText = 'Winner is ' + winner
                    headerWinner.classList.add('opacyti-transparent-view')
                    headerWinner.style.left = `${window.screen.width / 2 - headerWinner.clientWidth / 2}px`
                    return true
               }
            if(arrX.length + arrY.length === 9) {
                if(player === '') playerName.classList.add('opacyti-transparent')
                headerWinner.innerText = 'Ничья'
                headerWinner.classList.add('opacyti-transparent-view')
                headerWinner.style.left = `${window.screen.width / 2 - headerWinner.clientWidth / 2}px`
                return true
            }
               return false
        }
    
        function compStep(){
            // if(pass % 2 == 0){
                // console.log('comp');
                // if(!arrX.includes('mp4')){ //когда нажать на mp4
                //     setTimeout(() => {
                //         document.getElementById('mp4').click()
                //         arrY.push('mp4')
                //     }, 300) 
                //     console.log('mp4');
                //     return null
                // }
                // if( ((arrX.includes('mp0') && arrX.includes('mp1')) || //когда нажать на mp2
                //     (arrX.includes('mp8') && arrX.includes('mp5')) ||
                //     (arrX.includes('mp4') && arrX.includes('mp6')) ||
                //     (arrY.includes('mp0') && arrY.includes('mp1')) ||
                //     (arrY.includes('mp8') && arrY.includes('mp5')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp6'))) && !arrY.includes('mp2') ){
                //     setTimeout(() => {
                //         document.getElementById('mp2').click()
                //         arrY.push('mp2')
                //     }, 300) 
                    
                //     console.log('mp2')
                //     return null
                // }
    
                // if( ((arrX.includes('mp4') && arrX.includes('mp7')) || //когда нажать на mp1
                //     (arrX.includes('mp0') && arrX.includes('mp2')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp7')) ||
                //     (arrY.includes('mp0') && arrY.includes('mp2'))) && !arrY.includes('mp1') ){
                //     setTimeout(() => {
                //         document.getElementById('mp1').click()
                //         arrY.push('mp1')
                //     }, 300)
                    
                //     console.log('mp1')
                //     return null
                // }
                
                // if( ((arrX.includes('mp3') && arrX.includes('mp6')) || //когда нажать на mp0
                //     (arrX.includes('mp1') && arrX.includes('mp2')) ||
                //     (arrX.includes('mp4') && arrX.includes('mp8')) ||
                //     (arrY.includes('mp3') && arrY.includes('mp6')) ||
                //     (arrY.includes('mp1') && arrY.includes('mp2')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp8'))) && arrField.includes('mp0') ){
                //     setTimeout(() => {
                //         document.getElementById('mp0').click()
                //         arrY.push('mp0')
                //     }, 300)
                    
                //     console.log('mp0')
                //     return null
                // }
    
                // if( ((arrX.includes('mp4') && arrX.includes('mp5')) || //когда нажать на mp3
                //     (arrX.includes('mp0') && arrX.includes('mp6')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp5')) ||
                //     (arrY.includes('mp0') && arrY.includes('mp6'))) && arrField.includes('mp3') ){
                //     setTimeout(() => {
                //         document.getElementById('mp3').click()
                //         arrY.push('mp3')
                //     }, 300)
                    
                //     console.log('mp3')
                //     return null
                // }
    
                // if( ((arrX.includes('mp3') && arrX.includes('mp4')) || //когда нажать на mp5
                //     (arrX.includes('mp8') && arrX.includes('mp2')) ||
                //     (arrY.includes('mp3') && arrY.includes('mp4')) ||
                //     (arrY.includes('mp8') && arrY.includes('mp2'))) && arrField.includes('mp5') ){
                //     setTimeout(() => {
                //         document.getElementById('mp5').click()
                //         arrY.push('mp5')
                //     }, 300)
                    
                //     console.log('mp5')
                //     return null
                // }
    
                // if( ((arrX.includes('mp3') && arrX.includes('mp0')) || //когда нажать на mp6
                //     (arrX.includes('mp4') && arrX.includes('mp2')) ||
                //     (arrX.includes('mp7') && arrX.includes('mp8')) ||
                //     (arrY.includes('mp3') && arrY.includes('mp0')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp2')) ||
                //     (arrY.includes('mp7') && arrY.includes('mp8'))) && arrField.includes('mp6') ){
                //     setTimeout(() => {
                //         document.getElementById('mp6').click()
                //         arrY.push('mp6')
                //     }, 300)
                    
                //     console.log('mp6')
                //     return null
                // }
    
                // if( ((arrX.includes('mp1') && arrX.includes('mp4')) || //когда нажать на mp7
                //     (arrX.includes('mp8') && arrX.includes('mp6')) ||
                //     (arrY.includes('mp1') && arrY.includes('mp4')) ||
                //     (arrY.includes('mp8') && arrY.includes('mp6'))) && arrField.includes('mp7') ){
                //     setTimeout(() => {
                //         document.getElementById('mp7').click()
                //         arrY.push('mp7')
                //     }, 300)
                    
                //     console.log('mp7')
                //     return null
                // }
    
                // if( ((arrX.includes('mp4') && arrX.includes('mp0')) || //когда нажать на mp8
                //     (arrX.includes('mp5') && arrX.includes('mp2')) ||
                //     (arrX.includes('mp7') && arrX.includes('mp6')) ||
                //     (arrY.includes('mp4') && arrY.includes('mp0')) ||
                //     (arrY.includes('mp5') && arrY.includes('mp2')) ||
                //     (arrY.includes('mp7') && arrY.includes('mp6'))) && arrField.includes('mp8')){
                //     setTimeout(() => {
                //         document.getElementById('mp8').click()
                //         arrY.push('mp8')
                //     }, 300)
                    
                //     console.log('mp8')
                //     return null
                // }
                setTimeout(() => {
                    let ran = Math.round(Math.random() * (arrField.length - 1))
                    arrY.push(arrField[ran])
                    document.getElementById(arrField[ran]).innerText = 'O'
                    pass++
                    arrField = arrField.filter(i => i !== arrField[ran])
                    gameOver()
                }, 300)
                // return null
            // }

        }
    
    

})