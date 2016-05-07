import underscore from "underscore";

//Handlebars doesnt provide a repeat template :( so
//we have to provide our own. (used for page numbers)
module.exports = function(count, options){
  let output = "";
  underscore.times(count, (index) => output += options.fn(index + 1));
  return output;
};