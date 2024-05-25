document.getElementById('Go').addEventListener('click', function() {
    var c = `var script = document.createElement("script");` +
    "script.innerHTML = `" + `let wpRequire;
    window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
    
    let api = Object.values(wpRequire.c).find(x => x?.exports?.getAPIBaseURL).exports.HTTP;
    let ApplicationStreamingStore = Object.values(wpRequire.c).find(x => x?.exports?.default?.getStreamerActiveStreamMetadata).exports.default;
    let QuestsStore = Object.values(wpRequire.c).find(x => x?.exports?.default?.getQuest).exports.default;
    let encodeStreamKey = Object.values(wpRequire.c).find(x => x?.exports?.encodeStreamKey).exports.encodeStreamKey;
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    let quest = [...QuestsStore.quests.values()].find(x => x.userStatus?.enrolledAt && !x.userStatus?.completedAt)
    if(!quest) {
        alert("You don't have any uncompleted quests!")
    } else {
        let streamId = encodeStreamKey(ApplicationStreamingStore.getCurrentUserActiveStream())
        let secondsNeeded = quest.config.streamDurationRequirementMinutes * 60
        let heartbeat = async function() {
            alert("Completing quest", quest.config.messages.gameTitle, "-", quest.config.messages.questName)
            while(true) {
                let res = await api.post({url: '/quests/' + quest.id + '/heartbeat', body: {stream_key: streamId}})
                let progress = res.body.stream_progress_seconds
                
                alert('Quest progress: ' + progress + '/' + secondsNeeded)
                
                if(progress >= secondsNeeded) break;
                await sleep(30 * 1000)
            }
            
            alert("Quest completed!")
        }
        heartbeat()
    }`
    + "`;document.head.appendChild(script);"
    
    chrome.tabs.executeScript({ code: c });
});