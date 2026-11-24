'use strict';
const assert=require('assert/strict');
const definitions=[
 {name:'read_publication_state',description:'Read the current draft PR, prepared commit metadata and completion marker. This is the publication phase; the fix and PR body have already been prepared.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
 {name:'push_to_pull_request_branch',description:'Publish the prepared commits onto the supplied existing draft PR. The native publisher validates the branch, body and exact patch, creates the commits and updates the activation comment. Call once, after reading the state.',inputSchema:{type:'object',properties:{pull_request_number:{type:'integer'},message:{type:'string'}},required:['pull_request_number'],additionalProperties:false}}
];
function create(input,publish,record){let read=false,started=false,completed=false;return{get completed(){return completed;},async perform(name,args={}){
 if(name==='read_publication_state'){assert.equal(Object.keys(args).length,0);read=true;record({event:'read_state',input});return input;}
 assert.equal(name,'push_to_pull_request_branch');assert(read,'Read the state first');assert(!started,'Publication may execute once');assert.equal(args.pull_request_number,input.pull_request_number);assert(Object.keys(args).every(k=>['pull_request_number','message'].includes(k)));if(args.message!==undefined)assert.equal(typeof args.message,'string');
 started=true;record({event:'publication_requested',args});const value=await publish();assert(value.verified);completed=true;record({event:'publication_verified',value});return value;
 }};}
module.exports={definitions,create};
