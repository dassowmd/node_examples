console.log('Before');
console.log('After');

// function getRepositories(user){
//     getRepositories(user.gitHubUserName, getCommits)
// }
// function getCommits(repos){
//     getCommits(repos[0], displayCommits)
// }


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
        }
    )
}



function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting github repos");
            resolve({repos: ['repo1', 'repo2', 'repo3']});
        }, 2000)
    })
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting github commits");
            resolve({commits: ['commit1', 'commit2', 'commit3']});
        }, 2000)
    }
    )

}

// Promises
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))

// Async and await
async function displayCommits(){
    try{
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    const commits = await getCommits(repos[0]);
    return commits;
    }
    catch (e) {
        console.log(e)

    }
}
displayCommits().then(commits => console.log(commits));
