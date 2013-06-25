/**
 * Iterate over a loop and perform the following actions , using promises to do this
 *
 * Actions:
 * 1 - Count how many letters are in the list
 * 2 - Build the sentence in the list
 **/

 Q = require('q')

var list = ['This', 'is', 'an', 'array'];

var letterscount = 0;
var sentence = "";

function countLetters(word, callback){
  var letters = word.length;
  callback(null, letters);
}

function getWord(word, callback){
  callback(null, word + " ");
}

function funcPromise(word){
  var deferred = Q.defer();
  countLetters(word, function(error, letters){
    getWord(word, function(error, wordInSentence){
      deferred.resolve([letters, wordInSentence]);
    });
  });
  return deferred.promise;
}

var result = {letters: 0, sentence: ""};

function process(callback){
  var promise = Q.fcall(function(){return [0, ""]});

  //Function created to be used in the loop
  var func = function(word){
    promise = promise.then(function(data){ 
      result.letters += data[0];
      result.sentence += data[1];
      return funcPromise(word); //Always put return, otherwise data will be null
    }); 
  }

  for(var i = 0; i< list.length; i++){
    func(list[i]);
  }
  promise.done(function(data){
    result.letters += data[0]; //Calculate the result of the last promise
    result.sentence += data[1];
    callback(result);
  });
}
process(function(result){
  console.log(result);
});
