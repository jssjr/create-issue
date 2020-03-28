const core = require('@actions/core');

const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

async function run() {
  try { 
    console.log(tools.inputs);
    const newIssue = await tools.github.issues.create({
      ...tools.context.repo,
      title: tools.inputs.title,
      body: tools.inputs.body,
      labels: tools.inputs.labels
    })

    console.log(newIssue);

    core.setOutput('number', newIssue.number);
    core.setOutput('id', newIssue.id);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
