const core = require('@actions/core');

const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

function listToArray (list) {
  if (!list) return []
  return Array.isArray(list) ? list : list.split(', ')
}

async function run() {
  try { 
    console.log(tools.inputs.title);
    console.log(tools.inputs.body);
    console.log(tools.inputs.labels);
    const newIssue = await tools.github.issues.create({
      ...tools.context.repo,
      title: tools.inputs.title,
      body: tools.inputs.body,
      labels: listToArray(tools.inputs.labels)
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
