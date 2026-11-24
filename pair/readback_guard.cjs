const assert=require('assert/strict');function check(observed,initial,published){assert([initial,...published].includes(observed),'Foreign head: stop');}module.exports={check};
