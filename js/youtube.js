 // 2. This code loads the IFrame Player API code asynchronously.
 let tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
//  <script src="http://www.youtube.com/iframe_api"></script>
 let firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 let player;
 function onYouTubeIframeAPIReady() {
    //<div id="player"></div>
    // id에 #은 안붙여도 됩니다. 이미 유튜브에서 의해서 만들어져서 아이디로 접근가능
   player = new YT.Player('player', {
    // 최초 재생할 유튜브 영상 ID
    // https://youtu.be/An6LvWQuj_8
     videoId: 'An6LvWQuj_8',
    //  playerVars에 지원되는 매개변수
    //  https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ko#Parameters
    //  정보를 넣어주는 곳
     playerVars :{
        autoplay : true, //자동 재생
        loop : true, // 반복 재생
        playlist : 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록
     },
    // 이벤트가 뒤쪽으로 오는게 좋아
     events: {
       'onReady' : function(ev){
        ev.target.mute(); //음소거
       }
     }
   });
 }
 