module.exports = function myloader(content) {
  console.log("\n\nmyloader가 동작함", content);
  return content.replace("console.log(", "alert(");
};
