function SoundManager(){
    this.sounds = [];
    this.supportFileType;
}

SoundManager.prototype.init = function (){
    this.supportFileType = this.audioSupport();
};


SoundManager.prototype.addSound = function (name, path, filename){

    url = path + filename + "." + this.supportFileType;

    var tmpAudio = this.loadAudio(url, 1);
    var tmpSound = new Sound(name,tmpAudio);
    this.sounds[name]=tmpSound;
};


SoundManager.prototype.loadAudio = function(url, vol){
    var audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    audio.volume = vol;
    return audio;
};


SoundManager.prototype.audioSupport = function() {
    var a = document.createElement('audio');
    var ogg = !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    if (ogg) return 'ogg';
    var mp3 = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    if (mp3) return 'mp3';
    else return 0;
};

