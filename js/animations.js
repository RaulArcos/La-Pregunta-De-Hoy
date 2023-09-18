function WordShuffler(holder,opt){
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();
    
    this.delta;
    this.currentTimeOffset = 0;
    
    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;

      const red_patern = [
        '#FF0000', // Rojo brillante
        '#FF6347', // Rojo coral
        '#DC143C', // Rojo carmín
        '#FF4500', // Rojo anaranjado
        '#FF7F50', // Rojo salmón
    ];
    
    const green_patern = [
        '#008000', // Verde brillante
        '#32CD32', // Verde lima
        '#00FF00', // Verde limón
        '#7FFF00', // Verde chartreuse
        '#00FF7F', // Verde primavera
    ];
    
    const yellow_patern = [
        '#FFFF00', // Amarillo puro
        '#FFFFE0', // Amarillo almendrado
        '#FFFACD', // Amarillo lino
        '#FFD700', // Amarillo oro
        '#FFA500', // Amarillo naranja
    ];
    
    const orange_patern = [
        '#FF8C00', // Naranja oscuro
        '#FFA07A', // Salmón pastel
        '#FF4500', // Rojo anaranjado
        '#FF6347', // Rojo coral
        '#FFD700', // Amarillo oro
    ];
    
    const purple_patern = [
        '#9370DB', // Púrpura medio
        '#9932CC', // Violeta profundo
        '#8A2BE2', // Azul violeta
        '#BA55D3', // Orquídea oscuro
        '#DA70D6', // Lavanda
    ];
    
    const pink_patern = [
        '#FF69B4', // Rosa
        '#FF1493', // Rosa profundo
        '#FFC0CB', // Rosa pastel
        '#FFB6C1', // Rosa claro pastel
        '#FF6EB4', // Rosa brillante
    ];
    
    const brown_patern = [
        '#8B4513', // Marrón oscuro
        '#A0522D', // Marrón sienna
        '#D2691E', // Marrón chocolate
        '#CD853F', // Marrón bronceado
        '#DEB887', // Marrón burlywood
    ];
    
    const gray_patern = [
        '#808080', // Gris
        '#A9A9A9', // Gris pastel
        '#D3D3D3', // Gris claro pastel
        '#696969', // Gris apagado
        '#C0C0C0', // Gris plata
    ];
    
    const blue_patern = [
        '#87CEEB', // Azul claro
        '#ADD8E6', // Azul cielo
        '#B0E0E6', // Celeste
        '#00BFFF', // Azul real
        '#1E90FF', // Azul claro intenso
        '#6495ED', // Azul acero
        '#4682B4', // Azul apagado
        '#5F9EA0', // Azul cadete
        '#00CED1', // Azul oscuro intenso
        '#20B2AA', // Azul claro medio
        '#AFEEEE', // Turquesa pastel
        '#87CEFA', // Azul pálido
        '#00FFFF', // Cian
        '#E0FFFF', // Azul claro muy pálido
        '#F0FFFF', // Azul cielo pastel
        '#B0C4DE', // Azul acero claro
        '#00CED1', // Azul oscuro intenso
        '#20B2AA', // Azul claro medio
        '#AFEEEE', // Turquesa pastel
        '#87CEFA', // Azul pálido
        '#00FFFF', // Cian
        '#E0FFFF', // Azul claro muy pálido
        '#F0FFFF', // Azul cielo pastel
        '#B0C4DE', // Azul acero claro
        '#5F9EA0', // Azul cadete
        '#4682B4', // Azul apagado
        '#6495ED', // Azul acero
        '#1E90FF', // Azul claro intenso
        '#00BFFF', // Azul real
    ];
  
    const posible_palettes = [blue_patern, red_patern, green_patern, yellow_patern, orange_patern, purple_patern, pink_patern, brown_patern, gray_patern];

    var options = {
      fps : 120,
      timeOffset : 5,
      textColor : '#000',
      fontSize : "50px",
      useCanvas : false,
      mixCapital : false,
      mixSpecialCharacters : false,
      needUpdate : true,
      colors: posible_palettes[Math.floor(Math.random() * 9)]
    }
  
    if(typeof opt != "undefined"){
      for(key in opt){
        options[key] = opt[key];
      }
    }
  
    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000/this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;
  
    this.useCanvas = options.useCanvas;
    
    this.chars = [
      'A','B','C','D',
      'E','F','G','H',
      'I','J','K','L',
      'M','N','O','P',
      'Q','R','S','T',
      'U','V','W','X',
      'Y','Z'
    ];
    this.specialCharacters = [
      '!','§','$','%',
      '&','/','(',')',
      '=','?','_','<',
      '>','^','°','*',
      '#','-',':',';','~'
    ]
  
    if(this.mixSpecialCharacters){
      this.chars = this.chars.concat(this.specialCharacters);
    }
  
    this.getRandomColor = function () {
      var randNum = Math.floor( Math.random() * this.colors.length );
      return this.colors[randNum];
    }
  
    //if Canvas
   
    this.position = {
      x : 0,
      y : 50
    }
  
    //if DOM
    if(typeof holder != "undefined"){
      this.holder = holder;
    }
  
    if(!this.useCanvas && typeof this.holder == "undefined"){
      console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
    }
  
  
    this.getRandCharacter = function(characterToReplace){    
      if(characterToReplace == " "){
        return ' ';
      }
      var randNum = Math.floor(Math.random() * this.chars.length);
      var lowChoice =  -.5 + Math.random();
      var picketCharacter = this.chars[randNum];
      var choosen = picketCharacter.toLowerCase();
      if(this.mixCapital){
        choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
      }
      return choosen;
      
    }
  
    this.writeWord = function(word){
      this.word = word;
      this.currentWord = word.split('');
      this.currentWordLength = this.currentWord.length;
  
    }
  
    this.generateSingleCharacter = function (color,character) {
      var span = document.createElement('span');
      span.style.color = color;
      span.innerHTML = character;
      return span;
    }
  
    this.updateCharacter = function (time) {
      
        this.now = Date.now();
        this.delta = this.now - this.then;

        if (this.delta > this.interval) {
          this.currentTimeOffset++;
        
          var word = [];
  
          if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
            this.currentCharacter++;
            this.currentTimeOffset = 0;
          }
          for(var k=0;k<this.currentCharacter;k++){
            word.push(this.currentWord[k]);
          }
  
          for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
            word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
          }
  
  
          if(that.useCanvas){
            c.clearRect(0,0,stage.x * stage.dpr , stage.y * stage.dpr);
            c.font = that.fontSize + " sans-serif";
            var spacing = 0;
            word.forEach(function (w,index) {
              if(index > that.currentCharacter){
                c.fillStyle = that.getRandomColor();
              }else{
                c.fillStyle = that.textColor;
              }
              c.fillText(w, that.position.x + spacing, that.position.y);
              spacing += c.measureText(w).width;
            });
          }else{
  
            if(that.currentCharacter === that.currentWordLength){
              that.needUpdate = false;
            }
            this.holder.innerHTML = '';
            word.forEach(function (w,index) {
              var color = null
              if(index > that.currentCharacter){
                color = that.getRandomColor();
              }else{
                color = that.textColor;
              }
              that.holder.appendChild(that.generateSingleCharacter(color, w));
            }); 
          }
          this.then = this.now - (this.delta % this.interval);
        }
    }
  
    this.restart = function () {
      this.currentCharacter = 0;
      this.needUpdate = true;
    }
  
    function update(time) {
      time++;
      if(that.needUpdate){
        that.updateCharacter(time);
      }
      requestAnimationFrame(update);
    }
  
    this.writeWord(this.holder.innerHTML);
    console.log(this.currentWord);
    update(time);
  }
  
  var text = document.getElementById('text');
  
  var pText = new WordShuffler(text,{
    textColor : '#000',
    timeOffset : 2
  });

  
  