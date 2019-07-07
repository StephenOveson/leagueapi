
$('#summoner-submit').on('click', function (event) {
    event.preventDefault();
    let summonerName = $('#summoner-name').val()
    console.log(summonerName)
    $.ajax({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=RGAPI-d64ed730-d9b8-4ab6-aabe-b7557f8f43e0"
    }).then(function (response) {
        let accountID = response.accountID
        let encryptedID = response.id
        console.log(encryptedID)
        $.ajax({
            method: "GET",
            url: "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + encryptedID + "?api_key=RGAPI-d64ed730-d9b8-4ab6-aabe-b7557f8f43e0"
        }).then(function (call) {
            let objectCall = call[0]
            let div = $('<div>')
            let img = $('<img>')
            $('#account-info').empty();
            switch (objectCall.tier) {
                case 'CHALLENGER':
                    img.attr('src', './assets/images/emblems/Emblem_Challenger.png')
                    break;
                case 'GRANDMASTER':
                    img.attr('src', './assets/images/emblems/Emblem_Grandmaster.png')
                    break;
                case 'MASTER':
                    img.attr('src', './assets/images/emblems/Emblem_Master.png')
                    break;
                case 'DIAMOND':
                    img.attr('src', './assets/images/emblems/Emblem_Diamond.png')
                    break;
                case 'PLATINUM':
                    img.attr('src', './assets/images/emblems/Emblem_Platinum.png')
                    break;
                case 'GOLD':
                    img.attr('src', './assets/images/emblems/Emblem_Gold.png')
                    break;
                case 'SILVER':
                    img.attr('src', './assets/images/emblems/Emblem_Silver.png')
                    break;
                case 'BRONZE':
                    img.attr('src', './assets/images/emblems/Emblem_Diamond.png')
                    break;
                case 'IRON':
                    img.attr('src', './assets/images/emblems/Emblem_Diamond.png')
                    break;
                default:
                    console.log('Unranked')
            }
            div.text(call[0].tier + " " + call[0].rank)
            img.attr('class', 'w-25')
            div.prepend(img)
            $('#account-info').append(div)
        })
    })
})