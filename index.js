const core = require('@actions/core');
const tools = require('actions-toolkit');

async function run() {
  try { 
    const newIssue = await tools.github.issues.create({
      ...tools.context.repo,
      title: tools.inputs.title,
      body: tools.inputs.body
    })

    core.setOutput('number', newIssue.number);
    core.setOutput('id', newIssue.id);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
