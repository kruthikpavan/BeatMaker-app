class Drumkit{
    constructor(){
        this.index=0
        this.bpm=13
        this.kickaudio=document.querySelector(".kick-sound")
        this.snareaudio=document.querySelector(".snare-sound")
        this.hihataudio=document.querySelector(".hihat-sound")
        this.currentkick= "./sounds/kick-classic.wav"
        this.currentsnare= "./sounds/snare-acoustic01.wav"
        this.currenthihat= "./sounds/hihat-808.wav"
        this.playing=null
        this.selects=document.querySelectorAll("select");
        this.mute= document.querySelectorAll(".mute");
        this.temporoll= document.querySelector(".temporoll");




    }

loop(){
    const step= (this.index%7);
    // console.log(step);
    const activebars= document.querySelectorAll(`.b${step}`);
    // console.log(activebars);
    activebars.forEach(bar=>{
        bar.style.animation= `playtrack 0.3s alternate ease-in-out 2`
        if(bar.classList.contains("active")){
            if(bar.classList.contains("kick-pad")){
                this.kickaudio.currentTime=0;
                this.kickaudio.play();
            }
            if(bar.classList.contains("snare-pad")){
                this.snareaudio.currentTime=0;

                this.snareaudio.play();

            }
            if(bar.classList.contains("hihat-pad")){
                this.hihataudio.currentTime=0;

                this.hihataudio.play();

            }
        }
    });
    this.index++;



}
updatebtn(){
    playbtn.classList.toggle("active");
    if(this.playing===null){
        playbtn.innerText= "Stop";

    }
    else{
        playbtn.innerText= "Play";

    }
}
activepad(){
    this.classList.toggle("active");
    

}
start(){
    const rate =  (60/this.bpm )*1000;
    if(this.playing===null){
        this.playing=setInterval(() => {
            this.loop()
        }, rate);
    }
    else{
        clearInterval(this.playing);
        this.playing=null
        // this.index=0
    }
    

}
changesound(event){
    let selectionname= event.target.name;
    let selectionvalue= event.target.value;
    if(selectionname==='kick-select'){
        this.kickaudio.src= selectionvalue;
        
    }
    if(selectionname==='snare-select'){
        this.snareaudio.src= selectionvalue;

    }
    if(selectionname==='hihat-select'){
        this.hihataudio.src= selectionvalue;

    }


}

mutesound(e){
    e.target.classList.toggle("active");
    if(e.target.classList.contains("active")){
        if(e.target.classList.contains('kick-volume')){
            this.kickaudio.volume=0;
        }
        if(e.target.classList.contains('snare-volume')){
            this.snareaudio.volume=0;
        }
        if(e.target.classList.contains('hihat-volume')){
            this.hihataudio.volume=0;
        }
    }
    else{
        if(e.target.classList.contains('kick-volume')){
            this.kickaudio.volume=1;
        }
        if(e.target.classList.contains('snare-volume')){
            this.snareaudio.volume=1;
        }
        if(e.target.classList.contains('hihat-volume')){
            this.hihataudio.volume=1;
        }
    }
}

roll(event){
    // console.log(event.target.value);
    this.bpm=event.target.value;
    const tempoval= document.querySelector(".tempoval");
    tempoval.innerText= event.target.value;
}

updatetempo(event){
    clearInterval(this.playing);
    this.playing=null;
    const playbtn= document.querySelector(".playbtn");
    if(playbtn.classList.contains("active")){
        this.start();
    }

}

}
const drumkit= new Drumkit();
const playbtn= document.querySelector(".playbtn");

//event listeners
drumkit.temporoll.addEventListener("input",(event)=>{
    drumkit.roll(event);

})

drumkit.temporoll.addEventListener("change",(event)=>{
    drumkit.updatetempo(event);

})

playbtn.addEventListener("click", ()=>{
    drumkit.updatebtn();
    drumkit.start();
})
const pads= document.querySelectorAll(".pad");
pads.forEach(pad=>{
pad.addEventListener("click",drumkit.activepad);
pad.addEventListener("animationend",()=>{
pad.style.animation=""
});


})

drumkit.selects.forEach(select=>{
select.addEventListener("change",e=>{
    drumkit.changesound(e);

});

});

drumkit.mute.forEach(element => {
    element.addEventListener("click",e=>{
        drumkit.mutesound(e);

    });
    
});


// function activepad(event){
//     const target= event.target;
    
//     target.classList.toggle("active");


// };
