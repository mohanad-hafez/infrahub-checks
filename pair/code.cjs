const {call}=require('./client.cjs');
(async()=>{const input=await call('read_publication_state');const result=await call('push_to_pull_request_branch',{pull_request_number:input.pull_request_number,message:input.summary});if(!result.verified)throw Error('Publication did not pass');console.log(JSON.stringify(result));})().catch(e=>{console.error(e.message);process.exitCode=1;});
