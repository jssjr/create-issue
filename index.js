const core = require('@actions/core');

const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

function listToArray (list) {
  if (!list) return []
  return Array.isArray(list) ? list : list.split(', ')
}

async function run() {
  try { 
    const newIssue = await tools.github.issues.create({
      ...tools.context.repo,
      title: tools.inputs.title,
      body: tools.inputs.body,
      labels: listToArray(tools.inputs.labels),
      assignees: listToArray(tools.inputs.assignees)
    })

    core.setOutput('id', newIssue.data.id);
    core.setOutput('url', newIssue.data.url);
    core.setOutput('number', newIssue.data.number);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
