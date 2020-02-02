var progress = document.createElement("div");
var playTime = document.createElement("div");
var header = document.createElement("header");
var numOfTmesteps = 0;
var numOfRiddles = 0;
var keys = 0;
var goldenkeys = 0;
var riddles = [];
var randomRiddles = [];
window.onload = function() {
  document.body.prepend(header);
  this.header.appendChild(this.progress);
  this.header.appendChild(this.playTime);
  this.setInterval(function() {
    playTime.innerHTML = "Time played: " + numOfTmesteps;
    numOfTmesteps++;
  }, 1000);

  this.riddles.push(
    new Riddle(
      "Welche Farbe hätte letztes Jahr dier Lieferwagen haben sollen, der dein Geschenk bringen sollte?",
      answ => {
        return answ == "weiß";
      }
    )
  );
  this.riddles.push(
    new Riddle("Wie ist der Vorname deines fühnen besten Freundes?", answ => {
      return answ == "Fühn";
    })
  );
  this.riddles.push(
    new Riddle("Wann sollte Simon sich das nächste Mal rasieren?", answ => {
      return answ == "jetzt";
    })
  );
  this.riddles.push(
    new Riddle("Wann wird BER fertig?", answ => {
      return answ == "nie";
    })
  );
  this.riddles.push(
    new Riddle("Wie heißt die Mutter von Niki Lauda?", answ => {
      return answ == "Elisabeth Lauda";
    })
  );
  this.riddles.push(
    new Riddle("Was ist Oles Lieblingszahl?", answ => {
      return answ != "";
    })
  );
  this.riddles.push(
    new Riddle("Wie viele Gegenpäpste gab es?", answ => {
      return answ == "25";
    })
  );
  this.riddles.push(
    new Riddle("Mache eine ungültige Eingabe", answ => {
      return answ == "ß";
    })
  );
  for (var i = 0; i < 5; i++) {
    addRiddle();
  }
  shuffle(this.riddles);
  for (var i in this.riddles) {
    this.riddles[i].riddleIndex = i - 1 + 1;
  }
  this.riddles[0].draw();

  this.setProgress(0);
};
function addRiddle() {
  var rand = Math.random() * 2;
  if (rand < 1) {
    var i = Math.round(Math.random() * 200);
    var newRiddle = new Riddle("Was ist 3+" + i);
    newRiddle.i = i;
    newRiddle.isCorrect = function(answ) {
      return answ == (this.i + 3).toString();
    }.bind(newRiddle);
    this.riddles.push(newRiddle);
  } else if (rand < 2) {
    var amount = Math.round(Math.random() * 10 + 2);
    var char = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 1);
    var newRiddle = new Riddle(
      "Drücke " +
        amount +
        " mal die Taste " +
        char +
        " und danach einen Smiley :)"
    );
    newRiddle.amount = amount;
    newRiddle.char = char;
    newRiddle.isCorrect = function(answ) {
      var correct = "";
      for (var i = 0; i < this.amount; i++) {
        correct += this.char;
      }
      correct += ":)";
      return correct == answ;
    }.bind(newRiddle);
    this.riddles.push(newRiddle);
  }
}
function setProgress(prog = 0) {
    if(numOfTmesteps>60*30){
        alert("So Simon. Du hast jetzt 30 Minuten deiner kostbaren Lebenszeit mit diesem Rätsel vergäudet. Ist das dein verdammter Ernst? Du hättest in der Zeit Laufen gehen können! Oder ein Boot bauen! Oder schlafen! In Liebe, Moritz und Ole.")
    }
  if (Math.random() < 1 / 30) {
    alert("Glückwunsch! Du hast einen Schlüssel gefunden!");
    keys++;
    if (Math.random() < 1 / 10) {
      alert("Glückwunsch! Du hast einen goldenen Schlüssel gefunden!");
      goldenkeys++;
    }
  }
  if (keys == 0) {
    progress.innerHTML = "Amount of riddles solved: " + prog;
  } else if (goldenkeys == 0) {
    progress.innerHTML = "Amount of riddles solved: " + prog + " keys: " + keys;
  } else {
    progress.innerHTML =
      "Amount of riddles solved: " +
      prog +
      " keys: " +
      keys +
      " golden keys: " +
      goldenkeys;
  }
}
class Riddle {
  constructor(
    content = "example",
    isCorrect = function(str) {
      return false;
    },
    onSolve = function() {
      if (!riddles[this.riddleIndex + 1]) {
        addRiddle();
      }
      if (!riddles[this.riddleIndex + 1]) {
        return;
      }
      riddles[this.riddleIndex + 1].draw();
    }.bind(this)
  ) {
    this.description = document.createElement("div");
    this.description.innerHTML = content;
    this.isCorrect = isCorrect;
    this.onSolve = onSolve;
    this.riddleIndex = numOfRiddles;
    numOfRiddles++;
  }
  draw() {
    document.body.appendChild(document.createElement("hr"));
    document.body.appendChild(this.description);
    this.submissionField = document.createElement("input");
    this.submissionField.oninput = function() {
      if (this.isCorrect(this.submissionField.value) && !this.hasBeenSolved) {
        this.hasBeenSolved = true;
        this.onSolve();
      }
    }.bind(this);
    document.body.appendChild(this.submissionField);
    setProgress(this.riddleIndex);
  }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}