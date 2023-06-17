const BACKEND_API = 'https://tony-auth-express.vercel.app/api';

const dataIssues = [];

// services
class HttpRequest {
  constructor(api) {
    this.api = api;
  }

  async get(url) {
    const response = await fetch(`${this.api}/${url}`); // `https://tony-auth-express.vercel.app/api/todo`
    // const response = await fetch(`https://tony-auth-express.vercel.app/api/todo`);
    const data = await response.json();
    return data;
  }
}

const httpRequest =  new HttpRequest(BACKEND_API);

// variable
const issuesList = document.getElementById('issuesList');
const issueForm = document.getElementById('issueForm');

// add issue
issueForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addIssue();
})

function addIssue() {
  const issueTitle = document.getElementById('issueTitle').value;
  const issueDesc = document.getElementById('issueDescription').value;
  const issueSeverity = document.getElementById('issueSeverity').value;

  const item = {
    _id: Date.now().toString(),
    title: issueTitle,
    description: issueDesc,
    severity: issueSeverity,
    status: "Open",
  }
  
  dataIssues.push(item); // add new issue
  renderIssues(dataIssues); // render issues
}

// fetch issue
async function fetchIssues() {
  const data = await httpRequest.get('todo');
  dataIssues.push(...data.data);
  renderIssues(data.data);
}

// pure function: input -> output (no effect outside)
function renderIssues(dataIssues) {
  issuesList.innerHTML = '';
    
  for (const issue of dataIssues) {
    issuesList.innerHTML += `
      <li class="issue-list-item">
        <div class="list-item-header">
            <div for="" class="list-item-title">${issue.title}</div>
            <div id="issueStatus" class="list-item-status">
              ${issue.status}
            </div>
        </div>
        <div class="list-item-content">
            <h3 class="issue-name">${issue.description}</h3>
            <div class="list-item-severity">${issue.severity}</div>
            <div class="list-item-group-tabc">
              <div class="list-item-group-author">
              </div>
              <div class="list-item-group-btn">
                <button 
                    id="changeSttBtn" 
                    class="btn btn--close" 
                >
                  close
                </button>
                <button 
                  class="btn btn--delete" 
                  onclick="deleteIssue('${issue._id}')"
                >
                  Delete
                </button>
              </div>
            </div>
        </div>
      </li>
      <br>
    `
  }
}

// delete issue 
function deleteIssue(issueId) {
  const clonedIssues = [...dataIssues]; // shallow clone
  const issueIndex = clonedIssues.findIndex(issue => issue._id === issueId); // find index
  clonedIssues.splice(issueIndex, 1); // remove issue
  renderIssues(clonedIssues);
}

// search issues
function searchIssues() {}

// filter issues
function filterIssues() {}

// sort issues
function sortIssues() {}

// initial render
fetchIssues()